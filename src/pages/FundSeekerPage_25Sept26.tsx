
// ============================================================================
// Phase 2 Integration Notes (Generated)
// ----------------------------------------------------------------------------
// Recommended next integration:
// 1. Keep this page as the main Fund Seeker Dashboard.
// 2. Replace the current "Your Profile" modal with a richer Company Profile
//    form backed by:
//       GET  /companyProfile/get
//       POST /companyProfile/save
// 3. Keep Company Information (companyName, username, email, etc.) from the
//    existing user source.
// 4. Load Company Profile fields (aboutCompany, businessModel, USP, etc.)
//    from the new CompanyProfile APIs.
// 5. Later, extend the same modal with Management Team, Funding Requirement,
//    Financial Information and Documents sections.
// ============================================================================

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiFetch } from "../services/ApiClient";
import Footer from "@/components/Footer";

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
const FundSeekerPage = () => {
  const [companyName, setCompanyName] = useState("");
    const [fundSeekers, setFundSeekers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
  
    // 🔥 MODAL STATE
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [country, setCountry] = useState("");
    // const [industry, setIndustry] = useState("");
    // const [dealType, setDealType] = useState("");

    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isCreateDealOpen, setCreateDealOpen] = useState(false);
    const [stats, setStats] = useState({
      totalInvestors: 0,
      totalFundSeekers: 0,
      totalTechnology: 0,
      totalMA: 0,

      totalInvestmentIndia: 0,
      totalInvestmentJapan: 0,

      totalIndianInvestors: 0,
      totalJapaneseInvestors: 0
    });
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
    const [profile, setProfile] = useState({
        aboutCompany: "",
        businessModel: "",
        productsServices: "",
        usp: "",
        marketOpportunity: "",
        competitiveAdvantage: "",
        yearOfIncorporation: "",
        employeeCount: "",
        annualTurnover: "",
        registeredAddress: "",
        postalCode: "",
        linkedinUrl: "",
        facebookUrl: "",
        twitterUrl: "",
        youtubeUrl: ""
    });
    const [fundingRequirement, setFundingRequirement] = useState({
        fundingTitle: "",
        fundingAmount: "",
        fundingCurrency: "",
        fundingType: "",
        fundingRound: "",
        companyValuation: "",
        minimumInvestment: "",
        useOfFunds: "",
        fundingStatus: "OPEN",
        remarks: ""

    });
    const [managementTeam, setManagementTeam] = useState({
        fullName: "",
        designation: "",
        profileSummary: "",
        previousExperience: "",
        qualification: "",
        linkedinUrl: "",
        email: "",
        phone: "",
        displayOrder: 1,
        status: "ACTIVE",
        active: 1,
        remarks: ""

    });
    const [editMode, setEditMode] = useState(false);
    const handleCreateDeal = async () => {
      try {
        // const response = await fetch("http://localhost:1881/users/createDeal", {
        // const res = await fetch("/api/users/createDeal", {
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
      // const response = await fetch("/api/users/getUsersList", {        
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      //   body: JSON.stringify("dummy"),
      // });
      const res = await apiFetch("/users/getUsersList", {
          method: "POST",body: JSON.stringify("dummy"),}, true);
      const result = await res.json();

      if (result.status === 1) {
        const users: User[] = result.data["User Data List"] || [];

        // const seekers = users.filter((u) =>
        //   (u.userType || "").toLowerCase().includes("fund")
        // );

        setFundSeekers(users);
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
        "/users/fundSeekerDashboardStats",
        {
          method: "POST",
          body: JSON.stringify("dummy")
        },
        true
      );

      const result = await res.json();

      if (result.status === 1) {  
        setStats(result.data.stats);
      }

    } catch (error) {
      console.error(error);
    }
  };
const loadCompanyProfile = async () => {

    try {
        const res = await apiFetch(
            "/companyProfile/get",
            {
                method: "GET"
            },
            true
        );
        const result = await res.json();

        if (result.status === 1) {
            if (result.status === 1) {
              setProfile({
                  aboutCompany: result.data.companyProfile.aboutCompany || "",
                  businessModel: result.data.companyProfile.businessModel || "",
                  productsServices: result.data.companyProfile.productsServices || "",
                  usp: result.data.companyProfile.usp || "",
                  marketOpportunity: result.data.companyProfile.marketOpportunity || "",
                  competitiveAdvantage: result.data.companyProfile.competitiveAdvantage || "",
                  yearOfIncorporation: result.data.companyProfile.yearOfIncorporation || "",
                  employeeCount: result.data.companyProfile.employeeCount || "",
                  annualTurnover: result.data.companyProfile.annualTurnover || "",
                  registeredAddress: result.data.companyProfile.registeredAddress || "",
                  postalCode: result.data.companyProfile.postalCode || "",
                  linkedinUrl: result.data.companyProfile.linkedinUrl || "",
                  facebookUrl: result.data.companyProfile.facebookUrl || "",
                  twitterUrl: result.data.companyProfile.twitterUrl || "",
                  youtubeUrl: result.data.companyProfile.youtubeUrl || ""
              });
            }
        }
    } catch (err) {
        console.error(err);
    }
};
const saveCompanyProfile = async () => {
    try {
// console.log("Saving Company Profile");
// console.log(profile);      
      const res = await apiFetch(
          "/companyProfile/save",
          {
              method: "POST",
              body: JSON.stringify(profile)
          },
          true
      );
// console.log("While saving Comapny Profile:: HTTP Status =", res.status);        
      const result = await res.json();
// console.log(result);      
      if (result.status === 1) {
            // alert(result.message);
            setEditMode(false);
  // console.log(profile);
            await loadCompanyProfile();
      }
      else {
            alert(result.message);
      }
    }
    catch (err) {
        console.error(err);
    }
};

const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {

    const { name, value } = e.target;

    setProfile(prev => ({
        ...prev,
        [name]: value
    }));

};
const saveFundingRequirement = async () => {

    try {
// console.log("Saving Funding Requirement");
// console.log(fundingRequirement);      
      const res = await apiFetch(
          "/fundingRequirement/save",
          {
              method: "POST",
              body: JSON.stringify(fundingRequirement)
          },
          true
      );
// console.log("While saving funding Req:: HTTP Status =", res.status);      
      const result = await res.json();
// console.log(result);
      if (result.status === 1) {
            // alert(result.message);
            setEditMode(false);
  // console.log(fundingRequirement);
            await loadFundingRequirement();
      }
      else {
            alert(result.message);
      }
    }
    catch (err) {
        console.error(err);
    }
};
const saveManagementTeam = async () => {
    try {
        const res = await apiFetch(
            "/managementTeam/save",
            {
                method: "POST",
                body: JSON.stringify(managementTeam)
            },
            true
        );
        const result = await res.json();
        if (result.status === 1) {
            // alert(result.message);
            await loadManagementTeam();
        } else {
            alert(result.message);
        }
    } catch (err) {
        console.error(err);
    }
};
const loadFundingRequirement = async () => {
    try {

console.log("===== LOAD FUNDING REQUIREMENT =====");
        const res = await apiFetch(
            "/fundingRequirement/get",
            {
                method: "GET"
            },
            true
        );
console.log("While loading FundignRq:: HTTP Status =", res.status);        
        const result = await res.json();
console.log(result);
        const fr = result.data?.fundingRequirement || result;
console.log("Funding Requirement Object:", fr);
        if (fr) {
console.log("Funding Requirement Object:", result.data?.fundingRequirement);          
            //if (result.status === 1) {
              setFundingRequirement({
                  fundingTitle: fr.fundingTitle || "",
                  fundingAmount: fr.fundingAmount || "",
                  fundingCurrency: fr.fundingCurrency || "",
                  fundingType: fr.fundingType || "",
                  fundingRound: fr.fundingRound || "",
                  companyValuation: fr.companyValuation || "",
                  minimumInvestment: fr.minimumInvestment || "",
                  useOfFunds: fr.useOfFunds || "",
                  fundingStatus: fr.fundingStatus || "",
                  remarks: fr.remarks || ""
              });
            } else {

            console.error(
                "Funding Requirement API returned failure:",
                result
            );
        }
        //}
    } catch (err) {
        console.error("ERROR loading Funding Requirement:",err);
    }
};

const loadManagementTeam = async () => {
    try {
        const res = await apiFetch(
            "/managementTeam/get",
            {
                method: "GET"
            },
            true
        );
        const result = await res.json();
        if (result.status === 1) {
            setManagementTeam({

                fullName: result.data.managementTeam.fullName || "",
                designation: result.data.managementTeam.designation || "",
                profileSummary: result.data.managementTeam.profileSummary || "",
                previousExperience: result.data.managementTeam.previousExperience || "",
                qualification: result.data.managementTeam.qualification || "",
                linkedinUrl: result.data.managementTeam.linkedinUrl || "",
                email: result.data.managementTeam.email || "",
                phone: result.data.managementTeam.phone || "",
                displayOrder: result.data.managementTeam.displayOrder || 1,
                status: result.data.managementTeam.status || "ACTIVE",
                active: result.data.managementTeam.active || 1,
                remarks: result.data.managementTeam.remarks || ""
            });
        }
    } catch (err) {
        console.error(err);
    }
};

const handleFundingRequirementChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {

    const { name, value } = e.target;

    setFundingRequirement(prev => ({
        ...prev,
        [name]: value
    }));

};
const handleManagementTeamChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {

    const { name, value } = e.target;

    setManagementTeam(prev => ({
        ...prev,
        [name]: value
    }));

};
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 space-y-8">

        {/* Welcome Section */}
        <section className="relative overflow-hidden rounded-xl">

          <div className="absolute inset-0 bg-primary" />

          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-yellow-500 blur-3xl" />
            <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-red-500 blur-3xl" />
          </div>

          <div className="px-6 py-24 relative z-10">

            <p className="text-accent font-semibold tracking-widest uppercase mb-4">
              Fund Seeker Portal
            </p>

            <h1 className="text-5xl font-bold text-white mb-6">
              Discover Verified
              <span className="text-accent"> Investors </span>
              Across India & Japan
            </h1>

            <p className="text-slate-300 text-lg max-w-3xl mb-8">
              Explore investors, review company profiles,
              analyze investment interests and connect
              with strategic funding partners.
            </p>

            <div className="flex gap-3">

              <button
                onClick={async () => {
                  await loadCompanyProfile();
                  await loadFundingRequirement();
                  await loadManagementTeam();
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

        {/* Title */}
        {/* <h3 className="text-lg font-semibold">FUND SEEKERS</h3> */}

        {/* All Companies Stats */}
        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">All Companies' Statistics</h3>

          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Investors</p>
              <p className="text-xl font-bold">{stats.totalInvestors}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Fund Seekers</p>
              <p className="text-xl font-bold">{stats.totalFundSeekers}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Tech Collaborators</p>
              <p className="text-xl font-bold">{stats.totalTechnology}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">M&A Leads</p>
              <p className="text-xl font-bold">{stats.totalMA}</p>
            </div>
          </div>
        </section>

        {/* Fund Seekers Stats */}
        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Investers' Statistics</h3>

          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">
                Total Investment Offered In Rupees
              </p>

              <p className="text-xl font-bold">
                ₹ {stats.totalInvestmentIndia} Cr.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">
                Total Investment Offered In Yen
              </p>

              <p className="text-xl font-bold">
                ¥ {stats.totalInvestmentJapan}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">
                Total Indian Investors
              </p>

              <p className="text-xl font-bold">
                {stats.totalIndianInvestors}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">
                Total Japanese Investors
              </p>

              <p className="text-xl font-bold">
                {stats.totalJapaneseInvestors}
              </p>
            </div>
          </div>
        </section>

        {/* Table Section */}
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
                    <th className="text-left p-3">Username</th>
                    <th className="text-left p-3">Country</th>
                    <th className="text-left p-3">Funds</th>
                    <th className="text-left p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {fundSeekers.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">
                        {item.companyName ||
                          // item.website ||
                          // item.firstname ||
                          "N/A"}
                      </td>

                      <td className="p-3">{item.username}</td>

                      <td className="p-3">{item.country || "N/A"}</td>

                      <td className="p-3">
                        {item.amount ? `${item.amount} Cr` : "N/A"}
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
              <h3 mb-2><strong>Basic Info:-</strong></h3>
              <p>Full Name: {selectedUser.firstname} {selectedUser.lastname}</p>
              <p>Username: {selectedUser.username}</p>
              <p>Email: {selectedUser.email || "N/A"}</p>
              <p>Phone: {selectedUser.phone1 || "N/A"}</p>
              <p>Country: {selectedUser.country || "N/A"}</p>
            </div>

            <div></div>
            {/* 🔹 COMPANY INFO */}
            <div>
              <p></p>
              <h3 className="font-semibold text-gray-700 mb-2"></h3>
              <h3 mb-2><strong>Company Info:-</strong></h3>
              <p>Company Name: {selectedUser.companyName || "N/A"}</p>
              <p>Website: {selectedUser.website || "N/A"}</p>
              <p>Industry: {selectedUser.industryType || "N/A"}</p>
              {/* <h3 className="font-semibold"> Company Name: {selectedUser.companyName || "N/A"}</h3> */}
              {/* <p><strong>Website:</strong> {selectedUser.website || "N/A"}</p>
              <p><strong>Industry:</strong> {selectedUser.industryType || "N/A"}</p> */}
            </div>

            {/* 🔹 REGISTRATION INFO */}
            <div>
              <h3 mb-2><strong>Registration Info:-</strong></h3>
              {/* <h3 className="font-semibold text-gray-700 mb-2">Registration Info</h3> */}
              <p>Company Reg No: {selectedUser.companyRegistrationNo || "N/A"}</p>
              <p>GST No: {selectedUser.gstNo || "N/A"}</p>
              <p>PAN No: {selectedUser.panNo || "N/A"}</p>
              <p>CIN No: {selectedUser.cinNo || "N/A"}</p>
              <p>Corporate No: {selectedUser.corporateNo || "N/A"}</p>
              <p>Tax ID: {selectedUser.taxId || "N/A"}</p>
            </div>

            {/* 🔹 FINANCIAL INFO */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Financial Info:-</h3>
              <p><strong>Investment Capacity:</strong> {selectedUser.amount ? `${selectedUser.amount} Cr` : "N/A"}</p>
            </div>

            {/* 🔹 STATUS INFO */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
              <p><strong>User Type:-</strong> {selectedUser.userType}</p>
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


                {/* Company Profile */}

                <div className="border rounded-lg p-4">

                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                        Company Profile
                    </h3>

                    <div className="space-y-4">

                        <textarea
                            rows={4}
                            name="aboutCompany"
                            placeholder="About Company"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.aboutCompany}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                        <input
                            type="text"
                            name="businessModel"
                            placeholder="Business Model"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.businessModel}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                        <input
                            type="text"
                            name="productsServices"
                            placeholder="Products & Services"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.productsServices}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                        <input
                            type="text"
                            name="usp"
                            placeholder="USP"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.usp}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                        <textarea
                            rows={3}
                            name="marketOpportunity"
                            placeholder="Market Opportunity"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.marketOpportunity}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                        <textarea
                            rows={3}
                            name="competitiveAdvantage"
                            placeholder="Competitive Advantage"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.competitiveAdvantage}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                    </div>

                </div>

                


                {/* Business Information */}

                <div className="border rounded-lg p-4">

                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                        Business Information
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4">

                        <input
                            type="text"
                            name="yearOfIncorporation"
                            placeholder="Year Of Incorporation(Numeric)"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.yearOfIncorporation}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                        <input
                            type="text"
                            name="employeeCount"
                            placeholder="Employee Count(Numeric)"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.employeeCount}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                        <input
                            type="text"
                            name="annualTurnover"
                            placeholder="Annual Turnover(Numeric)"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.annualTurnover}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                    </div>

                </div>


                {/* Contact & Social */}

                <div className="border rounded-lg p-4">

                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                        Contact & Social Media
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="registeredAddress"
                            placeholder="Registered Address"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.registeredAddress}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.postalCode}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                        <input
                            type="text"
                            name="linkedinUrl"
                            placeholder="Linkedin Url"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.linkedinUrl}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                        <input
                            type="text"
                            name="facebookUrl"
                            placeholder="FacebookUrl"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.facebookUrl}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                        <input
                            type="text"
                            name="twitterUrl"
                            placeholder="Twitter Url"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.twitterUrl}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                        <input
                            type="text"
                            name="youtubeUrl"
                            placeholder="Youtube Url"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={profile.youtubeUrl}
                            readOnly={!editMode}
                            onChange={handleProfileChange}
                        />

                    </div>

                </div>

                {/* Funding Requirements */}

                <div className="border rounded-lg p-4">

                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                        Funding Requirement
                    </h3>

                    <div className="space-y-4">

                        <input
                            type="text"
                            name="fundingTitle"
                            placeholder="Funding Title"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={fundingRequirement.fundingTitle}
                            readOnly={!editMode}
                            onChange={handleFundingRequirementChange}
                        />

                        <input
                            type="text"
                            name="fundingAmount"
                            placeholder="Funding Amount(Numeric)"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={fundingRequirement.fundingAmount}
                            readOnly={!editMode}
                            onChange={handleFundingRequirementChange}
                        />

                        <input
                            name="fundingCurrency"
                            placeholder="Funding Currency"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={fundingRequirement.fundingCurrency}
                            readOnly={!editMode}
                            onChange={handleFundingRequirementChange}
                        />

                        <textarea
                            rows={4}
                            name="fundingType"
                            placeholder="Funding Type"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={fundingRequirement.fundingType}
                            readOnly={!editMode}
                            onChange={handleFundingRequirementChange}
                        />

                        <textarea
                            rows={4}
                            name="fundingRound"
                            placeholder="Funding Round"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={fundingRequirement.fundingRound}
                            readOnly={!editMode}
                            onChange={handleFundingRequirementChange}
                        />

                        <input
                            type="text"
                            name="companyValuation"
                            placeholder="Company Valuation(Numeric)"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={fundingRequirement.companyValuation}
                            readOnly={!editMode}
                            onChange={handleFundingRequirementChange}
                        />

                        <input
                            type="text"
                            name="minimumInvestment"
                            placeholder="Minimum Investment(Numeric)"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={fundingRequirement.minimumInvestment}
                            readOnly={!editMode}
                            onChange={handleFundingRequirementChange}
                        />

                        <textarea
                            rows={4}
                            name="useOfFunds"
                            placeholder="Use Of Funds"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={fundingRequirement.useOfFunds}
                            readOnly={!editMode}
                            onChange={handleFundingRequirementChange}
                        />

                        <input
                            name="fundingStatus"
                            placeholder="Runding Status"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={fundingRequirement.fundingStatus}
                            readOnly={!editMode}
                            onChange={handleFundingRequirementChange}
                        />

                        <textarea
                            rows={4}
                            name="remarks"
                            placeholder="Remarks"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={fundingRequirement.remarks}
                            readOnly={!editMode}
                            onChange={handleFundingRequirementChange}
                        />

                    </div>

                </div>

                {/* Management Team */}
                <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                        Management Team
                    </h3>
                    <div className="space-y-4">
                        <input
                            name="fullName"
                            placeholder="Full Name"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={managementTeam.fullName}
                            readOnly={!editMode}
                            onChange={handleManagementTeamChange}
                        />
                        <input
                            name="designation"
                            placeholder="Designation"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={managementTeam.designation}
                            readOnly={!editMode}
                            onChange={handleManagementTeamChange}
                        />
                        <textarea
                            rows={3}
                            name="profileSummary"
                            placeholder="Profile Summary"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={managementTeam.profileSummary}
                            readOnly={!editMode}
                            onChange={handleManagementTeamChange}
                        />
                        <textarea
                            rows={3}
                            name="previousExperience"
                            placeholder="Previous Experience"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={managementTeam.previousExperience}
                            readOnly={!editMode}
                            onChange={handleManagementTeamChange}
                        />
                        <input
                            name="qualification"
                            placeholder="Qualification"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={managementTeam.qualification}
                            readOnly={!editMode}
                            onChange={handleManagementTeamChange}
                        />
                        <input
                            name="linkedinUrl"
                            placeholder="LinkedIn URL"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={managementTeam.linkedinUrl}
                            readOnly={!editMode}
                            onChange={handleManagementTeamChange}
                        />
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                name="email"
                                placeholder="Email"
                                className={`w-full border rounded p-2 ${
                                    editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                                }`}
                                value={managementTeam.email}
                                readOnly={!editMode}
                                onChange={handleManagementTeamChange}
                            />
                            <input
                                name="phone"
                                placeholder="Phone"
                                className={`w-full border rounded p-2 ${
                                    editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                                }`}
                                value={managementTeam.phone}
                                readOnly={!editMode}
                                onChange={handleManagementTeamChange}
                            />
                        </div>
                        <textarea
                            rows={3}
                            name="remarks"
                            placeholder="Remarks"
                            className={`w-full border rounded p-2 ${
                                editMode ? "bg-white" : "bg-gray-100 cursor-not-allowed"
                            }`}
                            value={managementTeam.remarks}
                            readOnly={!editMode}
                            onChange={handleManagementTeamChange}
                        />
                    </div>
                </div>


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

                                  await loadCompanyProfile();
                                  await loadFundingRequirement();
                                  await loadManagementTeam();

                              }}
                              className="px-6 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                          >
                              Cancel
                          </button>

                          <button
                              type="button"
                              onClick={async () => {

                                  await saveCompanyProfile();
                                  await saveFundingRequirement();
                                  await saveManagementTeam();

                                  setEditMode(false);

                                  await loadCompanyProfile();
                                  await loadFundingRequirement();
                                  await loadManagementTeam();
                              }}
                              className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                          >
                              Save Profile
                          </button>

                          {/* <button
                              type="button"
                              onClick={async () => {

                                  await saveFundingRequirement();

                                  setEditMode(false);

                                  await loadFundingRequirement();

                              }}
                              className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                          >
                              Save Profile
                          </button> */}

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

export default FundSeekerPage;