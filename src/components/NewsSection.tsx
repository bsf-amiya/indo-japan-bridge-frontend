import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockNews = [
  {
    category: "Investment",
    title: "Japanese VCs Increase India Allocation by 40% in FY2025",
    source: "Nikkei Asia",
    time: "2 hours ago",
    tag: "trending",
  },
  {
    category: "Regulatory",
    title: "SEBI Simplifies FPI Registration for Japanese Institutional Investors",
    source: "Economic Times",
    time: "5 hours ago",
    tag: "policy",
  },
  {
    category: "Technology",
    title: "Honda-Tata Partnership to Develop Next-Gen EV Battery Technology",
    source: "Bloomberg",
    time: "8 hours ago",
    tag: "tech",
  },
  {
    category: "M&A",
    title: "Hitachi Completes ¥120B Acquisition of Indian SaaS Company",
    source: "Reuters",
    time: "1 day ago",
    tag: "deal",
  },
];

const exchangeRates = [
  { pair: "INR/JPY", rate: "1.78", change: "+0.3%" },
  { pair: "USD/INR", rate: "83.42", change: "-0.1%" },
  { pair: "USD/JPY", rate: "148.65", change: "+0.5%" },
];

const NewsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12"
        >
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-2">
              Market Intelligence
            </p>
            <h2 className="text-3xl font-heading font-bold text-foreground">
              Cross-Border News & Rates
            </h2>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            {exchangeRates.map((r, i) => (
              <div key={i} className="bg-card border border-border rounded-lg px-4 py-2 text-center shadow-card">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowUpDown className="h-3 w-3" /> {r.pair}
                </div>
                <div className="font-semibold text-sm text-foreground">{r.rate}</div>
                <div className={`text-xs font-medium ${r.change.startsWith("+") ? "text-jade" : "text-crimson"}`}>
                  {r.change}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {mockNews.map((news, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">{news.category}</Badge>
                {news.tag === "trending" && (
                  <Badge className="bg-accent/10 text-accent text-xs border-0">
                    <TrendingUp className="h-3 w-3 mr-1" /> Trending
                  </Badge>
                )}
              </div>
              <h3 className="font-heading font-semibold text-card-foreground group-hover:text-accent transition-colors mb-2">
                {news.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {news.source} · {news.time}
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
