"use client";

import { listing } from "@/config/listing";
import { useLocale } from "@/i18n/provider";

function ContactLine({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="block mt-1 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
    >
      {children}
    </a>
  );
}

function ContactCell({
  label,
  labelClassName = "text-primary",
  children,
}: {
  label: string;
  labelClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="contact-cell">
      <p className={`contact-cell-label ${labelClassName}`}>{label}</p>
      {children}
    </div>
  );
}

export function ContactBlock() {
  const { messages } = useLocale();
  const { primaryAgent } = listing;
  const teamAgent = listing.agents[0];

  return (
    <div className="contact-grid" aria-label={messages.contact.ariaLabel}>
      <ContactCell label={messages.contact.listingAgent}>
        <p className="text-sm text-foreground mt-1 font-medium">{primaryAgent.name}</p>
        <p className="text-sm text-muted-foreground">{primaryAgent.brokerage}</p>
        <ContactLine href={`tel:${primaryAgent.phoneTel}`}>{primaryAgent.phone}</ContactLine>
        <ContactLine href={`mailto:${primaryAgent.email}`}>{primaryAgent.email}</ContactLine>
      </ContactCell>

      {teamAgent ? (
        <ContactCell label={messages.contact.team} labelClassName="text-muted-foreground">
          <p className="text-sm text-foreground mt-1">{teamAgent.name}</p>
          <p className="text-sm text-muted-foreground">{teamAgent.brokerage}</p>
          <ContactLine href={`tel:${teamAgent.phoneTel}`}>{teamAgent.phone}</ContactLine>
          {teamAgent.email ? (
            <ContactLine href={`mailto:${teamAgent.email}`}>{teamAgent.email}</ContactLine>
          ) : null}
        </ContactCell>
      ) : null}
    </div>
  );
}
