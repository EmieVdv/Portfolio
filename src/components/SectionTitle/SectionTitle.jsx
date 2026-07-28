import './SectionTitle.css';

export default function SectionTitle({ text, hint }) {
  return (
    <section className="section-title">
      <h2 className="section-title-text text-h2">{text}</h2>
      {hint && <p className="section-title-hint text-h3">{hint}</p>}
    </section>
  );
}