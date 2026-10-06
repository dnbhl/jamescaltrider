import React from 'react';
import { lessons } from '../content';

export const Lessons: React.FC = () => (
  <section className="lessons" id="lessons" aria-labelledby="lessons-title">
    <div className="container lessons__grid">
      <h2 className="display display--lg reveal" id="lessons-title">
        {lessons.heading}
      </h2>

      <div className="lessons__list">
        {lessons.items.map((item, i) => (
          <article className="lesson reveal" key={item.title} style={{ transitionDelay: `${i * 90}ms` }}>
            <h3>{item.title}</h3>
            <span className="lesson__tag">{item.tag}</span>
            <p>{item.body}</p>
            {item.link && (
              <a
                className="text-link"
                href={item.link.href}
                target={item.link.external ? '_blank' : undefined}
                rel={item.link.external ? 'noopener noreferrer' : undefined}
              >
                {item.link.label}
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
);
