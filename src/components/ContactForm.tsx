import React, { useState } from 'react';
import { contact, site } from '../content';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  inquiry: string;
  company: string; // honeypot — must stay empty
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = { firstName: '', lastName: '', email: '', phone: '', inquiry: '', company: '' };

const NAME_RE = /^[\p{L}\p{M}' .-]{1,60}$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d()\-.\s]{7,20}$/;

/**
 * Optional form backend (Formspree, Netlify Forms, Basin, etc.).
 * Set VITE_FORM_ENDPOINT in .env to post over HTTPS; without it the form
 * composes an email in the visitor's mail app so nothing is ever lost.
 */
const FORM_ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim();

function validate(v: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!NAME_RE.test(v.firstName.trim())) errors.firstName = 'Please enter your first name.';
  if (!NAME_RE.test(v.lastName.trim())) errors.lastName = 'Please enter your last name.';
  if (!EMAIL_RE.test(v.email.trim()) || v.email.length > 120) errors.email = 'Please enter a valid email address.';
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) errors.phone = 'Please enter a valid phone number.';
  if (v.inquiry.trim().length < 2) errors.inquiry = 'Let me know a little about what you’re looking for.';
  if (v.inquiry.length > 2000) errors.inquiry = 'Please keep your message under 2,000 characters.';
  return errors;
}

export const ContactForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mail' | 'error'>('idle');

  const update = (key: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: silently drop bot submissions.
    if (values.company) {
      setStatus('sent');
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(`field-${firstInvalid}`)?.focus();
      return;
    }

    const payload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      inquiry: values.inquiry.trim(),
    };

    if (FORM_ENDPOINT && FORM_ENDPOINT.startsWith('https://')) {
      // TODO(security): spam filtering and rate limiting are delegated to the form provider.
      try {
        setStatus('sending');
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Request failed');
        setStatus('sent');
        setValues(EMPTY);
      } catch {
        setStatus('error');
      }
      return;
    }

    // Fallback: compose the inquiry in the visitor's email app.
    const subject = `Drum lesson inquiry — ${payload.firstName} ${payload.lastName}`;
    const body = [
      `Name: ${payload.firstName} ${payload.lastName}`,
      `Email: ${payload.email}`,
      payload.phone ? `Phone: ${payload.phone}` : null,
      '',
      payload.inquiry,
    ]
      .filter((line) => line !== null)
      .join('\n');

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('mail');
  };

  const field = (
    key: keyof FormValues,
    label: string,
    opts: { type?: string; required?: boolean; autoComplete?: string; textarea?: boolean } = {}
  ) => {
    const id = `field-${key}`;
    const errorId = `${id}-error`;
    const hasError = Boolean(errors[key]);
    const common = {
      id,
      name: key,
      value: values[key],
      onChange: update(key),
      required: opts.required,
      autoComplete: opts.autoComplete,
      'aria-invalid': hasError || undefined,
      'aria-describedby': hasError ? errorId : undefined,
    };

    return (
      <div className={`field${hasError ? ' is-invalid' : ''}`}>
        <label htmlFor={id}>
          {label}
          {opts.required && <span aria-hidden="true"> *</span>}
        </label>
        {opts.textarea ? (
          <textarea {...common} rows={3} maxLength={2000} />
        ) : (
          <input {...common} type={opts.type ?? 'text'} maxLength={key === 'email' ? 120 : 60} />
        )}
        {hasError && (
          <span className="field__error" id={errorId} role="alert">
            {errors[key]}
          </span>
        )}
      </div>
    );
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__row">
        {field('firstName', 'First name', { required: true, autoComplete: 'given-name' })}
        {field('lastName', 'Last name', { required: true, autoComplete: 'family-name' })}
      </div>
      {field('email', 'Email', { type: 'email', required: true, autoComplete: 'email' })}
      {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel' })}
      {field('inquiry', 'Inquiry', { required: true, textarea: true })}

      {/* Honeypot (hidden from people, visible to bots) */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="field-company">Company</label>
        <input id="field-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={update('company')} />
      </div>

      <button className="btn btn--block" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : contact.submit}
      </button>

      <p className="form__status" role="status" aria-live="polite">
        {status === 'sent' && 'Thanks! Your message is on its way — I’ll be in touch soon.'}
        {status === 'mail' && (
          <>
            Your email app should open with your message ready to send. If it didn’t, email me directly at{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </>
        )}
        {status === 'error' && (
          <>
            Something went wrong sending that. Please email <a href={`mailto:${site.email}`}>{site.email}</a> or call{' '}
            <a href={site.phoneHref}>{site.phone}</a>.
          </>
        )}
      </p>
    </form>
  );
};
