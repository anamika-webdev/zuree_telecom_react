// src/pages/BlogDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';
import { blogService } from '../services/blogService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BlogDetails = () => {
  const { title } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getBlogByTitle(title);
        setBlog(data.blog);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [title]);

  if (loading) return ;
  if (!blog) return Blog not found;

  const breadcrumbs = [
    { label: 'Blogs', link: '/blogs' },
    { label: blog.title }
  ];

  return (
    
      
      
      
        
          
            
              
                 {new Date(blog.date).toLocaleDateString()}
                 {blog.author}
              
              
              {blog.image && (
                
              )}
              
              
              
              
                
                   Back to Blogs
                
              
            
          
        
      
    
  );
};

export default BlogDetails;