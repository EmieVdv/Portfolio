import { useEffect, useRef } from 'react';
import "./Hero.css";

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

export default function Hero() {
  const heroRef = useRef(null);
  const waveSvgRef = useRef(null);
  const wavePathRef = useRef(null);
  const basePeaks = useRef(randomPeaks(3));
  const hoverPeak = useRef({ xRatio: 0.5, amplitude: 0, sigma: 0.16 });
  const targetHoverX = useRef(0.5);
  const targetHoverAmp = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    function animate() {
      hoverPeak.current.xRatio += (targetHoverX.current - hoverPeak.current.xRatio) * 0.08;
      hoverPeak.current.amplitude += (targetHoverAmp.current - hoverPeak.current.amplitude) * 0.08;

      const heroEl = heroRef.current;
      const svgEl = waveSvgRef.current;
      const pathEl = wavePathRef.current;

      if (heroEl && svgEl && pathEl) {
        const heroRect = heroEl.getBoundingClientRect();
        const svgRect = svgEl.getBoundingClientRect();
        const viewBoxWidth = 1440;
        const viewBoxHeight = 120;
        const scaleX = viewBoxWidth / svgRect.width;
        const scaleY = viewBoxHeight / svgRect.height;
        const allPeaks = [...basePeaks.current, hoverPeak.current];

        pathEl.setAttribute(
          'd',
          buildWavePath({
            peaks: allPeaks,
            width: heroRect.width * scaleX,
            height: heroRect.height * scaleY,
            baseline: 52,
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
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const heroRect = heroEl.getBoundingClientRect();
    const xRatio = (event.clientX - heroRect.left) / heroRect.width;
    const yRatio = (event.clientY - heroRect.top) / heroRect.height;
    const clampedX = Math.min(1, Math.max(0, xRatio));
    const proximityToWave = Math.min(1, Math.max(0, yRatio));

    targetHoverX.current = clampedX;
    targetHoverAmp.current = 0.4 + proximityToWave * 0.5;
  }

  function handlePointerLeave() {
    targetHoverAmp.current = 0;
  }

  return (
    <section
      className="hero scroll-stage"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <p className="hero-eyebrow text-h3">Portfolio - Emie Van de Veire</p>

      <div className="hero-title-container">
        <h1 className="hero-title text-display">Interactive</h1>
        <img
          className="hero-subtitle-image"
          src="/images/MediaDeveloper.svg"
          alt="Media Developer"
        />
      </div>

      <div className="hero-bio">
        <img
          className="hero-photo"
          src="/images/profile2.png"
          alt="Emie Van de Veire"
        />
        <p className="hero-bio-text text-paragraph">
          Hi, my name is Emie. I'm a Graphic and Digital Media student
          specializing in Interactive Media Development at Artevelde Hogeschool in Ghent. I love combining creativity with
          technology to design and build engaging digital experiences. I'm
          always eager to learn, challenge myself, and bring new ideas to life.
        </p>
      </div>

      <svg
        className="hero-wave"
        ref={waveSvgRef}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={wavePathRef}
          d="M0,64 C240,110 480,10 720,50 C960,90 1200,20 1440,64 L1440,120 L0,120 Z"
          fill="var(--color-purple)"
        />
      </svg>
    </section>
  );
}
