import './Hero.css';

export default function Hero() {
  return (
    <section className="hero scroll-stage">
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
        <div className="hero-photo" />
        <p className="hero-bio-text text-paragraph">
          Korte omschrijving over jezelf: wie je bent, wat je studeert, en wat
          voor werk je maakt — AR, spatial audio, interactieve installaties.
          Twee tot drie zinnen.
        </p>
      </div>

      <svg
        className="hero-wave"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64 C240,110 480,10 720,50 C960,90 1200,20 1440,64 L1440,120 L0,120 Z"
          fill="var(--color-purple)"
        />
      </svg>
    </section>
  );
}