import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

interface FaqSectionProps {
  limit?: number;
  showTitle?: boolean;
}

export function FaqSection({ limit, showTitle = true }: FaqSectionProps) {
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="py-12 sm:py-28">
      <Container className="max-w-3xl">
        {showTitle && (
          <SectionTitle
            eyebrow="FAQs"
            title="Questions we hear often"
            align="center"
            className="mx-auto"
          />
        )}
        <Accordion type="single" collapsible className="mt-12">
          {items.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
