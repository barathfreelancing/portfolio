export default function ServiceCard({ service }) {
  const { number, title, description, icon: Icon } = service;

  return (
    <div className="border-t border-line py-8 group grid grid-cols-1 md:grid-cols-[2.5rem_42%_1fr] md:items-start gap-y-3 md:gap-y-0 md:gap-x-8">
      {/* Column 1 – number */}
      <span className="editorial-num text-lg text-ink-soft">{number}</span>

      {/* Column 2 – icon + title */}
      <div className="flex items-center gap-3">
        <Icon
          size={18}
          className="text-ink-soft transition-colors duration-300 group-hover:text-ink"
          aria-hidden="true"
        />
        <h3 className="font-serif text-xl text-ink">{title}</h3>
      </div>

      {/* Column 3 – description (right-side column, same row as title on desktop) */}
      <p className="text-ink-soft leading-relaxed md:col-start-3">{description}</p>
    </div>
  );
}
