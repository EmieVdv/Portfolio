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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' } // vuurt wanneer een sectie rond het midden van het scherm staat
    );

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
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
              className={s.id === activeId ? 'text-nav active' : 'text-nav'}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="content-col">
          {content.map((block, i) => (
            <section
              key={block.id}
              id={block.id}
              ref={(el) => (sectionRefs.current[block.id] = el)}
              className={`block ${block.image ? '' : 'text-only'} ${i % 2 === 1 ? 'reverse' : ''}`}
            >
              <div className="block-text">
                <h3 className="text-h3">{block.heading}</h3>
                {block.paragraphs.map((p, j) => <p className="text-paragraph" key={j}>{p}</p>)}
                {block.techs && (
                  <div className="tech-list">
                    {block.techs.map((t) => (
                      <span className="tech-pill text-nav" key={t}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
              {block.image && (
                <img src={block.image} alt="" className="block-media" />
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}