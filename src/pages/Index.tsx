import { FileText, Search, LayoutDashboard, ClipboardList, Clock, AlertTriangle, Eye, BarChart3, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const steps = [
  {
    number: 1,
    icon: FileText,
    title: "Submit Complaint",
    description: "Citizen fills form with category and issue details",
  },
  {
    number: 2,
    icon: ClipboardList,
    title: "Smart Routing Engine",
    description: "System assigns complaint to correct department",
  },
  {
    number: 3,
    icon: Clock,
    title: "SLA Timer Activated",
    description: "Resolution deadline is automatically tracked",
  },
  {
    number: 4,
    icon: AlertTriangle,
    title: "Escalation if Delayed",
    description: "Higher authority notified if SLA breached",
  },
];

const features = [
  {
    icon: Eye,
    title: "Transparent Complaint Tracking",
    description: "Citizens can track their complaint status in real-time with full visibility into department actions.",
  },
  {
    icon: BarChart3,
    title: "Department Performance Monitoring",
    description: "Public dashboards display resolution rates, response times, and efficiency metrics.",
  },
  {
    icon: Bell,
    title: "Automatic Escalation System",
    description: "SLA breaches trigger automatic escalation to higher authorities ensuring accountability.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground/80 text-sm font-medium mb-4 animate-fade-in">
            Prototype for Governance Innovation
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Smart Citizen Grievance Portal
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 font-medium mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Automated Complaint Routing with SLA Accountability
          </p>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            This system ensures every citizen complaint is automatically routed to the correct department and resolved within defined time limits.
          </p>
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="lg" asChild>
              <Link to="/lodge">
                <FileText className="w-5 h-5" />
                Lodge Complaint
              </Link>
            </Button>
            <Button variant="heroAccent" size="lg" asChild>
              <Link to="/track">
                <Search className="w-5 h-5" />
                Track Complaint
              </Link>
            </Button>
            <Button variant="heroPrimary" size="lg" asChild>
              <Link to="/dashboard">
                <LayoutDashboard className="w-5 h-5" />
                View SLA Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              How the System Works
            </h2>
            <p className="text-muted-foreground">
              A streamlined 4-step process from complaint submission to resolution
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="feature-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="step-badge">{step.number}</span>
                  <step.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accountability Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Ensuring Accountability in Public Services
            </h2>
            <p className="text-muted-foreground">
              Built-in mechanisms for transparency, monitoring, and timely escalation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="feature-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
