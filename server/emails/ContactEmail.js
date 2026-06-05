import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Hr,
  Link,
  Preview,
  Font,
} from 'react-email';
import { createElement as h } from 'react';

// ─────────────────────────────────────────────
// Brand token constants
// ─────────────────────────────────────────────
const BRAND_TEAL   = '#14b8a6';
const DARK_BG      = '#12100e';
const CARD_BG      = '#1c1815';
const BORDER_COLOR = '#2a2420';
const TEXT_PRIMARY = '#e2ddd8';
const TEXT_MUTED   = '#7a6e66';
const TEXT_MONO    = '#5a9e94';

// ─────────────────────────────────────────────
// Inline styles — email-client-safe
// ─────────────────────────────────────────────
const styles = {
  body: {
    backgroundColor: DARK_BG,
    margin: '0',
    padding: '32px 0',
    fontFamily: 'Inter, Arial, sans-serif',
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 16px',
  },
  header: {
    backgroundColor: CARD_BG,
    border: `1px solid ${BORDER_COLOR}`,
    borderRadius: '12px 12px 0 0',
    padding: '18px 24px 14px',
    borderBottom: 'none',
  },
  headerLabel: {
    color: BRAND_TEAL,
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    margin: '0 0 2px 0',
  },
  headerSub: {
    color: TEXT_MUTED,
    fontSize: '11px',
    letterSpacing: '1px',
    margin: '0',
    fontFamily: 'monospace',
  },
  statusBadge: {
    color: '#4ade80',
    fontSize: '10px',
    fontWeight: '700',
    fontFamily: 'monospace',
    letterSpacing: '2px',
    margin: '0',
  },
  card: {
    backgroundColor: CARD_BG,
    border: `1px solid ${BORDER_COLOR}`,
    borderTop: `2px solid ${BRAND_TEAL}`,
    borderRadius: '0 0 12px 12px',
    padding: '28px 28px 32px',
  },
  terminalLine: {
    fontFamily: 'monospace',
    fontSize: '11px',
    color: TEXT_MUTED,
    backgroundColor: '#0e0c0a',
    padding: '8px 12px',
    borderRadius: '6px',
    margin: '0 0 20px 0',
  },
  heading: {
    color: TEXT_PRIMARY,
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '-0.3px',
    margin: '0 0 8px 0',
    lineHeight: '1.3',
  },
  subheading: {
    color: TEXT_MUTED,
    fontSize: '13px',
    lineHeight: '1.6',
    margin: '0 0 20px 0',
  },
  divider: {
    borderColor: BORDER_COLOR,
    margin: '20px 0',
  },
  metaBlock: {
    backgroundColor: '#161310',
    borderRadius: '8px',
    padding: '16px 18px',
    border: `1px solid ${BORDER_COLOR}`,
  },
  metaRow: {
    marginBottom: '10px',
  },
  metaKey: {
    width: '90px',
    verticalAlign: 'top',
    paddingRight: '12px',
  },
  metaKeyText: {
    color: TEXT_MUTED,
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '2px',
    fontFamily: 'monospace',
    margin: '0',
    paddingTop: '2px',
  },
  metaValueText: {
    color: TEXT_PRIMARY,
    fontSize: '13px',
    margin: '0',
    lineHeight: '1.4',
  },
  metaLink: {
    color: BRAND_TEAL,
    fontSize: '13px',
    textDecoration: 'none',
  },
  messageLabelText: {
    color: TEXT_MUTED,
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '2px',
    fontFamily: 'monospace',
    margin: '0 0 8px 0',
  },
  messageBlock: {
    backgroundColor: '#161310',
    borderRadius: '8px',
    padding: '16px 18px',
    border: `1px solid ${BORDER_COLOR}`,
    borderLeft: `3px solid ${BRAND_TEAL}`,
  },
  messageText: {
    color: TEXT_PRIMARY,
    fontSize: '13px',
    lineHeight: '1.7',
    margin: '0',
    whiteSpace: 'pre-wrap',
  },
  ctaButton: {
    display: 'inline-block',
    backgroundColor: BRAND_TEAL,
    color: '#0a1a18',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    textDecoration: 'none',
    padding: '12px 28px',
    borderRadius: '6px',
  },
  footer: {
    padding: '20px 8px 0',
    textAlign: 'center',
  },
  footerText: {
    color: TEXT_MUTED,
    fontSize: '11px',
    lineHeight: '1.6',
    margin: '0 0 8px 0',
  },
  footerLink: {
    color: BRAND_TEAL,
    textDecoration: 'none',
  },
  footerMono: {
    color: '#3a3330',
    fontSize: '9px',
    fontFamily: 'monospace',
    letterSpacing: '1.5px',
    margin: '0',
  },
};

/**
 * ContactEmail — React Email template for portfolio contact form notifications.
 * Written without JSX so it runs directly in Node.js ESM without a transpiler.
 *
 * @param {string} name    - Sender's full name
 * @param {string} email   - Sender's email address
 * @param {string} subject - Message subject
 * @param {string} message - Message body
 */
export function ContactEmail({ name, email, subject, message }) {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return h(Html, { lang: 'en' },
    h(Head, null,
      h(Font, {
        fontFamily: 'Inter',
        fallbackFontFamily: 'Arial',
        webFont: {
          url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
          format: 'woff2',
        },
        fontWeight: 400,
        fontStyle: 'normal',
      })
    ),
    h(Preview, null, `New portfolio message from ${name}: ${subject}`),

    h(Body, { style: styles.body },
      h(Container, { style: styles.container },

        // ── Header Bar ──
        h(Section, { style: styles.header },
          h(Row, null,
            h(Column, null,
              h(Text, { style: styles.headerLabel }, 'AMIT BORA · PORTFOLIO'),
              h(Text, { style: styles.headerSub }, 'Contact Form Notification System')
            ),
            h(Column, { align: 'right' },
              h(Text, { style: styles.statusBadge }, '● INCOMING')
            )
          )
        ),

        // ── Main Card ──
        h(Section, { style: styles.card },

          // Terminal prompt line
          h(Text, { style: styles.terminalLine },
            h('span', { style: { color: TEXT_MONO, fontWeight: '600' } }, 'amit-bora@portfolio:~$'),
            ' ',
            h('span', { style: { color: '#c4b89e' } }, 'receive --channel=contact_form')
          ),

          h(Heading, { style: styles.heading }, 'New Message Received'),

          h(Text, { style: styles.subheading },
            'Someone reached out via your portfolio contact form. Details below.'
          ),

          h(Hr, { style: styles.divider }),

          // ── Sender Details ──
          h(Section, { style: styles.metaBlock },
            h(Row, { style: styles.metaRow },
              h(Column, { style: styles.metaKey }, h(Text, { style: styles.metaKeyText }, 'FROM')),
              h(Column, null, h(Text, { style: styles.metaValueText }, name))
            ),
            h(Row, { style: styles.metaRow },
              h(Column, { style: styles.metaKey }, h(Text, { style: styles.metaKeyText }, 'REPLY-TO')),
              h(Column, null, h(Link, { href: `mailto:${email}`, style: styles.metaLink }, email))
            ),
            h(Row, { style: styles.metaRow },
              h(Column, { style: styles.metaKey }, h(Text, { style: styles.metaKeyText }, 'SUBJECT')),
              h(Column, null, h(Text, { style: styles.metaValueText }, subject))
            ),
            h(Row, { style: styles.metaRow },
              h(Column, { style: styles.metaKey }, h(Text, { style: styles.metaKeyText }, 'RECEIVED')),
              h(Column, null, h(Text, { style: styles.metaValueText }, timestamp))
            )
          ),

          h(Hr, { style: styles.divider }),

          // ── Message Body ──
          h(Text, { style: styles.messageLabelText }, 'MESSAGE PAYLOAD'),
          h(Section, { style: styles.messageBlock },
            h(Text, { style: styles.messageText }, message)
          ),

          // ── Reply CTA ──
          h(Section, { style: { textAlign: 'center', marginTop: '28px' } },
            h(Link, {
              href: `mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`,
              style: styles.ctaButton,
            }, `Reply to ${name} →`)
          )
        ),

        // ── Footer ──
        h(Section, { style: styles.footer },
          h(Text, { style: styles.footerText },
            'This notification was triggered by your portfolio contact form at ',
            h(Link, { href: 'https://amitbora.dev', style: styles.footerLink }, 'amitbora.dev'),
            '. Do not reply to this email — use the button above to reach the sender.'
          ),
          h(Text, { style: styles.footerMono },
            '[SYSTEM] · amitbora-portfolio-v2 · contact-api/v1 · IST'
          )
        )
      )
    )
  );
}
