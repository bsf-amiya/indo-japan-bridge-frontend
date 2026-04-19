import { motion } from "framer-motion";
import { TrendingUp, FileText, Cpu, Building2 } from "lucide-react";

const personas = [
  {
    icon: TrendingUp,
    title: "Investor",
    description: "Post investment mandates, search startups, and filter by ticket size across USD, JPY, and INR.",
    color: "bg-saffron/10 text-saffron",
    features: ["Investment Mandates", "Deal Flow Pipeline", "Multi-currency Filters"],
  },
  {
    icon: FileText,
    title: "Fund Seeker",
    description: "Upload pitch decks, share financials, and connect with verified investors across India and Japan.",
    color: "bg-jade/10 text-jade",
    features: ["Pitch Deck Upload", "Financial Dashboard", "Investor Matching"],
  },
  {
    icon: Cpu,
    title: "Technology Collaborator",
    description: "Post technology needs or offers for R&D partnerships, licensing, and joint ventures.",
    color: "bg-primary/10 text-primary",
    features: ["Tech Needs Board", "R&D Partnerships", "IP Licensing"],
  },
  {
    icon: Building2,
    title: "M&A Lead",
    description: "List businesses for exit or post acquisition intents with detailed teasers and anonymity controls.",
    color: "bg-crimson/10 text-crimson",
    features: ["Business Listings", "Acquisition Intent", "Anonymous Mode"],
  },
];

const PersonasSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">
            Four Pathways
          </p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Choose Your Role
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Whether you're investing, seeking funds, collaborating on technology,
            or pursuing M&A — we have the right tools for you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 border border-border hover:border-accent/30 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-lg ${p.color} flex items-center justify-center mb-5`}>
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.description}</p>
              <ul className="space-y-1.5">
                {p.features.map((f, j) => (
                  <li key={j} className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonasSection;
