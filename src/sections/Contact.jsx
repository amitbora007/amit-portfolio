import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Linkedin, Github, Copy, Check, Send, AlertTriangle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Zod Schema for validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default function Contact() {
  const { personalInfo } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

  const nameVal = useWatch({ control, name: 'name' }) || '';
  const emailVal = useWatch({ control, name: 'email' }) || '';
  const subjectVal = useWatch({ control, name: 'subject' }) || '';
  const messageVal = useWatch({ control, name: 'message' }) || '';

  const getNameStatus = () => {
    if (!nameVal) {
      return (
        <>
          <span className="text-slate-500 font-bold shrink-0">[WAIT]</span>
          <span className="text-slate-500">name: awaiting user input...</span>
        </>
      );
    }
    if (errors.name) {
      return (
        <>
          <span className="text-amber-500 font-bold shrink-0">[WARN]</span>
          <span className="text-amber-500/90">name: length must be &gt;= 2 chars (current: {nameVal.length})</span>
        </>
      );
    }
    return (
      <>
        <span className="text-emerald-500 font-bold shrink-0">[OK]</span>
        <span className="text-emerald-500/90">name: parsed schema check (length: {nameVal.length})</span>
      </>
    );
  };

  const getEmailStatus = () => {
    if (!emailVal) {
      return (
        <>
          <span className="text-slate-500 font-bold shrink-0">[WAIT]</span>
          <span className="text-slate-500">email: awaiting user input...</span>
        </>
      );
    }
    if (errors.email) {
      return (
        <>
          <span className="text-amber-500 font-bold shrink-0">[WARN]</span>
          <span className="text-amber-500/90">email: malformed address syntax</span>
        </>
      );
    }
    return (
      <>
        <span className="text-emerald-500 font-bold shrink-0">[OK]</span>
        <span className="text-emerald-500/90">email: regex matches syntax validation</span>
      </>
    );
  };

  const getSubjectStatus = () => {
    if (!subjectVal) {
      return (
        <>
          <span className="text-slate-500 font-bold shrink-0">[WAIT]</span>
          <span className="text-slate-500">subject: awaiting user input...</span>
        </>
      );
    }
    if (errors.subject) {
      return (
        <>
          <span className="text-amber-500 font-bold shrink-0">[WARN]</span>
          <span className="text-amber-500/90">subject: length must be &gt;= 3 chars (current: {subjectVal.length})</span>
        </>
      );
    }
    return (
      <>
        <span className="text-emerald-500 font-bold shrink-0">[OK]</span>
        <span className="text-emerald-500/90">subject: verified string contract (length: {subjectVal.length})</span>
      </>
    );
  };

  const getMessageStatus = () => {
    if (!messageVal) {
      return (
        <>
          <span className="text-slate-500 font-bold shrink-0">[WAIT]</span>
          <span className="text-slate-500 font-medium">message: awaiting buffer payload (10 chars min)</span>
        </>
      );
    }
    if (errors.message) {
      return (
        <>
          <span className="text-amber-500 font-bold shrink-0">[WARN]</span>
          <span className="text-amber-500">message: payload buffer underflow (current: {messageVal.length}/10 chars)</span>
        </>
      );
    }
    return (
      <>
        <span className="text-emerald-500 font-bold shrink-0">[OK]</span>
        <span className="text-emerald-500/90">message: payload buffer configured (length: {messageVal.length} chars)</span>
      </>
    );
  };

  const getSystemStatus = () => {
    if (!nameVal || !emailVal || !subjectVal || !messageVal) {
      return <span className="text-slate-500 animate-pulse">PENDING_USER_INPUT</span>;
    }
    if (isValid) {
      return <span className="text-emerald-500 font-black animate-pulse">READY_FOR_TRANSMISSION</span>;
    }
    return <span className="text-amber-500 font-bold">INVALID_SCHEMA_BINDINGS</span>;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (data) => {
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check if the server is running.');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-slate-100 dark:border-slate-900 bg-transparent">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <div className="text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold">
            GET IN TOUCH
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
            Connect & Collaborate
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
            Interested in scaling your backend infrastructure, implementing payment systems, or integrating practical AI pipelines? Let's discuss.
          </p>
        </div>

        {/* Contact Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Info Card Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 p-8 rounded-xl shadow-sm">
              <h3 className="font-display font-extrabold text-xl text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
                Outreach & Inquiries
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Recruiters, engineering leaders, and founders: feel free to send a message directly using the secure contact portal, or reach out via email. I respond to serious technical challenges and collaboration proposals.
              </p>

              {/* Direct Mail Details */}
              <div className="flex flex-col gap-4 border-t border-slate-100 dark:border-slate-950 pt-6">

                {/* Email Display & Copy */}
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200/50 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/30 dark:hover:bg-slate-800/30 transition-all duration-300">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0" />
                    <span className="text-xs font-mono text-slate-700 dark:text-slate-300 truncate">
                      {personalInfo.email}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-900 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors shrink-0"
                    title="Copy Email"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                {/* Live Availability Status Card */}
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded border border-slate-200/50 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/30 dark:hover:bg-slate-800/30 transition-all duration-300 text-xs space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-1 shrink-0" />
                    <div>
                      <span className="font-sans font-bold text-slate-700 dark:text-slate-300">Live Availability Status</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                        Open to select senior backend engineer roles, payment migrations, and system scaling contracts.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono border-t border-slate-100 dark:border-slate-900 pt-2">
                    <span className="flex items-center gap-1">⚡ Response: &lt; 24 Hours</span>
                    <span>📍New Delhi</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-950">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-650 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors focus:outline-none"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <div className="w-px h-4 bg-slate-200 dark:bg-slate-800" />
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-650 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors focus:outline-none"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>

            </div>
          </div>

          {/* Form Entry Column */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 p-8 rounded-xl shadow-sm">

            {submitStatus === 'success' ? (
              <div className="text-center py-10 flex flex-col items-center gap-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-slate-800 dark:text-slate-100">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                  Thank you for reaching out. I have received your message and will review it shortly.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-6 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-900 px-5 py-2.5 rounded hover:bg-brand-500/5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-lg text-rose-700 dark:text-rose-400 text-xs sm:text-sm flex gap-3 items-start">
                    <AlertTriangle className="h-5 w-5 shrink-0" />
                    <div>
                      <span className="font-bold">Error Sending Message</span>
                      <p className="mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    placeholder="Jane Doe"
                    disabled={submitStatus === 'loading'}
                    className={`w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 border rounded-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:shadow-[0_0_12px_rgba(20,184,166,0.15)] transition-all dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-700 ${
                      errors.name ? 'border-rose-450 dark:border-rose-900' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-rose-500 font-medium">{errors.name.message}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    placeholder="jane@company.com"
                    disabled={submitStatus === 'loading'}
                    className={`w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 border rounded-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:shadow-[0_0_12px_rgba(20,184,166,0.15)] transition-all dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-700 ${
                      errors.email ? 'border-rose-450 dark:border-rose-900' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-rose-500 font-medium">{errors.email.message}</span>
                  )}
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject')}
                    placeholder="Project architecture / Recruitment inquiry"
                    disabled={submitStatus === 'loading'}
                    className={`w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 border rounded-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:shadow-[0_0_12px_rgba(20,184,166,0.15)] transition-all dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-700 ${
                      errors.subject ? 'border-rose-450 dark:border-rose-900' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.subject && (
                    <span className="text-[11px] text-rose-500 font-medium">{errors.subject.message}</span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
                    Message Body
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    placeholder="Briefly describe your proposal or technical requirement..."
                    disabled={submitStatus === 'loading'}
                    className={`w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950 border rounded-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:shadow-[0_0_12px_rgba(20,184,166,0.15)] transition-all dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-700 resize-none ${
                      errors.message ? 'border-rose-450 dark:border-rose-900' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] text-rose-500 font-medium">{errors.message.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-brand-700 dark:bg-brand-600 border border-brand-700 dark:border-brand-600 rounded-lg py-3.5 hover:bg-brand-800 dark:hover:bg-brand-500 active:scale-[0.98] transition-all duration-300 focus:ring-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Terminal Validation Stream */}
                <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-4 font-mono text-[10px] space-y-1.5 text-slate-400 mt-5 relative select-none">
                  <div className="absolute top-2.5 right-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                    <span className="text-[8px] text-slate-600 tracking-wider uppercase font-bold">LIVE_VAL</span>
                  </div>
                  
                  <div className="text-slate-500 font-bold border-b border-slate-900 pb-1.5 mb-2">
                    amit-bora@compiler:~$ validate --schema=contact
                  </div>
                  
                  <div className="flex items-start gap-1">
                    <span className="text-brand-500 font-bold shrink-0">[INIT]</span>
                    <span className="text-slate-500">loaded zod schema contract bindings</span>
                  </div>

                  <div className="flex items-start gap-1">
                    {getNameStatus()}
                  </div>

                  <div className="flex items-start gap-1">
                    {getEmailStatus()}
                  </div>

                  <div className="flex items-start gap-1">
                    {getSubjectStatus()}
                  </div>

                  <div className="flex items-start gap-1">
                    {getMessageStatus()}
                  </div>
                  
                  <div className="border-t border-slate-900 pt-1.5 mt-2 flex justify-between font-bold text-slate-500">
                    <span>[SYSTEM] Status:</span>
                    {getSystemStatus()}
                  </div>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
