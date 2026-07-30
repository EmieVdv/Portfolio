import { useEffect, useRef } from 'react';
import "./Footer.css";

function randomPeaks(count) {
  return Array.from({ length: count }, () => ({
    xRatio: 0.12 + Math.random() * 0.76,
    amplitude: 0.35 + Math.random() * 0.45,
    sigma: 0.08 + Math.random() * 0.06,
  }));
}

function waveOffsetAt(x, width, peaks, baseAmplitude) {
  return peaks.reduce((sum, peak) => {
    const peakX = peak.xRatio * width;
    const sigma = peak.sigma * width;
    return sum + baseAmplitude * peak.amplitude * Math.exp(-((x - peakX) ** 2) / (2 * sigma * sigma));
  }, 0);
}

function buildWavePath({ peaks, width, height, baseline, amplitude, minCover = 8 }) {
  const margin = width * 0.05;
  const steps = 72;
  let d = `M${-margin},${height} L${-margin},${baseline}`;

  for (let i = 0; i <= steps; i += 1) {
    const x = -margin + (i / steps) * (width + margin * 2);
    const offset = waveOffsetAt(x, width, peaks, amplitude);
    const y = Math.min(baseline + offset, height - minCover);
    d += ` L${x.toFixed(1)},${y.toFixed(1)}`;
  }

  d += ` L${width + margin},${height} Z`;
  return d;
}

export default function Footer() {
  const footerRef = useRef(null);
  const bottomWaveSvgRef = useRef(null);
  const bottomWavePathRef = useRef(null);
  const basePeaks = useRef(randomPeaks(3));
  const hoverPeak = useRef({ xRatio: 0.5, amplitude: 0, sigma: 0.16 });
  const targetHoverX = useRef(0.5);
  const targetHoverAmp = useRef(0);
  const rafId = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    function animate() {
      hoverPeak.current.xRatio += (targetHoverX.current - hoverPeak.current.xRatio) * 0.08;
      hoverPeak.current.amplitude += (targetHoverAmp.current - hoverPeak.current.amplitude) * 0.08;

      const footerEl = footerRef.current;
      const svgEl = bottomWaveSvgRef.current;
      const pathEl = bottomWavePathRef.current;

      if (footerEl && svgEl && pathEl) {
        const footerRect = footerEl.getBoundingClientRect();
        const svgRect = svgEl.getBoundingClientRect();
        const viewBoxWidth = 1440;
        const viewBoxHeight = 100;
        const scaleX = viewBoxWidth / svgRect.width;
        const scaleY = viewBoxHeight / svgRect.height;
        const allPeaks = [...basePeaks.current, hoverPeak.current];

        pathEl.setAttribute(
          'd',
          buildWavePath({
            peaks: allPeaks,
            width: footerRect.width * scaleX,
            height: footerRect.height * scaleY,
            baseline: 42,
            amplitude: 50,
            minCover: 10,
          })
        );
      }

      rafId.current = requestAnimationFrame(animate);
    }

    rafId.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId.current);
  }, []);

  function handlePointerMove(event) {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    const footerRect = footerEl.getBoundingClientRect();
    const xRatio = (event.clientX - footerRect.left) / footerRect.width;
    const yRatio = (event.clientY - footerRect.top) / footerRect.height;
    const clampedX = Math.min(1, Math.max(0, xRatio));
    const proximityToBottom = Math.min(1, Math.max(0, yRatio));

    targetHoverX.current = clampedX;
    targetHoverAmp.current = 0.18 + proximityToBottom * 0.14;
  }

  function handlePointerLeave() {
    targetHoverAmp.current = 0;
  }

  return (
    <footer
      className="footer scroll-stage"
      id="contact"
      ref={footerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <svg
        className="footer-wave-top"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C240,10 480,90 720,50 C960,10 1200,80 1440,40 L1440,0 L0,0 Z"
          fill="var(--color-ink)"
        />
      </svg>

      <div className="footer-content">
        <div className="footer-top-row">
          <p className="footer-eyebrow text-h3">
            I'm excited to hear from you!
          </p>

          <button className="footer-back-to-top text-nav" onClick={scrollToTop}>
            Back to top
            <span className="footer-back-to-top-circle">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 10V2M6 2L2.5 5.5M6 2L9.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>

        <div className="footer-contact">
          <a
            href="mailto:emie.vandeveire@telenet.be"
            className="footer-contact-line"
          >
            emie.vandeveire@telenet.be
          </a>
          <a href="tel:+32470247723" className="footer-contact-line">
            +32 470 24 77 23
          </a>
        </div>

        <a
          href="https://www.linkedin.com/in/emie-van-de-veire/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-linkedin"
          aria-label="LinkedIn"
        >
          <svg
            className="footer-linkedin-icon"
            viewBox="0 0 382 382"
            aria-hidden="true"
          >
            <path
              d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472L341.91,330.654L341.91,330.654z"
              fill="currentColor"
            />
          </svg>

        </a>
      </div>

      <svg
        className="footer-wave-bottom"
        ref={bottomWaveSvgRef}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={bottomWavePathRef}
          d="M0,40 C240,90 480,10 720,50 C960,90 1200,20 1440,60 L1440,100 L0,100 Z"
          fill="var(--color-lilac)"
        />
      </svg>
    </footer>
  );
}
