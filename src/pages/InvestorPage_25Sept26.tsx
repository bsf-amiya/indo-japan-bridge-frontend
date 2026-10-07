import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiFetch } from "../services/ApiClient";
import Footer from "@/components/Footer";
import { number } from "framer-motion";

type User = {
  id: number;
  firstname?: string;
  lastname?: string;
  username?: string;
  companyName?: string;
  website?: string;
  country?: string;
  amount?: number;
  userType?: string;
  status?: string;
  email?: string;
  phone1?: string;
  industryType?: string;
  gstNo?: string;
  panNo?: string;
  cinNo?: string;
  corporateNo?: string;
  taxId?: string;
  companyRegistrationNo?: string;
};

type InvestorProfile = {
  id?: number;
  investorName: string;
  investorType: string;
  country: string;
  yearEstablished: number | "";
  website: string;
  corporateProfile: string;
  keyContactPerson: string;
  linkedinUrl: string;
  industryFocus: string;
  preferredInvestmentStage: string;
  investmentTicketMin: number | "";
  investmentTicketMax: number | "";
  geographicPreference: string;
};

type InvestmentCredentials = {
    id?:number;
    previousInvestments:string;
    successfulExits:string;
    currentPortfolio:string;
    portfolioReferences:string;
    investmentTicketSize:string;
    geographicPreferences:string;
};

type InvestmentProposal = {
    id?: number;
    proposedInvestmentAmount: number | "";
    investmentType: string;
    expectedShareholding: number | "";
    expectedRoi: string;
    exitTimeline: string;
    boardSeatRequired: string;
    strategicSupport: string;
    investmentConditions: string;
};

const InvestorPage = () => {
  const [companyName, setCompanyName] = useState("");
  const [investors, setInvestors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInvestors: 0,
    totalFundSeekers: 0,
    totalTechnology: 0,
    totalMA: 0,

    totalInvestmentOffered: 0,
    totalInvestmentOfferedYen: 0,
    totalIndianInvestors: 0,
    totalJapaneseInvestors: 0
  });

  // 🔥 MODAL STATE
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [country, setCountry] = useState("");
  // const [industry, setIndustry] = useState("");
  // const [dealType, setDealType] = useState("");

  const [isProfileOpen, setProfileOpen] = useState(false);

const [editMode, setEditMode] = useState(false);

const [investorProfile, setInvestorProfile] = useState<InvestorProfile>({
    investorName: "",
    investorType: "",
    country: "",
    yearEstablished: "",
    website: "",
    corporateProfile: "",
    keyContactPerson: "",
    linkedinUrl: "",
    industryFocus: "",
    preferredInvestmentStage: "",
    investmentTicketMin: "",
    investmentTicketMax: "",
    geographicPreference: ""
});
const [investmentCredentials, setInvestmentCredentials] = useState<InvestmentCredentials>({
    previousInvestments:"",
    successfulExits:"",
    currentPortfolio:"",
    portfolioReferences:"",
    investmentTicketSize:"",
    geographicPreferences:""
});

const [investmentProposal, setInvestmentProposal] =
useState<InvestmentProposal>({
    proposedInvestmentAmount: "",
    investmentType: "",
    expectedShareholding: "",
    expectedRoi: "",
    exitTimeline: "",
    boardSeatRequired: "",
    strategicSupport: "",
    investmentConditions: ""
});

  const loadInvestorProfile = async () => {
    try {

        const res = await apiFetch(
            "/investorProfile/get",
            {
                method: "GET"
            },
            true
        );

        const result = await res.json();

        if(result.status===1){

            if(result.data.investorProfile){

                setInvestorProfile(result.data.investorProfile);

            }

        }

    } catch(err){

        console.error(err);

    }

  };
  const handleInvestorProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        const { name, value } = e.target;

        setInvestorProfile(prev => ({
            ...prev,
            [name]: value
        }));

  };
  const handleInvestmentCredentials = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setInvestmentCredentials(prev => ({
            ...prev,
            [name]: value
        }));
  };
  const handleInvestmentProposal = (
    e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
    ) => {
      const { name, value } = e.target;
      setInvestmentProposal(prev => ({
          ...prev,
          [name]: value
      }));
  };
  const saveInvestorProfile = async () => {
      try{
          const res = await apiFetch(
              "/investorProfile/save",
              {
                  method:"POST",
                  body:JSON.stringify(investorProfile)
              },
              true
          );
          const result = await res.json();
          if (result.status === 1) {
            alert(result.message);
            setEditMode(false);

            await loadInvestorProfile();
        } else {
            alert(result.message);
        }
      }
      catch(err){
          console.error(err);
      }
  };
  const loadInvestmentCredentials = async () => {
    try {
        const res = await apiFetch(
            "/investmentCredentials/get",
            {
                method: "GET"
            },
            true
        );
        const result = await res.json();
        if (result.status === 1) {
            if (result.data.investmentCredentials) {
                setInvestmentCredentials(result.data.investmentCredentials);
            }
        }
    } catch (err) {
        console.error("Error loading Investment Credentials:", err);
    }
  };
  const saveInvestmentCredentials = async () => {
    try {
        const res = await apiFetch(
            "/investmentCredentials/save",
            {
                method: "POST",
                body: JSON.stringify(investmentCredentials)
            },
            true
        );
        const result = await res.json();
        if (result.status === 1) {
            alert(result.message);
            setEditMode(false);

            await loadInvestmentCredentials();
        } else {
            alert(result.message);
        }

    } catch (err) {
        console.error("Error saving Investment Credentials:", err);
    }
  };
  const loadInvestmentProposal = async () => {
    try {
        const res = await apiFetch(
            "/investmentProposal/get",
            {
                method: "GET"
            },
            true
        );
        const result = await res.json();
        if (result.status === 1) {
            if (result.data.investmentProposal) {
                setInvestmentProposal(result.data.investmentProposal);
            }
        }
    }
    catch (err) {
        console.error("Error saving Investment Proposal:", err);
    }
  };
  const saveInvestmentProposal = async () => {
    try {
        const res = await apiFetch(
            "/investmentProposal/save",
            {
                method: "POST",
                body: JSON.stringify(investmentProposal)
            },
            true
        );
        const result = await res.json();
        if (result.status === 1) {
            alert(result.message);
            setEditMode(false);
            await loadInvestmentProposal();
        } else {
            alert(result.message);
        }
    }
    catch (err) {
        console.error(err);
    }
  };
  const [isCreateDealOpen, setCreateDealOpen] = useState(false);
  const [deal, setDeal] = useState({
    title: "",
    description: "",
    dealType: "",
    industry: "",
    country: "",
    minAmount: 0,
    maxAmount: 0,
    active: 1
  });
  const handleCreateDeal = async () => {
    try {
      // const response = await fetch("http://localhost:1881/users/createDeal", {
      // const response = await fetch("/api/users/createDeal", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`
      //   },
      //   body: JSON.stringify(deal)
      // });
      const res = await apiFetch("/users/createDeal", {
          method: "POST",body: JSON.stringify(deal)},true);
      const data = await res.json();

      if (data.status === 1) {
        alert("Deal Created Successfully");
        setCreateDealOpen(false);
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const name = localStorage.getItem("companyName");
    setCompanyName(name || "User");

    fetchUsers();
    fetchDashboardStats();
  }, []);

  const fetchUsers = async () => {
    try {
      // const response = await fetch("http://localhost:1881/users/getUsersList", {
      // const response = await fetch("http://187.127.135.180:1881/users/getUsersList", {
      //   const response = await fetch("/api/users/getUsersList", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      //   body: JSON.stringify("dummy"),
      // });
      // const res = await apiFetch("/users/getUsersList", {
      //     method: "POST",body: JSON.stringify("dummy"),}, true);
      const res = await apiFetch(
        "/users/getUsersListByPortal",
        {
          method: "POST",body: JSON.stringify({portalType: "INVESTOR"})
        },
        true
      );
      const result = await res.json();
      // alert("api result:"+ result);
      console.log("API RESULT i.e the FULL RESPONSE:", result);   // 🔥 ADD THIS
      if (result.status === 1) {
        const users: User[] = result.data["User Data List"] || [];
        console.log("Investor Portal - Approved Investors:", users);

        // const seekers = users.filter(
        //   (u) => (u.userType || "").toUpperCase() === "SEEKER"
        // );

        setInvestors(users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
  try {

    const res = await apiFetch(
      "/users/investorDashboardStats",
      {
        method: "POST",
        body: JSON.stringify("dummy")
      },
      true
    );

    const result = await res.json();

    console.log("Dashboard Stats:", result);

    if (result.status === 1) {

      setStats(result.data.stats);

    }

  } catch (error) {

    console.error("Stats Error:", error);

  }
};

  return (
    // <div className="min-h-screen bg-slate-100">
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 space-y-8">

        <section className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-primary" />

          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-yellow-500 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-red-500 blur-3xl" />
          </div>

          <div className="px-6 py-24 relative z-10">

            <p className="text-accent font-semibold tracking-widest uppercase mb-4">
              Investor Portal
            </p>

            <h1 className="text-5xl font-bold text-white mb-6">
              Discover Verified
              <span className="text-accent"> Investors </span>
              Across India & Japan
            </h1>

            <p className="text-slate-300 text-lg max-w-3xl mb-8">
              Explore verified investor profiles, understand investment interests
              and connect with strategic investment partners across India & Japan.
            </p>

            <div className="flex gap-3">

              <button
                onClick={async () => {
                  await loadInvestorProfile();
                  await loadInvestmentCredentials();
                  await loadInvestmentProposal();
                  setProfileOpen(true);
                }}
                className="bg-white text-primary px-4 py-2 rounded flex flex-col items-start leading-tight min-w-[150px]"
              >
                <span className="font-semibold">View My Profile</span>
                <span className="text-xs text-slate-500 mt-1 truncate max-w-[130px]">
                  {companyName}
                </span>
              </button>

              <button
                onClick={() => setCreateDealOpen(true)}
                className="bg-accent text-primary px-4 py-2 rounded font-medium hover:opacity-90"
              >
                Create Deal
              </button>

            </div>

          </div>
        </section>

      {/* All Companies Stats */}
        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">All Companies' Statistics</h3>

          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Investors</p>
              <p className="text-xl font-bold">
                {stats.totalInvestors}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Fund Seekers</p>
              <p className="text-xl font-bold">
                {stats.totalFundSeekers}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Tech Collaborators</p>
              <p className="text-xl font-bold">
                {stats.totalTechnology}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">M&A Leads</p>
              <p className="text-xl font-bold">
                {stats.totalMA}
              </p>
            </div>
          </div>
        </section>

        {/* Fund Seekers Stats */}
        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Investor Companies
          </h3>

          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">
                Total Investment Offered In Cr.
              </p>

              <p className="text-xl font-bold">
                ₹ {stats.totalInvestmentOffered.toLocaleString()} Cr
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">
                Total Investment Offered In Yen
              </p>

              <p className="text-xl font-bold">
                ¥ {stats.totalInvestmentOfferedYen.toLocaleString()}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Total Indian Investors</p>
              <p className="text-xl font-bold">{stats.totalIndianInvestors}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Total Japanese Investors</p>
              <p className="text-xl font-bold">{stats.totalJapaneseInvestors}</p>
            </div>
          </div>
        </section>


        {/* Table */}
        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Investor Companies
          </h3>

          <div className="overflow-x-auto max-h-80 overflow-y-auto">
            {loading ? (
              <p className="p-4 text-gray-500">Loading...</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-slate-100 sticky top-0">
                  <tr>
                    <th className="text-left p-3">Company Name</th>
                    <th className="text-left p-3">Industry</th>
                    <th className="text-left p-3">Country</th>
                    <th className="text-left p-3">Funds</th>
                    <th className="text-left p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {investors.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">
                        {item.companyName ||
                          // item.website ||
                          // item.firstname ||
                          "N/A"}
                      </td>

                      <td className="p-3">{item.industryType}</td>

                      <td className="p-3">{item.country || "N/A"}</td>

                      <td>
                        {(item.country || "").toLowerCase() === "japan"
                          ? `¥ ${item.amount ?? 0}`
                          : `₹ ${item.amount ?? 0} Cr`}
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => {
                            setSelectedUser(item);
                            setIsModalOpen(true);
                          }}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>

      {/* 🔥 MODAL */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">

            {/* Close */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Company Details: {selectedUser.companyName}
            </h2>

            <div>
              <p><strong>User Type:-</strong> {selectedUser.userType}</p>
              <h3 mb-2><strong>Basic Information:-</strong></h3>
              <p>Full Name: {selectedUser.firstname} {selectedUser.lastname}</p>
              <p>Username: {selectedUser.username}</p>
              <p>Email: {selectedUser.email || "N/A"}</p>
              <p>Phone: {selectedUser.phone1 || "N/A"}</p>
              <p>Country: {selectedUser.country || "N/A"}</p>
            </div>

            <div></div>
            {/* 🔹 COMPANY INFO */}
            <div>
              
              <h3 className="font-semibold text-gray-700 mb-2"></h3>
              <h3 mb-2><strong>Company Information:-</strong></h3>
              <p>Investment Amount: {selectedUser.amount || "N/A"}</p>
              <p>Industry: {selectedUser.industryType || "N/A"}</p>
              <p>Website: {selectedUser.website || "N/A"}</p>
              {/* <h3 className="font-semibold"> Company Name: {selectedUser.companyName || "N/A"}</h3> */}
              {/* <p><strong>Website:</strong> {selectedUser.website || "N/A"}</p>
              <p><strong>Industry:</strong> {selectedUser.industryType || "N/A"}</p> */}
            </div>

            {/* 🔹 REGISTRATION INFO */}
            {/* <div>
              <h3 mb-2><strong>Registration Info:-</strong></h3>
              <p>Company Reg No: {selectedUser.companyRegistrationNo || "N/A"}</p>
              <p>GST No: {selectedUser.gstNo || "N/A"}</p>
              <p>PAN No: {selectedUser.panNo || "N/A"}</p>
              <p>CIN No: {selectedUser.cinNo || "N/A"}</p>
              <p>Corporate No: {selectedUser.corporateNo || "N/A"}</p>
              <p>Tax ID: {selectedUser.taxId || "N/A"}</p>
            </div> */}

            {/* 🔹 FINANCIAL INFO */}
            <div>
              {/* <h3 className="font-semibold text-gray-700 mb-2">Financial Info:-</h3>
              <p><strong>Funds Required:</strong> {selectedUser.amount ? `${selectedUser.amount} Cr` : "N/A"}</p> */}
            </div>

            {/* 🔹 STATUS INFO */}
            <div>
              {/* <h3 className="font-semibold text-gray-700 mb-2">Status</h3> */}
              {/* <p><strong>User Type:-</strong> {selectedUser.userType}</p> */}
              {/* <p><strong>Status:</strong> {selectedUser.status}</p>
              <p><strong>Active:</strong> {selectedUser.active === 1 ? "Yes" : "No"}</p> */}
            </div>

          </div>
        </div>
      )}
      {/* Modal for View Profile of the company self */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">

            <button
              onClick={() => setProfileOpen(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>

            {/* <div className="space-y-2 text-sm">
              <p><strong>Company:</strong> {companyName}</p>
              <p><strong>Username:</strong> {localStorage.getItem("username")}</p>
              <p><strong>Email:</strong> {localStorage.getItem("email") || "N/A"}</p>
            </div> */}
            <div className="space-y-6 max-h-[70vh] overflow-y-auto">

                {/* Company Information */}

                <div className="border rounded-lg p-4">

                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                        Company Information
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4">

                        <div>
                            <label className="text-sm font-semibold">
                                Company Name
                            </label>

                            <input
                                className="w-full border rounded p-2 bg-gray-100"
                                value={companyName}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">
                                Username
                            </label>

                            <input
                                className="w-full border rounded p-2 bg-gray-100"
                                value={localStorage.getItem("username") || ""}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">
                                Email
                            </label>

                            <input
                                className="w-full border rounded p-2 bg-gray-100"
                                value={localStorage.getItem("email") || ""}
                                readOnly
                            />
                        </div>

                    </div>

                </div>


                {/* Investor Profile */}

                <div className="border rounded-lg p-4">

                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                        Investor Profile
                    </h3>

                    <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Investor Name
                          </label>
                          <input
                              name="investorName"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investorProfile.investorName}
                              readOnly={!editMode}
                              onChange={handleInvestorProfileChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Investor Type
                          </label>
                          <input
                              type="text"
                              name="investorType"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investorProfile.investorType}
                              readOnly={!editMode}
                              onChange={handleInvestorProfileChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Country
                          </label>
                          <input
                              type="text"
                              name="country"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investorProfile.country}
                              readOnly={!editMode}
                              onChange={handleInvestorProfileChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Year Established
                          </label>
                          <input
                              type="text"
                              name="yearEstablished"
                              placeholder="Numeric"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investorProfile.yearEstablished}
                              readOnly={!editMode}
                              onChange={handleInvestorProfileChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Website
                          </label>
                          <input
                              type="text"
                              name="website"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investorProfile.website}
                              readOnly={!editMode}
                              onChange={handleInvestorProfileChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Corporate Profile
                          </label>
                          <textarea
                              rows={4}
                              placeholder="Corporate Profile"
                              name="corporateProfile"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investorProfile.corporateProfile}
                              readOnly={!editMode}
                              onChange={handleInvestorProfileChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Key Contact Person
                          </label>
                          <input
                              type="text"
                              name="keyContactPerson"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investorProfile.keyContactPerson}
                              readOnly={!editMode}
                              onChange={handleInvestorProfileChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              LinkedIn URL
                          </label>
                          <input
                              type="text"
                              name="linkedinUrl"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investorProfile.linkedinUrl}
                              readOnly={!editMode}
                              onChange={handleInvestorProfileChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Industry Focus
                          </label>
                          <textarea
                              rows={4}
                              name="industryFocus"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investorProfile.industryFocus}
                              readOnly={!editMode}
                              onChange={handleInvestorProfileChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Investor Stage
                          </label>
                          <input
                              type="text"
                              name="preferredInvestmentStage"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investorProfile.preferredInvestmentStage}
                              readOnly={!editMode}
                              onChange={handleInvestorProfileChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Minimum Ticket Size
                          </label>
                          <input
                              type="text"
                              name="investmentTicketMin"
                              placeholder="Double"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investorProfile.investmentTicketMin}
                              readOnly={!editMode}
                              onChange={handleInvestorProfileChange}
                          />
                        </div>
                      <div>
                          <label className="block text-sm font-medium mb-1">
                              Maximum Ticket Size
                          </label>
                          <input
                              type="text"
                              name="investmentTicketMax"
                              placeholder="Double"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investorProfile.investmentTicketMax}
                              readOnly={!editMode}
                              onChange={handleInvestorProfileChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Geographic Preference
                          </label>
                          <input
                              type="text"
                              name="geographicPreference"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investorProfile.geographicPreference}
                              readOnly={!editMode}
                              onChange={handleInvestorProfileChange}
                          />
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-4">

                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                        Investment Credentials
                    </h3>

                    <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Previous Investments
                          </label>
                          <textarea
                              rows={4}
                              name="previousInvestments"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investmentCredentials.previousInvestments}
                              readOnly={!editMode}
                              onChange={handleInvestmentCredentials}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Successful Exit History
                          </label>
                          <textarea
                              rows={4}
                              name="successfulExits"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investmentCredentials.successfulExits}
                              readOnly={!editMode}
                              onChange={handleInvestmentCredentials}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Current Portfolio
                          </label>
                          <textarea
                              rows={4}
                              name="currentPortfolio"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investmentCredentials.currentPortfolio}
                              readOnly={!editMode}
                              onChange={handleInvestmentCredentials}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Portfolio References
                          </label>
                          <textarea
                              rows={4}
                              name="portfolioReferences"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investmentCredentials.portfolioReferences}
                              readOnly={!editMode}
                              onChange={handleInvestmentCredentials}
                          />
                        </div>                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Investment Ticket Size
                          </label>
                          <input
                              type="text"
                              name="investmentTicketSize"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investmentCredentials.investmentTicketSize}
                              readOnly={!editMode}
                              onChange={handleInvestmentCredentials}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Geographic Preferences
                          </label>
                          <textarea
                              rows={4}
                              name="geographicPreferences"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investmentCredentials.geographicPreferences}
                              readOnly={!editMode}
                              onChange={handleInvestmentCredentials}
                          />
                        </div>                        
                    </div>
                </div>


                <div className="border rounded-lg p-4">

                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                        Investment Proposal
                    </h3>

                    <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Proposed Investment Amount
                          </label>
                          <input
                              type="number"
                              name="proposedInvestmentAmount"
                              placeholder="Numeric"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investmentProposal.proposedInvestmentAmount}
                              readOnly={!editMode}
                              onChange={handleInvestmentProposal}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Investment Type
                          </label>
                          <input
                              type="text"
                              name="investmentType"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investmentProposal.investmentType}
                              readOnly={!editMode}
                              onChange={handleInvestmentProposal}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Expected Shareholding
                          </label>
                          <input
                              type="number"
                              name="expectedShareholding"
                              placeholder="Numeric(Percentage)"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investmentProposal.expectedShareholding}
                              readOnly={!editMode}
                              onChange={handleInvestmentProposal}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Expected Roi
                          </label>
                          <input
                              type="text"
                              name="expectedRoi"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investmentProposal.expectedRoi}
                              readOnly={!editMode}
                              onChange={handleInvestmentProposal}
                          />
                        </div>                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Exit Timeline
                          </label>
                          <input
                              type="text"
                              name="exitTimeline"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investmentProposal.exitTimeline}
                              readOnly={!editMode}
                              onChange={handleInvestmentProposal}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Board Seat Required
                          </label>
                          <select
                            name="boardSeatRequired"
                            value={investmentProposal.boardSeatRequired}
                            disabled={!editMode}
                            onChange={handleInvestmentProposal}
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Strategic Support
                          </label>
                          <textarea
                              rows={4}
                              name="strategicSupport"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investmentProposal.strategicSupport}
                              readOnly={!editMode}
                              onChange={handleInvestmentProposal}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                              Investment Conditions
                          </label>
                          <textarea
                              rows={4}
                              name="investmentConditions"
                              className={`w-full border rounded p-2 ${
                                  editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                              }`}
                              value={investmentProposal.investmentConditions}
                              readOnly={!editMode}
                              onChange={handleInvestmentProposal}
                          />
                        </div>                        
                    </div>
                </div>

            {/* Edit button action */}

                <div className="flex justify-end gap-3 pt-6">

                  {!editMode ? (

                      <button
                          type="button"
                          onClick={() => setEditMode(true)}
                          className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                      >
                          Edit Profile
                      </button>

                  ) : (

                      <>
                          <button
                              type="button"
                              onClick={async () => {

                                  setEditMode(false);

                                  await loadInvestorProfile();
                                  await loadInvestmentCredentials();
                                  await loadInvestmentProposal();

                              }}
                              className="px-6 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                          >
                              Cancel
                          </button>

                          <button
                              type="button"
                              onClick={async () => {

                                  await saveInvestorProfile();
                                  await saveInvestmentCredentials();
                                  await saveInvestmentProposal();

                                  setEditMode(false);

                                  await loadInvestorProfile();
                                  await loadInvestmentCredentials();
                                  await loadInvestmentProposal();

                                  setProfileOpen(true);
                                  // await loadFundingRequirement();
                                  // await loadManagementTeam();
                              }}
                              className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                          >
                              Save Profile
                          </button>

                      </>

                  )}

                </div>


            </div>

          </div>
        </div>
      )}

      {/* Create Deal Modal */}
      {isCreateDealOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">

            <button
              onClick={() => setCreateDealOpen(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Create Deal</h2>

            <div className="space-y-3">

              <input placeholder="Title"
                className="w-full border p-2 rounded"
                onChange={(e) => setDeal({...deal, title: e.target.value})}
              />

              <textarea placeholder="Description"
                className="w-full border p-2 rounded"
                onChange={(e) => setDeal({...deal, description: e.target.value})}
              />

              {/* <input placeholder="Industry"
                className="w-full border p-2 rounded"
                onChange={(e) => setDeal({...deal, industry: e.target.value})}
              /> */}
              <Select value={deal.dealType} onValueChange={(value) => setDeal({ ...deal, dealType: value })}>
                <SelectTrigger><SelectValue placeholder="Select Deal Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="fundseeker">FundSeeker</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="m&a">M&A</SelectItem>
                </SelectContent>
              </Select>

              <Select value={deal.industry} onValueChange={(value) => setDeal({ ...deal, industry: value })}>
                <SelectTrigger><SelectValue placeholder="Select Industry Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Fintech">Fintech</SelectItem>
                  <SelectItem value="Clean Energy">Clean Energy</SelectItem>
                  <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
                  <SelectItem value="Automotive">Automotive</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={deal.country} onValueChange={(value) => setDeal({ ...deal, country: value })}>
                <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="japan">Japan</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <input placeholder="Min Amount"
                type="number"
                className="w-full border p-2 rounded"
                onChange={(e) => setDeal({...deal, minAmount: Number(e.target.value)})}
              />

              <input placeholder="Max Amount"
                type="number"
                className="w-full border p-2 rounded"
                onChange={(e) => setDeal({...deal, maxAmount: Number(e.target.value)})}
              />

              <button
                onClick={handleCreateDeal}
                className="bg-accent text-white px-4 py-2 rounded w-full"
              >
                Submit Deal
              </button>

            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default InvestorPage;