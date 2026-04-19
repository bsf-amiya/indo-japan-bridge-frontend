import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">IJ</span>
              </div>
              <span className="font-heading font-bold text-primary-foreground">Indo-Japan Bridge</span>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              The premier cross-border platform for India-Japan business matching,
              investment, and technology collaboration.
            </p>
          </div>
          {[
            {
              title: "Platform",
              links: ["Investment Deals", "Technology Board", "M&A Listings", "Fund Seekers"],
            },
            {
              title: "Resources",
              links: ["News & Insights", "Legal Frameworks", "Due Diligence", "API Docs"],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Contact", "Privacy Policy"],
            },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-heading font-semibold text-primary-foreground mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link to="#" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            © 2026 Indo-Japan Bridge. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-primary-foreground/40">🇮🇳 India</span>
            <span className="text-xs text-primary-foreground/40">🇯🇵 Japan</span>
            <span className="text-xs text-primary-foreground/40">🌐 Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
