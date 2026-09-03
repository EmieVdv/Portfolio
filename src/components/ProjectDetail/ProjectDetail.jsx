import { useEffect, useRef, useState } from "react";
import "./ProjectDetail.css";

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProjectDetail({
  category = "",
  title = "",
  content = [],
}) {
  const sections = content.map((section, i) => ({
    ...section,
    id:
      section.id ||
      (section.heading ? slugify(section.heading) : `gallery-${i}`),
  }));

  // only headed sections get a side-index entry
  const navSections = sections.filter((s) => s.heading);

  const [activeId, setActiveId] = useState(navSections[0]?.id);
  const [lightboxImage, setLightboxImage] = useState(null);
  const sectionRefs = useRef({});

  const handleIndexClick = (event, sectionId) => {
    event.preventDefault();

    const section = sectionRefs.current[sectionId];
    if (!section) return;

    setActiveId(sectionId);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    let rafId = 0;

    const updateActiveSection = () => {
      rafId = 0;

      const offset = 180;
      const visibleSections = navSections
        .map((section) => ({
          id: section.id,
          element: sectionRefs.current[section.id],
        }))
        .filter(({ element }) => element);

      let currentId = visibleSections[0]?.id;

      for (const { id, element } of visibleSections) {
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [navSections]);

  useEffect(() => {
    if (!lightboxImage) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setLightboxImage(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage]);

  const openLightbox = (src, alt) => setLightboxImage({ src, alt });

  return (
    <div className="project-detail">
      <header className="project-detail-header">
        <p className="text-h3 project-detail-eyebrow">{category}</p>
        <h1 className="project-detail-title text-h2">{title}</h1>

        <svg
          className="project-detail-wave"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 C240,0 480,90 720,40 C960,0 1080,60 1200,30 L1200,100 L0,100 Z"
            fill="var(--color-cream)"
          />
        </svg>
      </header>

      <div className="project-detail-body">
        <div className="side-index">
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(event) => handleIndexClick(event, s.id)}
              className={s.id === activeId ? "text-nav active" : "text-nav"}
            >
              {s.heading}
            </a>
          ))}
        </div>

        <div className="content-col">
          {sections.map((section) => {
            if (section.type === "gallery") {
              return (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className={`detail-section gallery-section ${section.heading ? "" : "no-heading"}`}
                >
                  {section.heading && (
                    <h3 className="text-h3 section-heading">
                      {section.heading}
                    </h3>
                  )}
                  <div className="gallery-grid">
                    {section.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={
                          section.heading
                            ? `${section.heading} ${i + 1}`
                            : `Gallery image ${i + 1}`
                        }
                        className="gallery-image"
                        onClick={() =>
                          openLightbox(src, section.heading || "Gallery image")
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openLightbox(
                              src,
                              section.heading || "Gallery image",
                            );
                          }
                        }}
                        role="button"
                        tabIndex="0"
                      />
                    ))}
                  </div>
                </section>
              );
            }

            // one image per section, taken from whichever paragraph carries it
            const imageParagraph = section.paragraphs.find((p) => p.image);
            const hasImage = Boolean(imageParagraph);
            const isReversed = imageParagraph?.imagePosition === "left";

            return (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className={[
                  "detail-section",
                  hasImage ? "has-image" : "",
                  isReversed ? "reverse" : "",
                ]
                  .join(" ")
                  .trim()}
              >
                <div className="detail-section-text">
                  <h3 className="text-h3 section-heading">{section.heading}</h3>

                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="text-paragraph">
                      {paragraph.text}
                    </p>
                  ))}

                  {section.techs && (
                    <div className="tech-list">
                      {section.techs.map((t) => (
                        <span className="tech-pill text-nav" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {hasImage && (
                  <div className="detail-section-media-wrap">
                    <img
                      src={imageParagraph.image}
                      alt={section.heading}
                      className="detail-section-media"
                      onClick={() =>
                        openLightbox(imageParagraph.image, section.heading)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          openLightbox(imageParagraph.image, section.heading);
                        }
                      }}
                      role="button"
                      tabIndex="0"
                    />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      {lightboxImage && (
        <div
          className="detail-image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxImage.alt} larger`}
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            className="detail-image-lightbox-close"
            aria-label="Close image"
            onClick={() => setLightboxImage(null)}
          >
            <span aria-hidden="true">&#10005;</span>
          </button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            className="detail-image-lightbox-media"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
