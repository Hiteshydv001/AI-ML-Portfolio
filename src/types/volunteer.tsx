export interface SocietyMembership {
  name: string;
  memberSince: string;
  role?: string;
  activities: string[];
  achievements?: string[];
  logo?: string;
  website?: string;
  certificate?: string;
  slug?: string;
  content?: string;
}

export interface VolunteerWork {
  organization: string;
  role?: string;
  duration: string;
  location: string;
  description: string[];
  impact: string[];
  skills: string[];
  logo?: string;
  website?: string;
  certificate?: string;
  slug: string;
  content?: string;
  thumbnail?: string;
} 