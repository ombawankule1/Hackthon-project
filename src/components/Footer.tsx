import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-medium text-foreground">Smart Grievance Portal</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            System Note: This system uses keyword detection, category selection, and location mapping 
            to auto-route complaints to the correct department and track resolution within SLA timelines.
          </p>
        </div>
      </div>
    </footer>
  );
};
