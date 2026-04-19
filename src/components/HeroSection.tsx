import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Handshake, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bridge.jpg";

const stats = [
  { value: "$4.2B+", label: "Deal Volume" },
  { value: "1,200+", label: "Active Listings" },
  { value: "340+", label: "Successful Matches" },
  { value: "28", label: "Industries Covered" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-hero opacity-85" />

      {/* Geometric accents */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full border border-saffron/20 animate-float" />
      <div className="absolute bottom-32 left-16 w-40 h-40 rounded-full border border-crimson/15 animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 relative z-10 pt-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-saffron mb-6">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>India-Japan Business Corridor</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6" style={{ color: "hsl(0 0% 98%)" }}>
              Bridging{" "}
              <span className="text-gradient-accent">Investment</span>,{" "}
              <span className="text-gradient-accent">Technology</span> &{" "}
              <span className="text-gradient-accent">M&A</span>{" "}
              Across Borders
            </h1>

            <p className="text-lg sm:text-xl mb-8 max-w-2xl" style={{ color: "hsl(215 15% 75%)" }}>
              The premier platform connecting Indian and Japanese businesses
              for cross-border investments, technology collaboration, and
              strategic acquisitions.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link to="/register">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-saffron-light font-semibold gap-2">
                  Start Matching <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/deals">
                <Button size="lg" variant="outline" className="border-slate-light/30 font-semibold" style={{ color: "hsl(0 0% 90%)" }}>
                  Explore Deals
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <div key={i} className="glass rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-saffron">{stat.value}</div>
                <div className="text-xs mt-1" style={{ color: "hsl(215 15% 65%)" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden lg:flex flex-col gap-4 absolute right-8 top-1/2 -translate-y-1/2"
        >
          {[
            { icon: TrendingUp, label: "Investment", color: "text-saffron" },
            { icon: Handshake, label: "Technology", color: "text-jade" },
            { icon: Building2, label: "M&A", color: "text-crimson" },
          ].map((item, i) => (
            <div key={i} className="glass rounded-xl p-5 flex items-center gap-4 w-56 animate-float" style={{ animationDelay: `${i * 0.8}s` }}>
              <item.icon className={`h-6 w-6 ${item.color}`} />
              <span className="font-medium text-sm" style={{ color: "hsl(0 0% 92%)" }}>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
