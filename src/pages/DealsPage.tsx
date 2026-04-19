import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, DollarSign, Tag, Eye, EyeOff, Building2, TrendingUp, Cpu, Handshake } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mockListings = [
  {
    id: 1, type: "Investment", title: "Series B - AI-Powered Supply Chain SaaS",
    country: "India", industry: "Technology", size: "$5M - $15M", anonymous: false,
    company: "LogiTech Solutions", description: "Seeking Series B funding for AI-driven logistics optimization platform serving 200+ enterprise clients.",
  },
  {
    id: 2, type: "M&A", title: "Acquisition Target - Automotive Components Manufacturer",
    country: "Japan", industry: "Manufacturing", size: "¥2B - ¥5B", anonymous: true,
    company: "Anonymous", description: "Established Tier-2 automotive parts manufacturer with 35 years of operations, seeking strategic buyer.",
  },
  {
    id: 3, type: "Technology", title: "Joint R&D - Green Hydrogen Electrolysis",
    country: "India", industry: "Clean Energy", size: "Partnership", anonymous: false,
    company: "HydroGen India", description: "Seeking Japanese technology partner for PEM electrolyzer development and manufacturing.",
  },
  {
    id: 4, type: "Investment", title: "Pre-Series A - Fintech Remittance Platform",
    country: "India", industry: "Fintech", size: "$1M - $3M", anonymous: false,
    company: "RemitBridge", description: "India-Japan corridor digital remittance platform with RBI license, 50K+ monthly transactions.",
  },
  {
    id: 5, type: "Technology", title: "Robotics Licensing - Warehouse Automation",
    country: "Japan", industry: "Robotics", size: "License Fee", anonymous: false,
    company: "Kawasaki Robotics Lab", description: "Offering exclusive India licensing for warehouse automation robotics system with proven ROI.",
  },
  {
    id: 6, type: "M&A", title: "Strategic Exit - Pharma API Manufacturer",
    country: "India", industry: "Pharmaceuticals", size: "$20M - $50M", anonymous: true,
    company: "Anonymous", description: "WHO-GMP certified API manufacturer with Japan PMDA approvals, exploring strategic exit.",
  },
];

const typeIcons: Record<string, typeof TrendingUp> = {
  Investment: TrendingUp,
  "M&A": Building2,
  Technology: Cpu,
};

const typeColors: Record<string, string> = {
  Investment: "bg-saffron/10 text-saffron",
  "M&A": "bg-crimson/10 text-crimson",
  Technology: "bg-jade/10 text-jade",
};

const DealsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  const filtered = mockListings.filter((l) => {
    if (typeFilter !== "all" && l.type !== typeFilter) return false;
    if (countryFilter !== "all" && l.country !== countryFilter) return false;
    if (searchQuery && !l.title.toLowerCase().includes(searchQuery.toLowerCase()) && !l.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Deal Marketplace</h1>
            <p className="text-muted-foreground">Browse investment opportunities, technology partnerships, and M&A listings.</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 mb-8 flex flex-col sm:flex-row gap-3 shadow-card">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search deals, companies, industries..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Deal Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Investment">Investment</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="M&A">M&A</SelectItem>
              </SelectContent>
            </Select>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="India">🇮🇳 India</SelectItem>
                <SelectItem value="Japan">🇯🇵 Japan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filtered.map((listing, i) => {
              const Icon = typeIcons[listing.type] || Handshake;
              return (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-all group cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className={`w-12 h-12 rounded-lg ${typeColors[listing.type]} flex items-center justify-center shrink-0`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">{listing.type}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {listing.country === "India" ? "🇮🇳" : "🇯🇵"} {listing.country}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Tag className="h-3 w-3" /> {listing.industry}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <DollarSign className="h-3 w-3" /> {listing.size}
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold text-card-foreground group-hover:text-accent transition-colors mb-1">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{listing.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {listing.anonymous ? (
                          <span className="flex items-center gap-1"><EyeOff className="h-3 w-3" /> Anonymous Listing</span>
                        ) : (
                          <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {listing.company}</span>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0 self-center">
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Filter className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>No listings match your filters. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DealsPage;
