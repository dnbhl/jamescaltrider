import React, { useRef, useState } from 'react';
import { clip } from '../content';
import { PlayIcon, PauseIcon } from './Icons';

/**
 * The original buried this as a muted autoplaying background with no context.
 * Here it is a real, labelled video: poster + play ring, pauses on demand,
 * and the file is only fetched when the visitor presses play.
 */
export const FilmClip: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    v.play().catch(() => setStarted(false));
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => undefined);
    else v.pause();
  };

  return (
    <section className="clip" id="clip" aria-labelledby="clip-title">
      <div className="clip__frame">
        <video
          ref={videoRef}
          src={clip.src}
          poster={clip.poster}
          preload={started ? 'auto' : 'none'}
          playsInline
          controls={started}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            setStarted(false);
          }}
          aria-label={clip.title}
        />

        {!started && (
          <button className="clip__play" onClick={play} aria-label={clip.playLabel}>
            <span className="play-ring">
              <PlayIcon size={30} />
            </span>
          </button>
        )}

        <div className="clip__caption">
          <div>
            <span className="eyebrow">{clip.eyebrow}</span>
            <strong id="clip-title">{clip.title}</strong>
          </div>

          {started && (
            <button className="clip__control" onClick={toggle}>
              {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
              {playing ? clip.pauseLabel : clip.playLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
