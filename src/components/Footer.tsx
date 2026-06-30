import { siteConfig, navLinks } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-mono text-lg font-bold">
            <span className="text-[var(--accent)]">DA</span>DEV
          </p>
          <p className="mt-1 max-w-xs text-sm text-[var(--text-muted)]">
            Building sophisticated, scalable applications with modern
            technologies.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Quick Links
          </p>
          <ul className="flex flex-wrap justify-center gap-4 sm:justify-start">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                  data-cursor="link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-[var(--border)] pt-8 text-center text-sm text-[var(--text-muted)]">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
        <p className="mt-1">
          Designed &amp; Built with Next.js &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
