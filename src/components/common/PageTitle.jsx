// FILE: src/components/common/PageTitle.jsx
// ============================================
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <Link to="/">Home</Link>
      </li>
      {items.map((item, index) => (
        <li
          key={index}
          className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}
        >
          {item.link && index !== items.length - 1 ? (
            <Link to={item.link}>{item.label}</Link>
          ) : (
            item.label
          )}
        </li>
      ))}
    </ol>
  );
};

const PageTitle = ({ title, breadcrumbItems }) => {
  return (
    <section className="page-title">
      <div className="title-mask"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>{title}</h1>
            {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageTitle;