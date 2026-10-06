import React from 'react';
import { faqs } from '../content';

/** Renders the answer, turning the single linked phrase (if any) into a cream text link. */
function Answer({ text, link }: { text: string; link?: { label: string; href: string } }) {
  if (!link) return <p className="faq__a">{text}</p>;

  const idx = text.indexOf(link.label);
  if (idx === -1) {
    return (
      <p className="faq__a">
        {text}{' '}
        <a className="text-link" href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      </p>
    );
  }

  return (
    <p className="faq__a">
      {text.slice(0, idx)}
      <a className="text-link" href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
      {text.slice(idx + link.label.length)}
    </p>
  );
}

export const FAQ: React.FC = () => (
  <section className="faq" id="faqs" aria-labelledby="faq-title">
    <div className="container faq__grid">
      <h2 className="display display--lg reveal" id="faq-title">
        {faqs.heading}
      </h2>

      <dl className="faq__list">
        {faqs.items.map((item, i) => (
          <div className="reveal" key={item.q} style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
            <span className="faq__num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <dt className="faq__q">{item.q}</dt>
            <dd>
              <Answer text={item.a} link={item.link} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
