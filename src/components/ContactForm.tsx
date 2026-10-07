import React, { useEffect, useRef, useState } from 'react';
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
 * Form backend: FormSubmit (https://formsubmit.co) emails each submission to
 * the site owner. JavaScript submissions must use the /ajax/ endpoint, which
 * returns JSON. VITE_FORM_ENDPOINT can override it; if no HTTPS endpoint is
 * set, the form falls back to composing an email in the visitor's mail app.
 *
 * Once the address is activated, FormSubmit's activation email gives a random
 * alias you can use here instead of the plain email address
 * (https://formsubmit.co/ajax/<alias>), which hides it from spam scrapers.
 */
const FORM_ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT || `https://formsubmit.co/ajax/${site.email}`;


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
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so screen readers announce it and it's in view.
  useEffect(() => {
    if (status === 'sent') successRef.current?.focus();
  }, [status]);

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
          body: JSON.stringify({
            name: `${payload.firstName} ${payload.lastName}`,
            email: payload.email, // FormSubmit sets Reply-To from this field
            phone: payload.phone || '—',
            message: payload.inquiry,
            _subject: `Drum lesson inquiry — ${payload.firstName} ${payload.lastName}`,
            _template: 'table',
          }),
        });
        const data = await res.json().catch(() => null);
        // FormSubmit returns { success: "true" | "false", message }.
        if (!res.ok || !data || String(data.success) !== 'true') throw new Error('Request failed');
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

  if (status === 'sent') {
    return (
      <div className="form-success" role="status" aria-live="polite" tabIndex={-1} ref={successRef}>
        <svg className="form-success__icon" viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="form-success__title">Thanks — your message was sent!</h3>
        <p className="form-success__text">
          I’ve received your inquiry and will get back to you soon, usually within a day or two. If it’s
          urgent, you can call or text me at <a href={site.phoneHref}>{site.phone}</a>.
        </p>
        <button type="button" className="btn" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    );
  }

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
