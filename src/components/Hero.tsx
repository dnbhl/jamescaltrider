import React from 'react';
import { hero } from '../content';

export const Hero: React.FC = () => (
  <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero__media">
      <picture>
        <source media="(max-width: 860px)" srcSet="/images/hero-jimmy-lights-mobile.jpg" />
        <img
          src="/images/hero-jimmy-lights.jpg"
          alt={hero.imageAlt}
          width={2000}
          height={1263}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="hero__scrim" />
    </div>

    <div className="container">
      <div className="hero__panel">
        <h1 className="hero__title" id="hero-title">
          {hero.title}
        </h1>
        <p className="hero__sub">{hero.subtitle}</p>
        <p className="hero__copy">{hero.body}</p>
        <div className="hero__cta">
          <a className="btn" href="#contact">
            {hero.cta}
          </a>
        </div>
      </div>
    </div>
  </section>
);
