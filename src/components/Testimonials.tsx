import React from 'react';
import { testimonials } from '../content';

export const Testimonials: React.FC = () => (
  <section className="testimonials" id="testimonials" aria-labelledby="testimonials-title">
    <div className="container">
      <h2 className="reveal" id="testimonials-title">
        {testimonials.heading}
      </h2>

      <div className="testimonials__grid">
        {testimonials.items.map((t, i) => (
          <blockquote className="quote reveal" key={t.name} style={{ transitionDelay: `${i * 120}ms` }}>
            <span className="quote__mark" aria-hidden="true">
              “
            </span>
            <p>{t.quote}</p>
            <footer>
              <strong>{t.name}</strong>
              <span>{t.place}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  </section>
);
