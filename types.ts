export type ReservationStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  visits: number;
  lastVisit: string; // ISO Date string
  notes: string;
  avatarColor?: string;
}

export interface Reservation {
  id: string;
  customerId: string;
  customerName: string; // Denormalized for easier display
  date: string; // ISO Date string (YYYY-MM-DD)
  time: string; // HH:mm
  partySize: number;
  tableNumber?: string;
  status: ReservationStatus;
  notes?: string;
}

export interface Order {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm AM/PM
  server: string;
  amount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Unpaid';
  type: 'Dine-in' | 'Takeaway' | 'Delivery' | 'Online';
  status: 'Completed' | 'Cooking' | 'Ready' | 'Cancelled';
}

export interface DesignSettings {
  primaryColor: string;
  secondaryColor: string; // Used for gradients or accents
  backgroundColor: string;
  textColor: string;
  fontFamily: 'Inter' | 'Playfair Display' | 'Lato' | 'Montserrat';
  heroOverlayOpacity: number;
  heroAlignment: 'left' | 'center';
  heroHeight: 'compact' | 'standard' | 'large';
  cornerRadius: number;
}

export interface RestaurantSettings {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  openingTime: string;
  closingTime: string;
  tables: number;
  slotInterval: number; // minutes
  logoUrl?: string;
  coverUrl?: string;
  themeColor: string;
  design: DesignSettings;
}

export interface Stats {
  todayReservations: number;
  upcomingReservations: number;
  weeklyCustomers: number;
  utilizationRate: number;
}