import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AlertTriangle, Clock, ArrowUp, Bell, Mail, Phone } from "lucide-react";

const escalationLevels = [
  {
    level: 1,
    title: "First Level - Department Head",
    trigger: "SLA deadline exceeded by 24 hours",
    action: "Automatic email notification to Department Head",
    responseTime: "24 hours to acknowledge",
    icon: Mail,
  },
  {
    level: 2,
    title: "Second Level - District Officer",
    trigger: "No response from Level 1 within 24 hours",
    action: "SMS and email to District Officer with complaint details",
    responseTime: "12 hours to acknowledge",
    icon: Phone,
  },
  {
    level: 3,
    title: "Third Level - Collector/Commissioner",
    trigger: "No resolution within 72 hours of Level 2 escalation",
    action: "Direct escalation to District Collector/Commissioner",
    responseTime: "Priority handling required",
    icon: ArrowUp,
  },
];

const slaTimelines = [
  { category: "Water Supply", standard: "7 days", emergency: "24 hours" },
  { category: "Electricity", standard: "5 days", emergency: "12 hours" },
  { category: "Roads & Infrastructure", standard: "15 days", emergency: "48 hours" },
  { category: "Sanitation & Waste", standard: "3 days", emergency: "12 hours" },
  { category: "Public Transport", standard: "10 days", emergency: "24 hours" },
  { category: "Healthcare Services", standard: "5 days", emergency: "Immediate" },
  { category: "Law & Order", standard: "7 days", emergency: "Immediate" },
];

const EscalationRules = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Escalation Rules & SLA Guidelines
            </h1>
            <p className="text-muted-foreground">
              Understanding the automatic escalation process and service level agreements
            </p>
          </div>

          {/* Escalation Levels */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Escalation Hierarchy
            </h2>
            <div className="space-y-4">
              {escalationLevels.map((level) => (
                <div key={level.level} className="feature-card border-l-4 border-primary">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <level.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary text-primary-foreground">
                          Level {level.level}
                        </span>
                        <h3 className="font-semibold text-foreground">{level.title}</h3>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Trigger</p>
                          <p className="text-foreground">{level.trigger}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Action</p>
                          <p className="text-foreground">{level.action}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Response Time</p>
                          <p className="text-foreground">{level.responseTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SLA Timelines */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              SLA Timelines by Category
            </h2>
            <div className="feature-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left py-4 px-4 font-semibold text-foreground">Category</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">Standard Resolution</th>
                      <th className="text-left py-4 px-4 font-semibold text-foreground">Emergency Resolution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slaTimelines.map((item, index) => (
                      <tr key={item.category} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                        <td className="py-4 px-4 font-medium text-foreground">{item.category}</td>
                        <td className="py-4 px-4 text-foreground">{item.standard}</td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                            <Clock className="w-3 h-3" />
                            {item.emergency}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="mt-8 p-4 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-sm text-foreground">
              <strong>Note:</strong> Emergency timelines apply when the complaint is marked as urgent or when 
              the issue affects public safety, health, or a large number of citizens. Standard timelines 
              apply to routine complaints. All timelines are calculated from the date of complaint submission.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EscalationRules;
