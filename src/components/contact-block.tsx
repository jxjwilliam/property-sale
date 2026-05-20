import { listing } from "@/config/listing";

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

export function ContactBlock() {
  const { primaryAgent, owner } = listing;

  return (
    <div className="mt-8 border-t border-line pt-6 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] font-bold text-primary">
          {primaryAgent.title}
        </p>
        <p className="text-sm text-foreground mt-1 font-medium">{primaryAgent.name}</p>
        <p className="text-sm text-muted-foreground">{primaryAgent.brokerage}</p>
        <ContactLine href={`tel:${primaryAgent.phoneTel}`}>{primaryAgent.phone}</ContactLine>
        <ContactLine href={`mailto:${primaryAgent.email}`}>{primaryAgent.email}</ContactLine>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.24em] font-bold text-accent">Owner</p>
        <p className="text-sm text-muted-foreground mt-1">{owner.label}</p>
        <ContactLine href={`tel:${owner.phoneTel}`}>{owner.phone}</ContactLine>
        <ContactLine href={`mailto:${owner.email}`}>{owner.email}</ContactLine>
      </div>

      {listing.agents.map((agent) => (
        <div key={agent.phoneTel}>
          <p className="text-xs uppercase tracking-[0.24em] font-bold text-muted-foreground">
            Team
          </p>
          <p className="text-sm text-foreground mt-1">{agent.name}</p>
          <p className="text-sm text-muted-foreground">{agent.brokerage}</p>
          <ContactLine href={`tel:${agent.phoneTel}`}>{agent.phone}</ContactLine>
          {agent.email ? (
            <ContactLine href={`mailto:${agent.email}`}>{agent.email}</ContactLine>
          ) : null}
        </div>
      ))}

      <div className="flex flex-col gap-2 text-sm pt-2">
        <a
          href={listing.realtorCaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          View on Realtor.ca
        </a>
        <a
          href={listing.sellVanHomesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          View on SellVanHomes
        </a>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.24em] font-bold text-primary">Location</p>
        <p className="text-sm text-muted-foreground mt-1">{listing.address}</p>
      </div>
    </div>
  );
}
