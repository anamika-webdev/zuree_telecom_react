/* Layout CSS - Header, Footer, Navigation */

/* Site Wrapper */
.site-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 65px; /* Add space for fixed header */
}

/* Header Styles */
.page_header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 10px 0;
}

.header-transparent {
  background-color: rgba(255, 255, 255, 0.98);
}

/* Logo */
.logo {
  display: block;
  padding: 5px 0;
}

.logo img {
  max-height: 45px;
  width: auto;
  object-fit: contain;
  margin-left: 20px;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: #cd1537;
  letter-spacing: 1px;
  margin-left: 20px;
}

/* Navigation */
.main-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
}

.nav-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  gap: 25px;
  align-items: center;
}

.nav-menu li {
  position: relative;
}

.nav-menu a {
  text-decoration: none;
  color: #2d3e50;
  font-weight: 500;
  font-size: 15px;
  transition: color 0.3s ease;
  padding: 10px 0;
  display: block;
}

.nav-menu a:hover {
  color: #cd1537;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-menu-toggle span {
  width: 25px;
  height: 3px;
  background-color: #2d3e50;
  display: block;
  transition: 0.3s;
}

/* Mega Menu */
.mega-menu {
  position: relative;
}

.mega-menu > a {
  cursor: pointer;
}

.mega-menu-content {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 30px;
  display: flex;
  gap: 40px;
  min-width: 800px;
  z-index: 1000;
  margin-top: 10px;
}

.mega-menu-col {
  flex: 1;
}

.mega-menu-col h5 {
  color: #cd1537;
  font-size: 16px;
  margin-bottom: 15px;
  font-weight: 600;
}

.mega-menu-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mega-menu-col ul li {
  margin-bottom: 10px;
}

.mega-menu-col ul li a {
  color: #666;
  font-size: 14px;
  padding: 5px 0;
  display: block;
}

.mega-menu-col ul li a:hover {
  color: #cd1537;
  padding-left: 5px;
}

/* Footer Styles */
.page-footer {
  background-color: #3c4553;
  color: white;
  padding: 0;
  margin-top: 80px;
}

/* Newsletter in Footer */
.footer-newsletter {
  background: linear-gradient(135deg, #2d3e50 0%, #34495e 50%, #3c4553 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.footer-newsletter::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(205, 21, 55, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.footer-newsletter::after {
  content: '';
  position: absolute;
  bottom: -80px;
  left: -80px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(52, 152, 219, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(20px);
  }
}

.footer-newsletter .container {
  position: relative;
  z-index: 1;
}

.footer-newsletter h2 {
  font-size: 3rem;
  color: white;
  margin-bottom: 15px;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.5px;
}

.footer-newsletter p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  font-weight: 300;
}

.footer-newsletter .newsletter-form {
  position: relative;
}

.footer-newsletter .newsletter-form .input-group {
  max-width: 650px;
  margin: 0 auto;
  display: flex;
  gap: 0;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
  border-radius: 60px;
  overflow: visible;
  background: white;
  padding: 6px;
  position: relative;
}

.footer-newsletter .newsletter-form .input-group::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #cd1537, #3498db, #cd1537);
  border-radius: 60px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.footer-newsletter .newsletter-form .input-group:focus-within::before {
  opacity: 1;
  animation: glow 2s linear infinite;
}

@keyframes glow {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.footer-newsletter .newsletter-form .form-control {
  flex: 1;
  padding: 20px 30px;
  border: none;
  border-radius: 60px;
  font-size: 16px;
  background: white;
  color: #2d3e50;
  font-weight: 400;
}

.footer-newsletter .newsletter-form .form-control::placeholder {
  color: #95a5a6;
}

.footer-newsletter .newsletter-form .form-control:focus {
  outline: none;
  box-shadow: none;
}

.footer-newsletter .newsletter-form .btn {
  padding: 20px 45px;
  border-radius: 60px;
  white-space: nowrap;
  font-weight: 600;
  font-size: 16px;
  background: linear-gradient(135deg, #cd1537 0%, #e74c3c 100%);
  border: none;
  box-shadow: 0 8px 20px rgba(205, 21, 55, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.footer-newsletter .newsletter-form .btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.footer-newsletter .newsletter-form .btn:hover::before {
  width: 300px;
  height: 300px;
}

.footer-newsletter .newsletter-form .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(205, 21, 55, 0.6);
}

/* Footer Content */
.footer-content {
  background: linear-gradient(180deg, #6c757d 0%, #5a6268 100%);
  padding: 60px 0 40px;
  position: relative;
}

.footer-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
}

.footer-column {
  margin-bottom: 30px;
  position: relative;
  padding: 25px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.footer-column:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(205, 21, 55, 0.3);
  transform: translateY(-5px);
}

.widget-title {
  color: white;
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: 600;
}

.widget p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.8;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
  position: relative;
  padding-left: 20px;
}

.footer-links li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #cd1537;
  transition: transform 0.3s ease;
}

.footer-links li:hover::before {
  transform: translateX(5px);
}

.footer-links a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 14px;
  display: block;
  line-height: 1.6;
  font-weight: 300;
}

.footer-links a:hover {
  color: #cd1537;
  padding-left: 5px;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 12px;
  margin-top: 25px;
  flex-wrap: wrap;
}

.social-links a {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.social-links a::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: linear-gradient(135deg, #cd1537, #e74c3c);
  border-radius: 10px;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;
}

.social-links a:hover::before {
  width: 100%;
  height: 100%;
}

.social-links a i {
  position: relative;
  z-index: 1;
}

.social-links a:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 10px 25px rgba(205, 21, 55, 0.4);
  border-color: transparent;
}

.contact-info {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-info li {
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.6;
}

.contact-info i {
  color: #cd1537;
  margin-right: 10px;
}

.footer-bottom {
  background: linear-gradient(180deg, #2d3e50 0%, #1a252f 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: 0;
  padding: 30px 0;
  position: relative;
}

.footer-bottom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #cd1537, transparent);
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.5px;
}

.footer-bottom p:hover {
  color: rgba(255, 255, 255, 0.9);
}

/* Responsive Styles */
@media (max-width: 991px) {
  .mobile-menu-toggle {
    display: flex;
  }

  .main-nav {
    position: fixed;
    top: 0;
    right: -300px;
    width: 300px;
    height: 100vh;
    background: white;
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
    padding: 80px 30px 30px;
    transition: right 0.3s ease;
    overflow-y: auto;
  }

  .main-nav.mobile-open {
    right: 0;
  }

  .nav-menu {
    flex-direction: column;
    gap: 0;
    width: 100%;
    align-items: stretch;
  }

  .nav-menu li {
    border-bottom: 1px solid #eee;
  }

  .nav-menu a {
    padding: 15px 0;
  }

  .mega-menu-content {
    position: static;
    flex-direction: column;
    min-width: auto;
    box-shadow: none;
    padding: 15px 0 15px 20px;
    margin-top: 0;
    background: #f8f9fa;
    transform: none;
    left: 0;
  }

  .mega-menu-col {
    margin-bottom: 20px;
  }

  .mega-menu-col:last-child {
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  .page-footer {
    padding: 40px 0 20px;
    margin-top: 60px;
  }

  .widget {
    margin-bottom: 30px;
  }
}