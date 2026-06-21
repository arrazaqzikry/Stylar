import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/privacy-policy")({
  head: () => ({ meta: [{ title: "Privacy Policy — STYLAR" }] }),
  component: PrivacyPolicyPage,
});

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly to us, including your name, email address, profile details, style preferences, and payment information when you make a purchase. We also automatically collect usage data such as pages viewed, features used, outfit interactions (likes, saves), and device information.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use your information to: (a) provide and personalise the STYLAR Service, including AI-powered outfit recommendations; (b) process transactions and send related information such as order confirmations; (c) send promotional communications where you have opted in; (d) improve our platform and develop new features; and (e) comply with legal obligations.`,
  },
  {
    title: "3. AI & Style Data",
    body: `STYLAR uses your style interactions (outfits you view, like, save, and purchase) to train and personalise our AI recommendation engine. This data is processed to understand your aesthetic preferences. You can reset your style data at any time from Profile → Settings → Identity. Deleting your account permanently removes all associated style data.`,
  },
  {
    title: "4. Sharing of Information",
    body: `We do not sell your personal information. We share data with: (a) service providers who assist in operating our platform (payment processors, shipping partners, cloud infrastructure); (b) analytics providers to understand usage patterns; and (c) law enforcement or regulatory bodies when required by law. All third parties are bound by confidentiality agreements.`,
  },
  {
    title: "5. Cookies & Tracking",
    body: `We use cookies and similar tracking technologies to maintain session state, remember your preferences, and analyse usage. Essential cookies are necessary for the Service to function. You may opt out of analytics cookies through your device settings. Disabling essential cookies may affect Service functionality.`,
  },
  {
    title: "6. Data Retention",
    body: `We retain your personal data for as long as your account is active or as needed to provide the Service. You may request deletion of your data at any time. We may retain certain information for legal compliance, dispute resolution, or fraud prevention purposes for up to 7 years after account deletion.`,
  },
  {
    title: "7. Your Rights",
    body: `Depending on your location, you may have rights including: access to your personal data, correction of inaccurate data, deletion of your data, restriction of processing, data portability, and objection to certain processing. EU/UK residents have rights under GDPR. California residents have rights under CCPA. To exercise your rights, contact privacy@stylar.ai.`,
  },
  {
    title: "8. Security",
    body: `We implement industry-standard security measures including encryption in transit (TLS 1.3), encryption at rest, access controls, and regular security audits. Payment data is handled by PCI-DSS-compliant payment processors. While we take reasonable precautions, no method of transmission over the internet is 100% secure.`,
  },
  {
    title: "9. Children's Privacy",
    body: `STYLAR is not directed to individuals under 16 years of age. We do not knowingly collect personal information from children under 16. If we become aware that a child under 16 has provided us with personal information, we will take steps to delete such information.`,
  },
  {
    title: "10. Changes to This Policy",
    body: `We may update this Privacy Policy periodically. We will notify you of material changes via email or in-app notification. The effective date at the top of this page will reflect when the latest update was made. Your continued use of the Service after notification constitutes acceptance of the updated policy.`,
  },
];

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pb-8">
      <div className="sticky top-0 z-40 flex items-center gap-4 px-5 py-4 bg-background/90 backdrop-blur-xl border-b border-border">
        <Link to="/profile" className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 eyebrow text-[10px] text-muted-foreground hover:border-gold hover:text-gold transition-colors">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </Link>
        <h1 className="font-display text-lg">Privacy Policy</h1>
      </div>

      <div className="px-5 pt-5">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[10px] text-muted-foreground">Effective: 1 January 2026</p>
          <p className="text-[10px] text-muted-foreground">v3.0</p>
        </div>

        <p className="text-xs text-muted-foreground mb-6 leading-relaxed border-l-2 border-gold/50 pl-4">
          Your privacy matters to us. This policy explains how STYLAR collects, uses, and protects your personal information.
        </p>

        <div className="space-y-6">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="eyebrow text-[9px] mb-2" style={{ color: "var(--gold)" }}>{section.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-5 space-y-2">
          <p className="text-[10px] text-muted-foreground">
            Data Controller: STYLAR Inc., 88 Fifth Avenue, New York, NY 10011
          </p>
          <p className="text-[10px] text-muted-foreground">
            Privacy questions: <span style={{ color: "var(--gold)" }}>privacy@stylar.ai</span>
          </p>
        </div>
      </div>
    </div>
  );
}
