import { useEffect, useRef, useState } from 'react';
import './ProjectDetail.css';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'research', label: 'Research & Development' },
  { id: 'design-process', label: 'Design Process' },
  { id: 'development', label: 'Development' },
  { id: 'my-role', label: 'My role' },
  { id: 'reflection', label: 'Reflection' },
  { id: 'technologies', label: 'Technologies' },
];

export default function ProjectDetail({ category = '', title = '', content = [] }) {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const sectionRefs = useRef({});

  const handleIndexClick = (event, sectionId) => {
    event.preventDefault();

    const section = sectionRefs.current[sectionId];
    if (!section) return;

    setActiveId(sectionId);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      rafId = 0;

      const offset = 180;
      const sections = content
        .map((section) => ({ id: section.id, element: sectionRefs.current[section.id] }))
        .filter(({ element }) => element);

      let currentId = sections[0]?.id || SECTIONS[0].id;

      for (const { id, element } of sections) {
        if (element.getBoundingClientRect().top <= offset) {
          currentId = id;
        }
      }

      setActiveId(currentId);
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [content]);

  return (
    <div className="project-detail">
      <header className="project-detail-header">
        <p className="text-h3 project-detail-eyebrow">{category}</p>
        <h1 className="project-detail-title text-h2">{title}</h1>

        <svg className="project-detail-wave" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path
            d="M0,50 C240,0 480,90 720,40 C960,0 1080,60 1200,30 L1200,100 L0,100 Z"
            fill="var(--color-cream)"
          />
        </svg>
      </header>

      <div className="project-detail-body">
        <div className="side-index">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(event) => handleIndexClick(event, s.id)}
              className={s.id === activeId ? 'text-nav active' : 'text-nav'}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="content-col">
          {content.map((section) => {
            const image = section.paragraphs.find((paragraph) => paragraph.image)?.image;

            return (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className="detail-section"
              >
                <div className={`detail-section-layout ${image ? 'has-image' : ''}`}>
                  <div className="detail-section-text">
                    <h3 className="text-h3 section-heading">{section.heading}</h3>

                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="text-paragraph">
                        {paragraph.text}
                      </p>
                    ))}
                  </div>

                  {image && (
                    <div className="detail-section-image">
                      <img src={image} alt="" className="detail-section-image-media" />
                    </div>
                  )}
                </div>

                {section.techs && (
                  <div className="tech-list">
                    {section.techs.map((t) => (
                      <span className="tech-pill text-nav" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}