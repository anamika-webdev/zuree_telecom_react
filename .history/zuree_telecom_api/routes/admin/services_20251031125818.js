// =====================================================
// ADMIN SERVICES MANAGEMENT ROUTES
// routes/admin/services.js
// =====================================================

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getPool } = require('../../server');
const { verifyToken } = require('./auth');

// Configure multer for service image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/services/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'service-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  },
});

// Helper function to create URL-friendly slug
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to log activity
async function logActivity(pool, adminId, action, entityId, details) {
  await pool.query(
    `INSERT INTO admin_activity_log (admin_id, action, entity_type, entity_id, details) 
     VALUES (?, ?, 'service', ?, ?)`,
    [adminId, action, entityId, details]
  );
}

// =====================================================
// GET ALL SERVICES
// =====================================================
router.get('/', verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const status = req.query.status || 'all';
    const category = req.query.category || 'all';
    const search = req.query.search || '';

    const pool = getPool();

    // Build WHERE clause
    let whereClause = '1=1';
    const params = [];

    if (status !== 'all') {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    if (category !== 'all') {
      whereClause += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      whereClause += ' AND (title LIKE ? OR short_description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    // Get total count
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM services WHERE ${whereClause}`,
      params
    );
    const totalCount = countResult[0].total;
    const totalPages = Math.ceil(totalCount / limit);

    // Get services
    const [services] = await pool.query(
      `SELECT 
        s.id, s.title, s.url_slug, s.category, s.short_description,
        s.icon, s.image, s.status, s.display_order,
        s.created_at, s.updated_at,
        a.full_name as created_by_name
       FROM services s
       LEFT JOIN admin_users a ON s.created_by = a.id
       WHERE ${whereClause}
       ORDER BY s.display_order ASC, s.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      services,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit
      }
    });
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: err.message
    });
  }
});

// =====================================================
// GET SERVICE CATEGORIES
// =====================================================
router.get('/categories', verifyToken, async (req, res) => {
  try {
    const pool = getPool();

    const [categories] = await pool.query(
      `SELECT DISTINCT category, COUNT(*) as count
       FROM services
       WHERE category IS NOT NULL
       GROUP BY category
       ORDER BY category`
    );

    res.json({
      success: true,
      categories
    });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: err.message
    });
  }
});

// =====================================================
// GET SINGLE SERVICE BY ID
// =====================================================
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    const [services] = await pool.query(
      `SELECT 
        s.*, 
        a.full_name as created_by_name
       FROM services s
       LEFT JOIN admin_users a ON s.created_by = a.id
       WHERE s.id = ?`,
      [id]
    );

    if (services.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Parse JSON fields
    const service = services[0];
    if (service.features) {
      service.features = JSON.parse(service.features);
    }
    if (service.technologies) {
      service.technologies = JSON.parse(service.technologies);
    }

    res.json({
      success: true,
      service
    });
  } catch (err) {
    console.error('Error fetching service:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching service',
      error: err.message
    });
  }
});

// =====================================================
// CREATE NEW SERVICE
// =====================================================
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      category,
      shortDescription,
      fullDescription,
      icon,
      features,
      technologies,
      metaTitle,
      metaDescription,
      status,
      displayOrder
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title and category are required'
      });
    }

    const pool = getPool();
    
    // Create URL-friendly slug
    const urlSlug = createSlug(title);

    // Check if URL slug already exists
    const [existing] = await pool.query(
      'SELECT id FROM services WHERE url_slug = ?',
      [urlSlug]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'A service with this title already exists'
      });
    }

    const imagePath = req.file ? req.file.path : null;

    // Parse JSON fields if they're strings
    let parsedFeatures = features;
    let parsedTechnologies = technologies;

    if (typeof features === 'string') {
      try {
        parsedFeatures = JSON.parse(features);
      } catch (e) {
        parsedFeatures = null;
      }
    }

    if (typeof technologies === 'string') {
      try {
        parsedTechnologies = JSON.parse(technologies);
      } catch (e) {
        parsedTechnologies = null;
      }
    }

    // Insert service
    const [result] = await pool.query(
      `INSERT INTO services 
       (title, url_slug, category, short_description, full_description,
        icon, image, features, technologies, meta_title, meta_description,
        status, display_order, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        urlSlug,
        category,
        shortDescription || null,
        fullDescription || null,
        icon || null,
        imagePath,
        parsedFeatures ? JSON.stringify(parsedFeatures) : null,
        parsedTechnologies ? JSON.stringify(parsedTechnologies) : null,
        metaTitle || title,
        metaDescription || shortDescription || '',
        status || 'active',
        displayOrder || 0,
        req.adminId
      ]
    );

    // Log activity
    await logActivity(pool, req.adminId, 'create', result.insertId, `Created service: ${title}`);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      serviceId: result.insertId
    });
  } catch (err) {
    console.error('Error creating service:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating service',
      error: err.message
    });
  }
});

// =====================================================
// UPDATE SERVICE
// =====================================================
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      category,
      shortDescription,
      fullDescription,
      icon,
      features,
      technologies,
      metaTitle,
      metaDescription,
      status,
      displayOrder
    } = req.body;

    const pool = getPool();

    // Check if service exists
    const [existing] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // If title changed, create new URL slug
    let urlSlug = existing[0].url_slug;
    if (title && title !== existing[0].title) {
      urlSlug = createSlug(title);
      
      // Check if new URL slug already exists
      const [duplicates] = await pool.query(
        'SELECT id FROM services WHERE url_slug = ? AND id != ?',
        [urlSlug, id]
      );

      if (duplicates.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'A service with this title already exists'
        });
      }
    }

    const imagePath = req.file ? req.file.path : existing[0].image;

    // Parse JSON fields if they're strings
    let parsedFeatures = features;
    let parsedTechnologies = technologies;

    if (typeof features === 'string' && features) {
      try {
        parsedFeatures = JSON.parse(features);
      } catch (e) {
        parsedFeatures = existing[0].features;
      }
    }

    if (typeof technologies === 'string' && technologies) {
      try {
        parsedTechnologies = JSON.parse(technologies);
      } catch (e) {
        parsedTechnologies = existing[0].technologies;
      }
    }

    // Update service
    await pool.query(
      `UPDATE services SET 
       title = ?, url_slug = ?, category = ?, short_description = ?,
       full_description = ?, icon = ?, image = ?, features = ?,
       technologies = ?, meta_title = ?, meta_description = ?,
       status = ?, display_order = ?
       WHERE id = ?`,
      [
        title || existing[0].title,
        urlSlug,
        category || existing[0].category,
        shortDescription !== undefined ? shortDescription : existing[0].short_description,
        fullDescription !== undefined ? fullDescription : existing[0].full_description,
        icon !== undefined ? icon : existing[0].icon,
        imagePath,
        parsedFeatures ? JSON.stringify(parsedFeatures) : existing[0].features,
        parsedTechnologies ? JSON.stringify(parsedTechnologies) : existing[0].technologies,
        metaTitle || existing[0].meta_title,
        metaDescription !== undefined ? metaDescription : existing[0].meta_description,
        status || existing[0].status,
        displayOrder !== undefined ? displayOrder : existing[0].display_order,
        id
      ]
    );

    // Log activity
    await logActivity(pool, req.adminId, 'update', id, `Updated service: ${title || existing[0].title}`);

    res.json({
      success: true,
      message: 'Service updated successfully'
    });
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating service',
      error: err.message
    });
  }
});

// =====================================================
// DELETE SERVICE
// =====================================================
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    // Check if service exists
    const [existing] = await pool.query('SELECT title FROM services WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Delete service
    await pool.query('DELETE FROM services WHERE id = ?', [id]);

    // Log activity
    await logActivity(pool, req.adminId, 'delete', id, `Deleted service: ${existing[0].title}`);

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: err.message
    });
  }
});

// =====================================================
// UPDATE DISPLAY ORDER
// =====================================================
router.post('/reorder', verifyToken, async (req, res) => {
  try {
    const { services } = req.body; // Array of {id, displayOrder}

    if (!services || !Array.isArray(services)) {
      return res.status(400).json({
        success: false,
        message: 'Services array is required'
      });
    }

    const pool = getPool();

    // Update display order for each service
    for (const service of services) {
      await pool.query(
        'UPDATE services SET display_order = ? WHERE id = ?',
        [service.displayOrder, service.id]
      );
    }

    // Log activity
    await logActivity(pool, req.adminId, 'reorder', null, `Reordered ${services.length} services`);

    res.json({
      success: true,
      message: 'Services reordered successfully'
    });
  } catch (err) {
    console.error('Error reordering services:', err);
    res.status(500).json({
      success: false,
      message: 'Error reordering services',
      error: err.message
    });
  }
});

module.exports = router;