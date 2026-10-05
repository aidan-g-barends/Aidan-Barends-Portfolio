export default function Eyebrow({
  index,
  label,
  className = "",
}: {
  index?: string;
  label: string;
  className?: string;
}) {
  return (
    <p
      className={`mb-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-accent ${className}`}
    >
      {index ? `${index} / ${label}` : label}
    </p>
  );
}
