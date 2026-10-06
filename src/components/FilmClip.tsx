import React from 'react';
import { clip } from '../content';

/**
 * Clean, looping, autoplaying background video.
 */
export const FilmClip: React.FC = () => {
  return (
    <section className="clip" id="clip" aria-labelledby="clip-title">
      <div className="clip__frame">
        <video
          src={clip.src}
          poster={clip.poster}
          preload="auto"
          playsInline
          autoPlay
          loop
          muted
          controls={false}
          aria-label={clip.title}
        />

        <div className="clip__caption">
          <div>
            <span className="eyebrow">{clip.eyebrow}</span>
            <strong id="clip-title">{clip.title}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
