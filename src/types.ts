export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  longDesc: string;
  icon: string; // Will match dynamic Lucide icons
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  phone: string;
  linkedin?: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  matter: string;
  message: string;
  date: string;
  status: "Pending" | "Reviewed" | "Contacted";
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}
