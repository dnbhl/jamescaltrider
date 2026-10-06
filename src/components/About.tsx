import React, { useState } from 'react';
import { about, resume } from '../content';
import { FilmIcon } from './Icons';
import { Sheet } from './Sheet';

export const About: React.FC = () => {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      {/* About me — cream portrait / black copy */}
      <section className="about" id="about" aria-labelledby="about-title">
        <figure className="about__figure">
          <img
            src="/images/about-jimmy-suit-snare.jpg"
            alt={about.portraitAlt}
            width={1128}
            height={1400}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="about__body">
          <div className="reveal">
            <h2 className="display display--xl" id="about-title">
              {about.heading}
            </h2>
            <div className="prose">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="about__actions">
              <button className="btn" onClick={() => setResumeOpen(true)}>
                {about.resumeLabel}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching philosophy — black copy / B&W live photo */}
      <section className="teach" aria-label="Teaching philosophy">
        <div className="teach__body">
          <div className="reveal">
            <p>{about.teaching}</p>
            <aside className="callout">
              <FilmIcon size={20} />
              <p>
                <strong>{about.funFactLead}</strong>{' '}
                Catch me playing drums in the Bob Dylan biopic <em>A Complete Unknown</em>, starring
                Timothée Chalamet. <a href="#clip">Check out the clip below!</a>
              </p>
            </aside>
          </div>
        </div>

        <figure className="teach__figure">
          <img
            src="/images/texture-cymbal-bw.jpg"
            alt={about.livePhotoAlt}
            width={1392}
            height={1400}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>

       
          {/* Résumé overlay — embeds the official resume PDF document */}
      <Sheet open={resumeOpen} title="James Caltrider — Resume" onClose={() => setResumeOpen(false)}>
        <div style={{ 
          width: '100%', 
          height: '85vh', /* Fills the whole modal height */
          overflow: 'hidden',
          background: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <iframe
            src="https://2352e02b-b37f-47b2-98c5-777c171779b2.usrfiles.com/ugd/2352e0_2a5056473b9c4de0a8a25b4cbbb40e65.pdf#navpanes=0&toolbar=0&scrollbar=0&view=FitH"
            title="James Caltrider Resume"
            width="100%"
            height="100%"
            style={{ border: 'none', background: '#fff' }}
          />
        </div>
      </Sheet>



    </>
  );
};
