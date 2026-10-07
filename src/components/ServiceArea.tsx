import React from 'react';
import { areas, bandImageAlt } from '../content';

export const ServiceArea: React.FC = () => (
  <>
    <section className="areas" id="neighborhoods" aria-labelledby="areas-title">
      <div className="container areas__grid">
        <figure className="areas__figure reveal">
          <img
            src="/images/brooklyn-street-autumn.jpg"
            alt={areas.imageAlt}
            width={1600}
            height={1058}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="areas__body reveal">
          <h2 className="display display--md" id="areas-title">
            {areas.heading}
          </h2>
          <p className="muted">{areas.body}</p>

          <div className="areas__lists">
            <div>
              <h3>Brooklyn</h3>
              <ul>
                {areas.brooklyn.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Manhattan</h3>
              <ul>
                {areas.manhattan.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="areas__actions">
            <a className="btn" href="#contact">
              {areas.cta}
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Full-bleed photo band, as in the original */}
    <div className="band" role="img" aria-label={bandImageAlt}>
      <img
        src="/images/drumkit-purple-stage.jpg"
        alt=""
        width={2000}
        height={1124}
        loading="lazy"
        decoding="async"
      />
    </div>
  </>
);
