import { Customer, Reservation, RestaurantSettings } from './types';

export const MOCK_SETTINGS: RestaurantSettings = {
  name: "Lumière Bistro",
  description: "Experience the finest modern French fusion in a breathtaking atmosphere.",
  address: "123 Starlight Avenue, Metropolis",
  phone: "+1 (555) 012-3456",
  email: "reservations@lumiere.com",
  openingTime: "17:00",
  closingTime: "23:00",
  tables: 20,
  slotInterval: 30,
  themeColor: "violet",
  coverUrl: "https://picsum.photos/1200/400",
  logoUrl: "https://picsum.photos/200/200",
  design: {
    primaryColor: "#6366f1", // Indigo 500
    secondaryColor: "#ec4899", // Pink 500
    backgroundColor: "#020617", // Slate 950
    textColor: "#f8fafc", // Slate 50
    fontFamily: "Inter",
    heroOverlayOpacity: 0.6,
    heroAlignment: "left",
    heroHeight: "standard",
    cornerRadius: 16
  }
};

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: "Elena Fisher",
    email: "elena@example.com",
    phone: "(555) 123-4567",
    visits: 12,
    lastVisit: "2023-10-25",
    notes: "Prefers window seat. Vegan.",
    avatarColor: "bg-pink-500"
  },
  {
    id: 'c2',
    name: "Nathan Drake",
    email: "nathan@example.com",
    phone: "(555) 987-6543",
    visits: 4,
    lastVisit: "2023-10-15",
    notes: "Allergic to shellfish.",
    avatarColor: "bg-blue-500"
  },
  {
    id: 'c3',
    name: "Lara Croft",
    email: "lara@example.com",
    phone: "(555) 456-7890",
    visits: 8,
    lastVisit: "2023-10-20",
    notes: "Likes Table 5.",
    avatarColor: "bg-emerald-500"
  },
  {
    id: 'c4',
    name: "Arthur Morgan",
    email: "arthur@example.com",
    phone: "(555) 222-3333",
    visits: 2,
    lastVisit: "2023-09-01",
    notes: "",
    avatarColor: "bg-amber-600"
  }
];

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: 'r1',
    customerId: 'c1',
    customerName: "Elena Fisher",
    date: new Date().toISOString().split('T')[0], // Today
    time: "19:00",
    partySize: 2,
    tableNumber: "4",
    status: 'confirmed',
    notes: "Anniversary"
  },
  {
    id: 'r2',
    customerId: 'c2',
    customerName: "Nathan Drake",
    date: new Date().toISOString().split('T')[0], // Today
    time: "20:30",
    partySize: 4,
    tableNumber: "8",
    status: 'pending'
  },
  {
    id: 'r3',
    customerId: 'c3',
    customerName: "Lara Croft",
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    time: "18:00",
    partySize: 2,
    tableNumber: "5",
    status: 'confirmed'
  },
  {
    id: 'r4',
    customerId: 'c4',
    customerName: "Arthur Morgan",
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    time: "19:30",
    partySize: 6,
    tableNumber: "12",
    status: 'completed'
  }
];

export const TIME_SLOTS = [
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", 
  "20:00", "20:30", "21:00", "21:30", "22:00"
];