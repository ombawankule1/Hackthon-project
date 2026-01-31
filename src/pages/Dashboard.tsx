import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BarChart3, Clock, CheckCircle2, AlertTriangle, TrendingUp, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const departmentData = [
  { name: "Water Supply", resolved: 45, pending: 12, escalated: 3 },
  { name: "Electricity", resolved: 38, pending: 8, escalated: 2 },
  { name: "Roads", resolved: 52, pending: 15, escalated: 5 },
  { name: "Sanitation", resolved: 28, pending: 6, escalated: 1 },
  { name: "Transport", resolved: 22, pending: 9, escalated: 2 },
];

const statusData = [
  { name: "Resolved", value: 185, color: "#10b981" },
  { name: "In Progress", value: 50, color: "#3b82f6" },
  { name: "Pending", value: 23, color: "#f59e0b" },
  { name: "Escalated", value: 13, color: "#ef4444" },
];

const stats = [
  { label: "Total Complaints", value: "271", icon: BarChart3, trend: "+12% this month" },
  { label: "Resolved", value: "185", icon: CheckCircle2, trend: "68% resolution rate" },
  { label: "Avg Resolution Time", value: "4.2 days", icon: Clock, trend: "Within SLA" },
  { label: "Active Escalations", value: "13", icon: AlertTriangle, trend: "5% of total" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              SLA Performance Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time metrics on complaint resolution and department performance
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="feature-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-primary mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Department Performance */}
            <div className="feature-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Department Performance</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="resolved" stackId="a" fill="#10b981" name="Resolved" />
                    <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
                    <Bar dataKey="escalated" stackId="a" fill="#ef4444" name="Escalated" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-muted-foreground">Resolved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-xs text-muted-foreground">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-muted-foreground">Escalated</span>
                </div>
              </div>
            </div>

            {/* Status Distribution */}
            <div className="feature-card">
              <h2 className="text-lg font-semibold text-foreground mb-4">Complaint Status Distribution</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {statusData.map((status) => (
                  <div key={status.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                    <span className="text-xs text-muted-foreground">{status.name} ({status.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="feature-card mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Escalations</h2>
              <Users className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Complaint ID</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Department</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">SLA Breach</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Escalated To</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2 font-medium text-foreground">GRV-98765432</td>
                    <td className="py-3 px-2 text-foreground">Roads & Infrastructure</td>
                    <td className="py-3 px-2 text-destructive">+3 days</td>
                    <td className="py-3 px-2 text-foreground">District Commissioner</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2 font-medium text-foreground">GRV-87654321</td>
                    <td className="py-3 px-2 text-foreground">Water Supply</td>
                    <td className="py-3 px-2 text-destructive">+1 day</td>
                    <td className="py-3 px-2 text-foreground">Chief Engineer</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-medium text-foreground">GRV-76543210</td>
                    <td className="py-3 px-2 text-foreground">Public Transport</td>
                    <td className="py-3 px-2 text-destructive">+2 days</td>
                    <td className="py-3 px-2 text-foreground">Transport Secretary</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
