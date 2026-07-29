import { Link } from 'react-router-dom';
import './ProjectPreview.css';

export default function ProjectPreview({ index, title, category, images, slug }) {
  return (
    <section className="project-preview">
      <span className="project-preview-index text-h3">{index}</span>

      <div className="project-preview-collage">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt=""
            className="collage-img"
            style={{ top: img.top, left: img.left, width: img.width }}
          />
        ))}

        <div className="project-preview-collage-text">
          <h3 className="project-preview-category text-h3">{category}</h3>
          <Link to={`/projecten/${slug}`} className="project-preview-title text-h2">
            {title}
          </Link>
        </div>
      </div>
    </section>
  );
}