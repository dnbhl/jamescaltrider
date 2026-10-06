import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { nav, site } from '../content';
import { MenuIcon, CloseIcon } from './Icons';
import { useActiveSection, useEscape, useScrollLock } from '../hooks/useUI';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const sectionIds = useMemo(() => nav.map((n) => n.href.replace('#', '')), []);
  const handleActive = useCallback((id: string | null) => setActive(id), []);
  useActiveSection(sectionIds, handleActive);

  useScrollLock(menuOpen);
  useEscape(menuOpen, () => setMenuOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 861px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container header__inner">
          <a className="brand" href="#top" aria-label={`${site.name} — home`}>
            {site.name}
          </a>

          <nav className="nav" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href.slice(1) ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="nav-toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`menu${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="menu__bar">
          <span className="brand">{site.name}</span>
          <button
            className="nav-toggle"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="menu__links" aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="menu__meta">
          <a href={site.phoneHref} tabIndex={menuOpen ? 0 : -1}>
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} tabIndex={menuOpen ? 0 : -1}>
            {site.email}
          </a>
          <span>{site.location}</span>
        </div>
      </div>
    </>
  );
};
