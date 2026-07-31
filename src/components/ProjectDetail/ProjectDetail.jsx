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
  const headingRefs = useRef({});

  const handleIndexClick = (event, sectionId) => {
    event.preventDefault();

    const section = sectionRefs.current[sectionId];
    if (!section) return;

    setActiveId(sectionId);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length === 0) return;

        const topEntry = visibleEntries.reduce((current, entry) => {
          if (!current) return entry;
          return entry.boundingClientRect.top < current.boundingClientRect.top ? entry : current;
        }, null);

        if (topEntry) setActiveId(topEntry.target.dataset.sectionId || topEntry.target.id);
      },
      { rootMargin: '-128px 0px -70% 0px', threshold: 0 }
    );

    Object.values(headingRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
          {content.map((section) => (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => (sectionRefs.current[section.id] = el)}
              className="detail-section"
            >
              <h3
                data-section-id={section.id}
                ref={(el) => (headingRefs.current[section.id] = el)}
                className="text-h3 section-heading"
              >
                {section.heading}
              </h3>

              {section.paragraphs.map((p, j) => (
                <div
                  key={j}
                  className={`paragraph-row ${p.image ? 'has-image' : ''} ${
                    j % 2 === 1 ? 'reverse' : ''
                  }`}
                >
                  <p className="text-paragraph">{p.text}</p>
                  {p.image && <img src={p.image} alt="" className="paragraph-image" />}
                </div>
              ))}

              {section.techs && (
                <div className="tech-list">
                  {section.techs.map((t) => (
                    <span className="tech-pill text-nav" key={t}>{t}</span>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}