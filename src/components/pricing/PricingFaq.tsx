import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function PricingFaq() {
  const faqs = [
    {
      q: "What is the difference between Student Free and Pro plans?",
      a: "Both Student Free and Pro plans have NO application limits—students can apply to as many tuition batches as they need. The Pro Student Plan ($10 one-time upgrade) unlocks Priority Booking (your applications are pinned to the top so mentors review and accept you first), along with a Verified Pro Student badge and direct contact highlighting.",
    },
    {
      q: "Why should tutors upgrade to the Pro Tutor Plan?",
      a: "Tutors on the free plan can post up to 2 tuition batches. The Pro Tutor Plan ($15 one-time upgrade) removes this limit so you can post unlimited batches, awards a Pro Mentor Shield badge, and features your listings at the top of search results.",
    },
    {
      q: "Is this a recurring subscription or a one-time upgrade?",
      a: "Both the Pro Student Plan ($10) and Pro Tutor Plan ($15) are one-time upgrades powered by Stripe Checkout. There are no recurring charges or hidden fees.",
    },
    {
      q: "How fast is my Pro plan activated after payment?",
      a: "Activation is instantaneous! As soon as your Stripe payment completes, our secure webhook / verify endpoint automatically upgrades your account plan to 'Pro' in our database.",
    },
    {
      q: "Which payment methods are supported by Stripe?",
      a: "Stripe supports international and local Visa, MasterCard, American Express credit and debit cards with 256-bit bank-grade encryption.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto pt-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
          Got Questions? We&apos;ve Got Answers
        </h2>
      </div>

      <Accordion className="w-full space-y-3">
        {faqs.map((faq, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="rounded-2xl border border-border/70 bg-card/60 px-5 transition-colors"
          >
            <AccordionTrigger className="text-xs sm:text-sm font-bold text-foreground hover:no-underline py-4">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
