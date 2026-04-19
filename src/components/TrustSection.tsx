import { motion } from "framer-motion";
import { ShieldCheck, Scale, Lock, BadgeCheck } from "lucide-react";

const trustItems = [
  {
    icon: BadgeCheck,
    title: "Verified Profiles",
    description: "KYC/KYB verification with GST, PAN, and Japanese Corporate Number validation.",
  },
  {
    icon: Lock,
    title: "Escrow & Due Diligence",
    description: "Partnered with licensed escrow agents and due diligence firms in both jurisdictions.",
  },
  {
    icon: Scale,
    title: "Legal Frameworks",
    description: "Pre-built templates aligned with FEMA, JBIC guidelines, and bilateral investment treaties.",
  },
  {
    icon: ShieldCheck,
    title: "Data Privacy",
    description: "Compliant with DPDPA (India) and APPI (Japan) data protection regulations.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-crimson mb-3">
            Trust & Compliance
          </p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Built for Cross-Border Confidence
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enterprise-grade compliance and verification infrastructure for
            seamless India-Japan business transactions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-card shadow-card flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
