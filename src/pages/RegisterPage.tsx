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
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    phone1: "",
    email: "",
    country: "",
    amount: "",
    gstNo: "",
    panNo: "",
    cinNo: "",
    corporateNo: "",
    companyRegistrationNo: "",
    taxId: "",
    industryType: "",
    website: ""
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        ...formData,
        amount: formData.amount ? parseInt(formData.amount) : null,
        country: country,
        userType: selectedPersona.toUpperCase()
      };
      console.log("Payload:", payload);//bsf: to be commented
      // const response = await fetch("http://localhost:1881/users/add", {
      const response = await fetch("http://187.127.135.180:1881/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error("Failed");

      setStep(3);

    } catch (error) {
      console.log("On Error Payload:", payload);//bsf: needs to commented
      console.error(error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 max-w-xl">

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[0, 1, 2, 3].map((s) => (
              <div key={s} className={`h-1.5 rounded-full ${s <= step ? "bg-accent w-10" : "bg-border w-6"}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* STEP 0 */}
            {step === 0 && (
              <motion.div key="step0">
                <h2 className="text-2xl text-center mb-6">Choose Your Role</h2>
                <div className="grid grid-cols-2 gap-4">
                  {personas.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setSelectedPersona(p.key)}
                      className={`border-2 rounded-xl p-5 ${
                        selectedPersona === p.key ? p.color : "border-border"
                      }`}
                    >
                      <p.icon className="h-6 w-6 mx-auto mb-2" />
                      {p.label}
                    </button>
                  ))}
                </div>

                <Button disabled={!selectedPersona} className="w-full mt-6" onClick={() => setStep(1)}>
                  Continue <ArrowRight />
                </Button>
              </motion.div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div key="step1">
                <h2 className="text-2xl text-center mb-6">Basic Information</h2>

                <div className="space-y-4">

                  <Input placeholder="First Name"
                    value={formData.firstname}
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} />

                  <Input placeholder="Last Name"
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} />

                  <Input placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })} />

                  <Input placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

                  <Input placeholder="Phone"
                    value={formData.phone1}
                    onChange={(e) => setFormData({ ...formData, phone1: e.target.value })} />

                  <Input placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="japan">Japan</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input placeholder="Amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />

                </div>

                <div className="flex gap-2 mt-6">
                  <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                  <Button onClick={() => setStep(2)}>Continue</Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div key="step2">
                <h2 className="text-2xl text-center mb-6">Compliance Details</h2>

                <div className="space-y-4">

                  {country === "india" && (
                    <>
                      <Input placeholder="GST No"
                        onChange={(e) => setFormData({ ...formData, gstNo: e.target.value })} />
                      <Input placeholder="PAN No"
                        onChange={(e) => setFormData({ ...formData, panNo: e.target.value })} />
                      <Input placeholder="CIN No"
                        onChange={(e) => setFormData({ ...formData, cinNo: e.target.value })} />
                    </>
                  )}

                  {country === "japan" && (
                    <>
                      <Input placeholder="Corporate No"
                        onChange={(e) => setFormData({ ...formData, corporateNo: e.target.value })} />
                      <Input placeholder="Company Registration"
                        onChange={(e) => setFormData({ ...formData, companyRegistrationNo: e.target.value })} />
                    </>
                  )}

                  {country === "other" && (
                    <>
                      <Input placeholder="Business Registration"
                        onChange={(e) => setFormData({ ...formData, companyRegistrationNo: e.target.value })} />
                      <Input placeholder="Tax ID"
                        onChange={(e) => setFormData({ ...formData, taxId: e.target.value })} />
                    </>
                  )}

                  {/* <Input placeholder="Industry"
                    onChange={(e) => setFormData({ ...formData, industryType: e.target.value })} /> */}
                  <div>
                    <Label>Industry</Label>
                    <Select
                      value={formData.industryType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, industryType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>

                      <SelectContent>
                        {[
                          "Technology",
                          "Manufacturing",
                          "Fintech",
                          "Clean Energy",
                          "Pharmaceuticals",
                          "Automotive",
                          "Other"
                        ].map((ind) => (
                          <SelectItem key={ind} value={ind}>
                            {ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input placeholder="Website"
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })} />

                </div>

                <div className="flex gap-2 mt-6">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Continue"}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div key="step3" className="text-center">
                <Check className="mx-auto mb-4" size={40} />
                <h2 className="text-2xl">Registration Complete</h2>
                <p>Your profile is under review.</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;