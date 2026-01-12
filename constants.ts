import { Customer, Reservation, RestaurantSettings, Order } from './types';

export const MOCK_SETTINGS: RestaurantSettings = {
  name: "Malinessa",
  description: "Experience the finest modern French fusion.",
  address: "123 Starlight Avenue, Metropolis",
  phone: "+1 (555) 012-3456",
  email: "reservations@malinessa.com",
  openingTime: "17:00",
  closingTime: "23:00",
  tables: 34,
  slotInterval: 30,
  themeColor: "emerald",
  coverUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
  logoUrl: "https://picsum.photos/200/200",
  design: {
    primaryColor: "#10b981", // Emerald 500
    secondaryColor: "#34d399", // Emerald 400
    backgroundColor: "#ffffff",
    textColor: "#1f2937", // Gray 800
    fontFamily: "Inter",
    heroOverlayOpacity: 0.4,
    heroAlignment: "center",
    heroHeight: "standard",
    cornerRadius: 8
  }
};

export const MOCK_ORDERS: Order[] = [
  { id: '#12345', date: 'Sep 10, 2024', time: '14:45 PM', server: 'Mark Davis', amount: 85.50, paymentStatus: 'Paid', type: 'Delivery', status: 'Completed' },
  { id: '#12346', date: 'Sep 10, 2024', time: '15:00 PM', server: 'Sarah Smith', amount: 120.00, paymentStatus: 'Paid', type: 'Dine-in', status: 'Cooking' },
  { id: '#12347', date: 'Sep 10, 2024', time: '15:15 PM', server: 'John Doe', amount: 45.20, paymentStatus: 'Pending', type: 'Online', status: 'Ready' },
  { id: '#12348', date: 'Sep 10, 2024', time: '15:30 PM', server: 'Emily Chen', amount: 60.00, paymentStatus: 'Unpaid', type: 'Takeaway', status: 'Completed' },
  { id: '#12349', date: 'Sep 10, 2024', time: '15:45 PM', server: 'Mark Davis', amount: 95.50, paymentStatus: 'Paid', type: 'Dine-in', status: 'Completed' },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: "Jacob Jones",
    email: "jacob@example.com",
    phone: "(555) 123-4567",
    visits: 12,
    lastVisit: "2023-10-25",
    notes: "Prefers window seat.",
    avatarColor: "bg-emerald-100 text-emerald-600"
  },
  {
    id: 'c2',
    name: "Arlene McCoy",
    email: "arlene@example.com",
    phone: "(555) 987-6543",
    visits: 4,
    lastVisit: "2023-10-15",
    notes: "Allergic to nuts.",
    avatarColor: "bg-blue-100 text-blue-600"
  },
  {
    id: 'c3',
    name: "Esther Howard",
    email: "esther@example.com",
    phone: "(555) 456-7890",
    visits: 8,
    lastVisit: "2023-10-20",
    notes: "Likes Table 5.",
    avatarColor: "bg-orange-100 text-orange-600"
  },
  {
    id: 'c4',
    name: "Cameron Williamson",
    email: "cameron@example.com",
    phone: "(555) 222-3333",
    visits: 2,
    lastVisit: "2023-09-01",
    notes: "",
    avatarColor: "bg-purple-100 text-purple-600"
  }
];

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: 'r1',
    customerId: 'c1',
    customerName: "Jacob Jones",
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
    customerName: "Arlene McCoy",
    date: new Date().toISOString().split('T')[0], // Today
    time: "20:30",
    partySize: 4,
    tableNumber: "8",
    status: 'pending'
  },
  {
    id: 'r3',
    customerId: 'c3',
    customerName: "Esther Howard",
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    time: "18:00",
    partySize: 2,
    tableNumber: "5",
    status: 'confirmed'
  },
  {
    id: 'r4',
    customerId: 'c4',
    customerName: "Cameron Williamson",
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