import Navbar from "@/components/Navbar";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8 pt-24">

        {/* Welcome Section */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-1">Welcome, XYZ</h2>
          <p className="text-sm text-gray-600 mb-2">📅 Today: 21 March 2026</p>
          <p className="text-gray-700">
            Search the companies who seeks funds.
          </p>
        </section>

        {/* Title */}
        <h3 className="text-lg font-semibold">INVESTOR</h3>

        {/* All Companies Stats */}
        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">All Companies' Statistics</h3>

          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Investors</p>
              <p className="text-xl font-bold">420</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Fund Seekers</p>
              <p className="text-xl font-bold">360</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Tech Collaborators</p>
              <p className="text-xl font-bold">290</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">M&A Leads</p>
              <p className="text-xl font-bold">178</p>
            </div>
          </div>
        </section>

        {/* Fund Seekers Stats */}
        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Fund Seekers' Statistics</h3>

          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Total Fund Value Reqd</p>
              <p className="text-xl font-bold">420 Cr</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Total Indian Companies need fund</p>
              <p className="text-xl font-bold">360</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-gray-500">Total Japanese Companies need fund</p>
              <p className="text-xl font-bold">290</p>
            </div>
          </div>
        </section>

        {/* Table Section */}
        <section className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Fund Seeker Companies</h3>
            <a href="#" className="text-blue-600 text-sm font-medium">
              View All
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-3">Company Name</th>
                  <th className="text-left p-3">Address</th>
                  <th className="text-left p-3">Country</th>
                  <th className="text-left p-3">Funds Reqd</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t">
                  <td className="p-3">Alpha Tech Pvt Ltd</td>
                  <td className="p-3">Coimbatore</td>
                  <td className="p-3">India</td>
                  <td className="p-3">50 Cr</td>
                  <td className="p-3">
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">
                      View Details
                    </button>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">Beta Healthcare</td>
                  <td className="p-3">Himachal Pradesh</td>
                  <td className="p-3">India</td>
                  <td className="p-3">85 Cr</td>
                  <td className="p-3">
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
};

export default RegisterPage;