import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
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
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState<any[]>([]);

  // 🔐 AUTH + ROLE CHECK
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setRole("citizen");
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setRole(snap.data().role || "citizen");
      } else {
        setRole("citizen");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 📥 FETCH COMPLAINTS
  useEffect(() => {
    if (role === "admin" || role === "judge") {
      const fetchComplaints = async () => {
        const snapshot = await getDocs(collection(db, "complaints"));
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setComplaints(data);
      };
      fetchComplaints();
    }
  }, [role]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard…
      </div>
    );
  }

  if (role === "citizen") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">
              This dashboard is available only to officials and administrators.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ---------- HELPERS ----------
  const getDaysOpen = (createdAt: any) => {
    if (!createdAt || !createdAt.toDate) return 0;
    const created = createdAt.toDate();
    const now = new Date();
    return Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  // ---------- STATS ----------
  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === "RESOLVED").length;
  const open = complaints.filter((c) => c.status === "OPEN").length;
  const escalated = complaints.filter(
    (c) => (c.escalationLevel || 0) > 0
  ).length;

  const stats = [
    { label: "Total Complaints", value: total, icon: BarChart3, trend: "Live" },
    { label: "Resolved", value: resolved, icon: CheckCircle2, trend: "Updated" },
    { label: "Open", value: open, icon: Clock, trend: "Tracking SLA" },
    {
      label: "Escalated",
      value: escalated,
      icon: AlertTriangle,
      trend: "Auto-escalated",
    },
  ];

  // ---------- DEPARTMENT ----------
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
    if ((c.escalationLevel || 0) > 0) departmentMap[dept].escalated++;
  });

  const departmentData = Object.values(departmentMap);

  // ---------- PIE ----------
  const statusData = [
    { name: "Resolved", value: resolved, color: "#10b981" },
    { name: "Open", value: open, color: "#3b82f6" },
    { name: "Escalated", value: escalated, color: "#ef4444" },
  ];

  // ---------- SLA WATCHLIST ----------
  const slaWatchlist = complaints
    .filter((c) => c.status === "OPEN")
    .map((c) => {
      const daysOpen = getDaysOpen(c.createdAt);
      const sla = c.slaDays || 7;
      return {
        ...c,
        daysOpen,
        breached: daysOpen > sla,
        warning: daysOpen >= sla - 2 && daysOpen <= sla,
      };
    })
    .sort((a, b) => b.daysOpen - a.daysOpen)
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              SLA Performance Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time grievance routing, SLA tracking & escalation
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
                <p className="text-sm text-muted-foreground">{stat.label}</p>
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
              <ResponsiveContainer width="100%" height={280}>
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

            <div className="feature-card">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" outerRadius={100}>
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
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
