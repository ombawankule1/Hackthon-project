import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  BarChart3,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";

const Dashboard = () => {
  // 🔐 STEP 5B — ROLE GUARD (demo-safe)
  // change this to: "citizen" | "judge" | "admin"
  const role = "admin";

  const [complaints, setComplaints] = useState<any[]>([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const snapshot = await getDocs(collection(db, "complaints"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComplaints(data);
    };

    fetchComplaints();
  }, []);

  // ----- STATS -----
  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === "RESOLVED").length;
  const escalated = complaints.filter((c) => c.escalationLevel > 0).length;
  const open = complaints.filter((c) => c.status === "OPEN").length;

  const stats = [
    {
      label: "Total Complaints",
      value: total,
      icon: BarChart3,
      trend: "Live data",
    },
    {
      label: "Resolved",
      value: resolved,
      icon: CheckCircle2,
      trend: "Auto-updated",
    },
    {
      label: "Open",
      value: open,
      icon: Clock,
      trend: "Within SLA",
    },
    {
      label: "Escalated",
      value: escalated,
      icon: AlertTriangle,
      trend: "SLA breach",
    },
  ];

  // ----- DEPARTMENT CHART -----
  const departmentMap: any = {};
  complaints.forEach((c) => {
    const dept = c.category || "Other";
    if (!departmentMap[dept]) {
      departmentMap[dept] = {
        name: dept,
        resolved: 0,
        pending: 0,
        escalated: 0,
      };
    }
    if (c.status === "RESOLVED") departmentMap[dept].resolved++;
    else departmentMap[dept].pending++;
    if (c.escalationLevel > 0) departmentMap[dept].escalated++;
  });

  const departmentData = Object.values(departmentMap);

  // ----- PIE CHART -----
  const statusData = [
    { name: "Resolved", value: resolved, color: "#10b981" },
    { name: "Open", value: open, color: "#3b82f6" },
    { name: "Escalated", value: escalated, color: "#ef4444" },
  ];

  // ----- RECENT ESCALATIONS -----
  const recentEscalations = complaints
    .filter((c) => c.escalationLevel > 0)
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {role === "citizen" ? (
            // 🚫 Citizen Block
            <div className="text-center mt-20">
              <AlertTriangle className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">
                Access Restricted
              </h2>
              <p className="text-muted-foreground">
                This dashboard is available only to officials and administrators.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  SLA Performance Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Real-time grievance routing & escalation overview
                </p>
              </div>

              {/* STATS */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="feature-card">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-xs text-primary mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.trend}
                    </p>
                  </div>
                ))}
              </div>

              {/* CHARTS */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="feature-card">
                  <h2 className="text-lg font-semibold mb-4">
                    Department Performance
                  </h2>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Bar dataKey="resolved" fill="#10b981" />
                        <Bar dataKey="pending" fill="#f59e0b" />
                        <Bar dataKey="escalated" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="feature-card">
                  <h2 className="text-lg font-semibold mb-4">
                    Complaint Status
                  </h2>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                        >
                          {statusData.map((s, i) => (
                            <Cell key={i} fill={s.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* ESCALATIONS */}
              <div className="feature-card mt-6">
                <h2 className="text-lg font-semibold mb-4">
                  Recent Escalations
                </h2>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Complaint</th>
                      <th className="text-left py-2">Category</th>
                      <th className="text-left py-2">Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEscalations.map((c) => (
                      <tr key={c.id} className="border-b">
                        <td className="py-2">{c.subject}</td>
                        <td className="py-2">{c.category}</td>
                        <td className="py-2 text-red-500">
                          Level {c.escalationLevel}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
