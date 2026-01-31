import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Send } from "lucide-react";

const categories = [
  "Water Supply",
  "Electricity",
  "Roads & Infrastructure",
  "Sanitation & Waste",
  "Public Transport",
  "Healthcare Services",
  "Education",
  "Law & Order",
  "Property & Land",
  "Other",
];

const districts = [
  "District A",
  "District B",
  "District C",
  "District D",
  "District E",
];

// 🔁 ROUTING MAP (Category → Department)
const departmentMap: Record<string, string> = {
  "Water Supply": "Water Department",
  "Electricity": "Electricity Board",
  "Roads & Infrastructure": "Public Works Department",
  "Sanitation & Waste": "Municipal Corporation",
  "Public Transport": "Transport Authority",
  "Healthcare Services": "Health Department",
  "Education": "Education Department",
  "Law & Order": "Police Department",
  "Property & Land": "Revenue Department",
  "Other": "General Administration",
};

const LodgeComplaint = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    district: "",
    subject: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ⏱ SLA calculation
      const slaDays = 7;
      const slaDeadline = new Date();
      slaDeadline.setDate(slaDeadline.getDate() + slaDays);

      await addDoc(collection(db, "complaints"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        district: formData.district,
        subject: formData.subject,
        description: formData.description,

        // 🔁 Auto-routing
        assignedDepartment: departmentMap[formData.category],
        assignedOffice: `${formData.district} – ${departmentMap[formData.category]}`,

        // 📊 Governance fields
        status: "OPEN",
        slaDays,
        slaDeadline,
        escalationLevel: 0,

        createdAt: serverTimestamp(),
      });

      toast({
        title: "Complaint Submitted Successfully!",
        description: "Your complaint has been routed to the appropriate department.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        district: "",
        subject: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Lodge a Complaint
            </h1>
            <p className="text-muted-foreground">
              Submit your grievance and we’ll route it to the right department
            </p>
          </div>

          <form onSubmit={handleSubmit} className="feature-card space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Phone *</Label>
                <Input
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>District *</Label>
                <Select
                  value={formData.district}
                  onValueChange={(value) =>
                    setFormData({ ...formData, district: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Subject *</Label>
              <Input
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                rows={5}
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <Button type="submit" className="w-full">
              <Send className="mr-2 h-5 w-5" />
              Submit Complaint
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LodgeComplaint;
