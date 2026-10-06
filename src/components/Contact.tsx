import React, { useState } from 'react';
import { contact, policies, site } from '../content';
import { ContactForm } from './ContactForm';
import { Sheet } from './Sheet';

type Policy = keyof typeof policies | null;

export const Contact: React.FC = () => {
  const [policy, setPolicy] = useState<Policy>(null);
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="contact" id="contact">
        <h2 className="contact__title reveal">{contact.heading}</h2>

        <div className="contact__grid">
          <div className="contact__col">
            <ContactForm />
          </div>

          <div className="contact__col contact__meta">
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span className="spacer" aria-hidden="true" />
            <span>{site.location}</span>
          </div>

          <div className="contact__col contact__legal">
            <button onClick={() => setPolicy('privacy')}>{contact.privacy}</button>
            <button onClick={() => setPolicy('accessibility')}>{contact.accessibility}</button>
          </div>
        </div>

        <div className="footer__bottom">
          © {year}, J Caltrider. Designed by{' '}
          <a href={site.designerUrl} target="_blank" rel="noopener noreferrer">
            {site.designerName}
          </a>
        </div>
      </footer>

      <Sheet open={policy !== null} title={policy ? policies[policy].title : ''} onClose={() => setPolicy(null)}>
        <div className="sheet__prose">
          {policy && policies[policy].paragraphs.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
        </div>
      </Sheet>
    </>
  );
};
