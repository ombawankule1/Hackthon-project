import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

type ComplaintStatus = {
  id: string;
  status: "pending" | "in-progress" | "resolved" | "escalated";
  category: string;
  department: string;
  submittedDate: string;
  slaDeadline: string;
  lastUpdate: string;
  timeline: { date: string; action: string; by: string }[];
};

const mockComplaint: ComplaintStatus = {
  id: "GRV-12345678",
  status: "in-progress",
  category: "Water Supply",
  department: "Water Resources Department",
  submittedDate: "2024-01-15",
  slaDeadline: "2024-01-22",
  lastUpdate: "2024-01-17",
  timeline: [
    { date: "2024-01-15", action: "Complaint submitted", by: "Citizen" },
    { date: "2024-01-15", action: "Auto-routed to Water Resources Department", by: "System" },
    { date: "2024-01-16", action: "Assigned to field officer", by: "Department Head" },
    { date: "2024-01-17", action: "Site inspection scheduled", by: "Field Officer" },
  ],
};

const statusConfig = {
  "pending": { label: "Pending", color: "bg-amber-100 text-amber-800", icon: Clock },
  "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-800", icon: ArrowRight },
  "resolved": { label: "Resolved", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  "escalated": { label: "Escalated", color: "bg-red-100 text-red-800", icon: AlertCircle },
};

const TrackComplaint = () => {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState<ComplaintStatus | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    // Mock search - in real app would fetch from API
    if (complaintId.toUpperCase().startsWith("GRV-")) {
      setComplaint(mockComplaint);
    } else {
      setComplaint(null);
    }
  };

  const StatusIcon = complaint ? statusConfig[complaint.status].icon : Clock;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Track Your Complaint
            </h1>
            <p className="text-muted-foreground">
              Enter your complaint ID to view the current status and timeline
            </p>
          </div>

          <form onSubmit={handleSearch} className="feature-card mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="complaintId">Complaint ID</Label>
                <Input
                  id="complaintId"
                  value={complaintId}
                  onChange={(e) => setComplaintId(e.target.value)}
                  placeholder="e.g., GRV-12345678"
                  required
                />
              </div>
              <div className="flex items-end">
                <Button type="submit" size="lg">
                  <Search className="w-5 h-5" />
                  Track
                </Button>
              </div>
            </div>
          </form>

          {searched && (
            <>
              {complaint ? (
                <div className="space-y-6">
                  {/* Status Card */}
                  <div className="feature-card">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Complaint ID</p>
                        <p className="text-xl font-bold text-foreground">{complaint.id}</p>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${statusConfig[complaint.status].color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig[complaint.status].label}
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium text-foreground">{complaint.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Assigned Department</p>
                        <p className="font-medium text-foreground">{complaint.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted Date</p>
                        <p className="font-medium text-foreground">{complaint.submittedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">SLA Deadline</p>
                        <p className="font-medium text-foreground">{complaint.slaDeadline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="feature-card">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Activity Timeline</h2>
                    <div className="space-y-4">
                      {complaint.timeline.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            {index < complaint.timeline.length - 1 && (
                              <div className="w-0.5 h-full bg-border mt-1"></div>
                            )}
                          </div>
                          <div className="pb-4">
                            <p className="text-sm text-muted-foreground">{item.date}</p>
                            <p className="font-medium text-foreground">{item.action}</p>
                            <p className="text-sm text-muted-foreground">By: {item.by}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="feature-card text-center py-12">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Complaint Not Found
                  </h3>
                  <p className="text-muted-foreground">
                    Please check the complaint ID and try again. IDs start with "GRV-"
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackComplaint;
