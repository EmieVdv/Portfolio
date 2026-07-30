// components/ProjectPreview.jsx
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import './ProjectPreview.css';

function randomPeaks(count) {
  return Array.from({ length: count }, () => ({
    xRatio: 0.15 + Math.random() * 0.7,       // niet te dicht bij de randen
    amplitude: 0.6 + Math.random() * 0.4,     // relatieve sterkte van deze piek
    sigma: 0.1 + Math.random() * 0.08,        // relatieve breedte van deze piek
  }));
}

function waveOffsetAt(x, width, peaks, baseAmplitude) {
  return peaks.reduce((sum, peak) => {
    const peakX = peak.xRatio * width;
    const sigma = peak.sigma * width;
    return sum + baseAmplitude * peak.amplitude * Math.exp(-((x - peakX) ** 2) / (2 * sigma * sigma));
  }, 0);
}

function buildWavePath({ peaks, width, height, baseline, amplitude, direction, edgeY, minCover = 5 }) {
  const margin = width * 0.05;
  const steps = 64;
  let d = direction === 'bottom'
    ? `M${-margin},${height} L${-margin},${baseline}`
    : `M${-margin},0 L${-margin},${baseline}`;

  for (let i = 0; i <= steps; i++) {
    const x = -margin + (i / steps) * (width + margin * 2);
    const offset = waveOffsetAt(x, width, peaks, amplitude, 0);
    let y = direction === 'bottom' ? baseline - offset : baseline + offset;

    // clamp: houd de golf net over de foto-rand heen
    if (direction === 'bottom') {
      y = Math.min(y, edgeY - minCover);
    } else {
      y = Math.max(y, edgeY + minCover);
    }

    d += ` L${x.toFixed(1)},${y.toFixed(1)}`;
  }

  d += direction === 'bottom'
    ? ` L${width + margin},${height} Z`
    : ` L${width + margin},0 Z`;
  return d;
}

export default function ProjectPreview({ index, category, title, previewImages, slug }) {
  const collageRef = useRef(null);
  const bottomPathRef = useRef(null);
  const topPathRef = useRef(null);
  const bottomPeaks = useRef([]);
  const topPeaks = useRef([]);
  const hoverPeak = useRef({ xRatio: 0.5, amplitude: 0, sigma: 0.16 });
  const targetHoverX = useRef(0.5);
  const targetHoverAmp = useRef(0);
  const rafId = useRef(null);
  const rowHeightRef = useRef(0);

  const [ratios, setRatios] = useState({});      // per index: naturalWidth/naturalHeight
  const [rowHeight, setRowHeight] = useState(0);  // berekende gedeelde hoogte in px
  const gap = 8;

  function handleImageLoad(i, e) {
    const { naturalWidth, naturalHeight } = e.target;
    setRatios((prev) => ({ ...prev, [i]: naturalWidth / naturalHeight }));
  }

  useEffect(() => {
    rowHeightRef.current = rowHeight;
  }, [rowHeight]);

  useEffect(() => {
    bottomPeaks.current = randomPeaks(2 + Math.round(Math.random()));
    topPeaks.current = randomPeaks(2 + Math.round(Math.random()));
  }, []);

  // herbereken de rij-hoogte zodra we alle verhoudingen kennen, of bij resize
  useEffect(() => {
    function recalc() {
      const el = collageRef.current;
      if (!el) return;
      const loadedRatios = previewImages.map((_, i) => ratios[i]).filter(Boolean);
      if (loadedRatios.length !== previewImages.length) return; // wacht tot alles geladen is

      const { width, height } = el.getBoundingClientRect();
      const totalGaps = gap * (previewImages.length - 1);
      const sumRatios = loadedRatios.reduce((sum, r) => sum + r, 0);

      // hoogte die nodig is zodat de som van alle breedtes exact de beschikbare breedte vult
      const widthBasedHeight = (width - totalGaps) / sumRatios;

      // nooit hoger dan de container zelf
      setRowHeight(Math.min(widthBasedHeight, height));
    }

    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [ratios, previewImages]);

  useEffect(() => {
    function animate() {
      hoverPeak.current.xRatio += (targetHoverX.current - hoverPeak.current.xRatio) * 0.08;
      hoverPeak.current.amplitude += (targetHoverAmp.current - hoverPeak.current.amplitude) * 0.08;

      const el = collageRef.current;
      if (el && bottomPathRef.current && topPathRef.current) {
        const { width, height } = el.getBoundingClientRect();
        const currentRowHeight = rowHeightRef.current;
        if (!currentRowHeight) {
          rafId.current = requestAnimationFrame(animate);
          return;
        }

        const photoTop = (height - currentRowHeight) / 2;
        const photoBottom = photoTop + currentRowHeight;
        const baselineInset = Math.max(4, Math.min(currentRowHeight * 0.05, 14));
        const waveAmplitude = Math.min(currentRowHeight * 0.08, 32);
        const allBottomPeaks = [...bottomPeaks.current, hoverPeak.current];
        const allTopPeaks = [...topPeaks.current, hoverPeak.current];

        bottomPathRef.current.setAttribute('d', buildWavePath({
          peaks: allBottomPeaks, width, height,
          baseline: photoBottom - baselineInset, amplitude: waveAmplitude, direction: 'bottom',
          edgeY: photoBottom,
          minCover: 4,
        }));
        topPathRef.current.setAttribute('d', buildWavePath({
          peaks: allTopPeaks, width, height,
          baseline: photoTop + baselineInset, amplitude: waveAmplitude, direction: 'top',
          edgeY: photoTop,
          minCover: 4,
        }));
      }
      rafId.current = requestAnimationFrame(animate);
    }
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  function handlePhotoEnter(e) {
    const el = collageRef.current;
    if (!el) return;
    const collageRect = el.getBoundingClientRect();
    const photoRect = e.currentTarget.getBoundingClientRect();
    const photoCenterX = photoRect.left + photoRect.width / 2 - collageRect.left;
    targetHoverX.current = photoCenterX / collageRect.width;
    targetHoverAmp.current = -1.5;
  }

  function handlePhotoLeave() {
    targetHoverAmp.current = 0;
  }

  return (
    <section className="project-preview scroll-stage">
      <div className="project-preview-header">
        <div className="project-preview-topbar">
          <span className="text-h3">{index}</span>
          <span className="project-preview-line" />
          <span className="text-h3 project-preview-category">{category}</span>
        </div>
        <Link to={`/projecten/${slug}`} className="project-preview-title text-h2">
          {title}
        </Link>
      </div>

      <div className="project-preview-collage" ref={collageRef}>
        <div className="collage-photos" style={{ opacity: rowHeight ? 1 : 0 }}>
          {previewImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt=""
              className="collage-photo"
              style={ratios[i] ? { height: rowHeight, width: rowHeight * ratios[i] } : undefined}
              onLoad={(e) => handleImageLoad(i, e)}
              onMouseEnter={handlePhotoEnter}
              onMouseLeave={handlePhotoLeave}
            />
          ))}
        </div>

        <svg className="collage-wave-overlay">
          <path ref={topPathRef} fill="var(--color-purple)" />
          <path ref={bottomPathRef} fill="var(--color-purple)" />
        </svg>
      </div>
    </section>
  );
}