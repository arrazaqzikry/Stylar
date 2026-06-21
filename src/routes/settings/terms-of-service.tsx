import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/terms-of-service")({
  head: () => ({ meta: [{ title: "Terms of Service — STYLAR" }] }),
  component: TermsOfServicePage,
});

const SECTIONS = [
  {
    title: "1. Overview",
    body: `These Terms of Service ("Terms") govern your use of the STYLAR platform, including our mobile application and website (collectively, the "Service"), operated by STYLAR Inc. ("we", "us", or "our"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, please do not use the Service.`,
  },
  {
    title: "2. Account Terms",
    body: `You must be at least 16 years of age to use STYLAR. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately at support@stylar.ai of any unauthorised use of your account. We reserve the right to terminate accounts that violate our policies.`,
  },
  {
    title: "3. Acceptable Use",
    body: `You agree not to use the Service to: (a) violate any applicable laws or regulations; (b) infringe the intellectual property rights of others; (c) transmit unsolicited commercial messages; (d) attempt to gain unauthorised access to our systems; or (e) engage in any activity that disrupts or interferes with the Service.`,
  },
  {
    title: "4. Purchases & Payments",
    body: `All prices are displayed in USD and are subject to change. We reserve the right to refuse or cancel orders at our discretion. Payment is processed at the time of order placement. Promotional codes are subject to individual terms and cannot be combined unless stated otherwise.`,
  },
  {
    title: "5. Returns & Refunds",
    body: `Items may be returned within 30 days of delivery provided they are unworn, unwashed, and in their original condition with all tags attached. Sale items are final sale unless otherwise stated. Refunds are issued to the original payment method within 5–10 business days of receiving the returned item.`,
  },
  {
    title: "6. Intellectual Property",
    body: `All content on the STYLAR platform, including AI-generated outfit recommendations, photography, text, logos, and user interface elements, is the exclusive property of STYLAR Inc. or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce or distribute any content without our prior written consent.`,
  },
  {
    title: "7. Disclaimer of Warranties",
    body: `The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. AI-generated recommendations are for informational purposes only.`,
  },
  {
    title: "8. Limitation of Liability",
    body: `To the fullest extent permitted by law, STYLAR Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Service, even if we have been advised of the possibility of such damages.`,
  },
  {
    title: "9. Governing Law",
    body: `These Terms shall be governed by the laws of the State of New York, United States, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the courts located in New York County, New York.`,
  },
  {
    title: "10. Changes to Terms",
    body: `We may update these Terms at any time. We will notify you of significant changes via email or an in-app notification. Your continued use of the Service after such notification constitutes your acceptance of the updated Terms.`,
  },
];

function TermsOfServicePage() {
  return (
    <div className="min-h-screen pb-8">
      <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border">
        <Link to="/profile" className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </Link>
        <h1 className="font-display text-lg">Terms of Service</h1>
      </div>

      <div className="px-5 pt-5">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[10px] text-muted-foreground">Effective: 1 January 2026</p>
          <p className="text-[10px] text-muted-foreground">v2.1</p>
        </div>

        <p className="text-xs text-muted-foreground mb-6 leading-relaxed border-l-2 border-gold/50 pl-4">
          Please read these Terms carefully before using STYLAR. They contain important information about your rights and obligations.
        </p>

        <div className="space-y-6">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="eyebrow text-[9px] mb-2" style={{ color: "var(--gold)" }}>{section.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-5">
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Questions about our Terms? Contact us at{" "}
            <span style={{ color: "var(--gold)" }}>legal@stylar.ai</span>
          </p>
        </div>
      </div>
    </div>
  );
}
