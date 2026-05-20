import { buyerFaq } from "@/config/faq";

export function FaqSection() {
  return (
    <section className="faq-section" aria-labelledby="buyer-faq-heading">
      <div className="faq-section-header">
        <p className="text-xs uppercase tracking-[0.24em] font-bold text-primary">
          Buyer questions
        </p>
        <h2 id="buyer-faq-heading" className="font-serif text-2xl sm:text-3xl tracking-tight text-foreground m-0">
          Frequently asked questions
        </h2>
        <p className="text-sm text-muted-foreground m-0 max-w-2xl">
          Common topics for this Surrey City Centre condo sale—pricing, strata, location, and BC
          purchase basics. Not legal or tax advice.
        </p>
      </div>

      <div className="faq-list">
        {buyerFaq.map((item) => (
          <details key={item.id} className="faq-item">
            <summary className="faq-question">{item.question}</summary>
            <div className="faq-answer">
              <p>{item.answer}</p>
              {item.sources && item.sources.length > 0 ? (
                <ul className="faq-sources">
                  {item.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} target="_blank" rel="noopener noreferrer">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
