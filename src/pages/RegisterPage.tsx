import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, FileText, Cpu, Building2, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";

const personas = [
  { key: "investor", icon: TrendingUp, label: "Investor", color: "border-saffron bg-saffron/5" },
  { key: "seeker", icon: FileText, label: "Fund Seeker", color: "border-jade bg-jade/5" },
  { key: "tech", icon: Cpu, label: "Tech Collaborator", color: "border-primary bg-primary/5" },
  { key: "ma", icon: Building2, label: "M&A Lead", color: "border-crimson bg-crimson/5" },
];

const RegisterPage = () => {
  const [step, setStep] = useState(0);
  const [selectedPersona, setSelectedPersona] = useState("");
  const [country, setCountry] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 max-w-xl">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[0, 1, 2, 3].map((s) => (
              <div key={s} className={`h-1.5 rounded-full transition-all ${s <= step ? "bg-accent w-10" : "bg-border w-6"}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2 text-center">Choose Your Role</h2>
                <p className="text-muted-foreground text-center mb-8">Select the persona that best describes your business objective.</p>
                <div className="grid grid-cols-2 gap-4">
                  {personas.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setSelectedPersona(p.key)}
                      className={`border-2 rounded-xl p-5 text-center transition-all hover:shadow-card ${
                        selectedPersona === p.key ? p.color : "border-border bg-card"
                      }`}
                    >
                      <p.icon className={`h-8 w-8 mx-auto mb-3 ${selectedPersona === p.key ? "text-foreground" : "text-muted-foreground"}`} />
                      <span className="font-medium text-sm text-card-foreground">{p.label}</span>
                    </button>
                  ))}
                </div>
                <Button
                  className="w-full mt-8 bg-accent text-accent-foreground hover:bg-saffron-light gap-2"
                  disabled={!selectedPersona}
                  onClick={() => setStep(1)}
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2 text-center">Basic Information</h2>
                <p className="text-muted-foreground text-center mb-8">Tell us about yourself and your organization.</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>First Name</Label><Input placeholder="Rajesh" /></div>
                    <div><Label>Last Name</Label><Input placeholder="Tanaka" /></div>
                  </div>
                  <div><Label>Email</Label><Input type="email" placeholder="you@company.com" /></div>
                  <div><Label>Organization</Label><Input placeholder="Company name" /></div>
                  <div>
                    <Label>Country</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="india">🇮🇳 India</SelectItem>
                        <SelectItem value="japan">🇯🇵 Japan</SelectItem>
                        <SelectItem value="other">🌐 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <Button variant="outline" onClick={() => setStep(0)} className="gap-2"><ArrowLeft className="h-4 w-4" /> Back</Button>
                  <Button className="flex-1 bg-accent text-accent-foreground hover:bg-saffron-light gap-2" onClick={() => setStep(2)}>
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2 text-center">Compliance Details</h2>
                <p className="text-muted-foreground text-center mb-8">
                  {country === "india" ? "Indian regulatory identifiers" : country === "japan" ? "Japanese corporate identifiers" : "Business identifiers"}
                </p>
                <div className="space-y-4">
                  {country === "india" ? (
                    <>
                      <div><Label>GST Number</Label><Input placeholder="22AAAAA0000A1Z5" /></div>
                      <div><Label>PAN Number</Label><Input placeholder="AAAAA0000A" /></div>
                      <div><Label>CIN (if applicable)</Label><Input placeholder="U74999DL2020PTC123456" /></div>
                    </>
                  ) : country === "japan" ? (
                    <>
                      <div><Label>法人番号 (Corporate Number)</Label><Input placeholder="1234567890123" /></div>
                      <div><Label>Company Registry</Label><Input placeholder="Registry reference" /></div>
                    </>
                  ) : (
                    <>
                      <div><Label>Business Registration Number</Label><Input placeholder="Enter registration number" /></div>
                      <div><Label>Tax ID</Label><Input placeholder="Enter tax identifier" /></div>
                    </>
                  )}
                  <div>
                    <Label>Industry</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                      <SelectContent>
                        {["Technology", "Manufacturing", "Fintech", "Clean Energy", "Pharmaceuticals", "Automotive", "Other"].map((ind) => (
                          <SelectItem key={ind} value={ind.toLowerCase()}>{ind}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <Button variant="outline" onClick={() => setStep(1)} className="gap-2"><ArrowLeft className="h-4 w-4" /> Back</Button>
                  <Button className="flex-1 bg-accent text-accent-foreground hover:bg-saffron-light gap-2" onClick={() => setStep(3)}>
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="w-16 h-16 rounded-full bg-jade/10 flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-jade" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Registration Complete</h2>
                <p className="text-muted-foreground mb-8">
                  Your profile is under review. You'll receive verification within 24-48 hours.
                </p>
                <Button className="bg-accent text-accent-foreground hover:bg-saffron-light" onClick={() => window.location.href = "/deals"}>
                  Explore Deals
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
