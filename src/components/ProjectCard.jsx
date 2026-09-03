import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, reversed = false }) {
  const { number, title, description, technologies, image, githubUrl, liveUrl } = project;
  const primaryUrl = liveUrl || githubUrl;

  return (
    <article
      className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center py-14 md:py-20 border-b border-line group ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="overflow-hidden rounded-xl border border-line bg-cream-dim aspect-[16/11]">
        <img
          src={image}
          alt={`Screenshot of ${title}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
          onError={(e) => {
            e.currentTarget.style.opacity = "0";
          }}
        />
      </div>

      <div>
        <span className="editorial-num text-lg text-ink-soft">{number}</span>
        <h3 className="font-serif text-2xl md:text-3xl text-ink mt-3">{title}</h3>
        <p className="text-ink-soft leading-relaxed mt-4 max-w-md">{description}</p>

        <ul className="flex flex-wrap gap-2 mt-6" aria-label={`Technologies used in ${title}`}>
          {technologies.map((tech) => (
            <li
              key={tech}
              className="text-xs font-medium text-ink-soft border border-line rounded-full px-3 py-1"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-6 mt-7">
          {primaryUrl && (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-hover"
            >
              View project
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
          {liveUrl && githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft underline-hover"
            >
              Source code
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
