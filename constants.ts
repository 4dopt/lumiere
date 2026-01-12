import { Customer, Reservation, RestaurantSettings, Order, MenuItem } from './types';

export const MOCK_SETTINGS: RestaurantSettings = {
  name: "Lumiere",
  description: "Experience the finest modern French fusion.",
  address: "123 Starlight Avenue, Metropolis",
  phone: "+1 (555) 012-3456",
  email: "reservations@lumiere.com",
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

export const MOCK_MENU: MenuItem[] = [
  {
    id: 'm1',
    name: "Avocado Toast",
    description: "Sourdough bread, smashed avocado, poached egg, chili flakes.",
    price: 16.00,
    category: "Starters",
    imageUrl: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?auto=format&fit=crop&q=80&w=800",
    available: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'm2',
    name: "Smoked Salmon Bagel",
    description: "Cream cheese, capers, red onion, dill, lemon zest.",
    price: 20.00,
    category: "Starters",
    imageUrl: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800",
    available: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 'm3',
    name: "Truffle Mushroom Pasta",
    description: "Homemade tagliatelle, wild mushrooms, truffle oil, parmesan.",
    price: 24.50,
    category: "Mains",
    imageUrl: "https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&q=80&w=800",
    available: true,
    rating: 4.7,
    reviews: 210
  },
  {
    id: 'm4',
    name: "Wagyu Beef Burger",
    description: "Brioche bun, cheddar, caramelized onion, special sauce, fries.",
    price: 28.00,
    category: "Mains",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    available: true,
    rating: 4.9,
    reviews: 342
  },
  {
    id: 'm5',
    name: "Belgian Waffles",
    description: "Fresh berries, whipped cream, maple syrup, mint.",
    price: 18.50,
    category: "Desserts",
    imageUrl: "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&q=80&w=800",
    available: false,
    rating: 4.6,
    reviews: 56
  },
  {
    id: 'm6',
    name: "Orange Fresh",
    description: "Freshly squeezed oranges, ice.",
    price: 8.50,
    category: "Drinks",
    imageUrl: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800",
    available: true,
    rating: 4.8,
    reviews: 45
  }
];

export const MOCK_ORDERS: Order[] = [
  { 
    id: '#12345', 
    customerName: 'Esther Howard',
    tableNumber: 'A-1',
    date: 'Fri, Sep 27, 2024', 
    time: '17:45 PM', 
    server: 'Mark Davis', 
    amount: 171.50, 
    paymentStatus: 'Unpaid', 
    type: 'Dine-in', 
    status: 'In progress',
    items: [
      { name: 'Scrambled egg toast', quantity: 1, price: 16.00 },
      { name: 'Smoked salmon bagel', quantity: 1, price: 20.00 },
      { name: 'Belgian waffles', quantity: 1, price: 18.50 },
      { name: 'Orange fresh', quantity: 2, price: 24.50 },
    ]
  },
  { 
    id: '#12346', 
    customerName: 'Wade Warren',
    tableNumber: 'A-2',
    date: 'Fri, Sep 27, 2024', 
    time: '17:35 PM', 
    server: 'Sarah Smith', 
    amount: 79.00, 
    paymentStatus: 'Unpaid', 
    type: 'Dine-in', 
    status: 'In progress',
     items: [
      { name: 'Scrambled egg toast', quantity: 1, price: 16.00 },
      { name: 'Smoked salmon bagel', quantity: 1, price: 20.00 },
      { name: 'Belgian waffles', quantity: 1, price: 18.50 },
      { name: 'Orange fresh', quantity: 2, price: 24.50 },
    ]
  },
  { 
    id: '#12347', 
    customerName: 'Esther Howard',
    tableNumber: 'A-3',
    date: 'Fri, Sep 27, 2024', 
    time: '17:25 PM', 
    server: 'John Doe', 
    amount: 79.00, 
    paymentStatus: 'Unpaid', 
    type: 'Dine-in', 
    status: 'In progress',
     items: [
      { name: 'Scrambled egg toast', quantity: 1, price: 16.00 },
      { name: 'Smoked salmon bagel', quantity: 1, price: 20.00 },
      { name: 'Belgian waffles', quantity: 1, price: 18.50 },
      { name: 'Orange fresh', quantity: 2, price: 24.50 },
    ]
  },
  { 
    id: '#12348', 
    customerName: 'Jenny Wilson',
    tableNumber: 'A-4',
    date: 'Fri, Sep 27, 2024', 
    time: '17:15 PM', 
    server: 'Emily Chen', 
    amount: 79.00, 
    paymentStatus: 'Paid', 
    type: 'Dine-in', 
    status: 'Completed',
     items: [
      { name: 'Scrambled egg toast', quantity: 1, price: 16.00 },
      { name: 'Smoked salmon bagel', quantity: 1, price: 20.00 },
      { name: 'Belgian waffles', quantity: 1, price: 18.50 },
      { name: 'Orange fresh', quantity: 2, price: 24.50 },
    ]
  },
  { 
    id: '#12349', 
    customerName: 'Esther Howard',
    tableNumber: 'A-5',
    date: 'Fri, Sep 27, 2024', 
    time: '17:00 PM', 
    server: 'Mark Davis', 
    amount: 79.00, 
    paymentStatus: 'Unpaid', 
    type: 'Dine-in', 
    status: 'In progress',
     items: [
      { name: 'Scrambled egg toast', quantity: 1, price: 16.00 },
      { name: 'Smoked salmon bagel', quantity: 1, price: 20.00 },
      { name: 'Belgian waffles', quantity: 1, price: 18.50 },
      { name: 'Orange fresh', quantity: 2, price: 24.50 },
    ]
  },
    { 
    id: '#12350', 
    customerName: 'Robert Fox',
    tableNumber: 'A-1',
    date: 'Fri, Sep 27, 2024', 
    time: '16:45 PM', 
    server: 'Mark Davis', 
    amount: 79.00, 
    paymentStatus: 'Paid', 
    type: 'Dine-in', 
    status: 'Completed',
     items: [
      { name: 'Scrambled egg toast', quantity: 1, price: 16.00 },
      { name: 'Smoked salmon bagel', quantity: 1, price: 20.00 },
      { name: 'Belgian waffles', quantity: 1, price: 18.50 },
      { name: 'Orange fresh', quantity: 2, price: 24.50 },
    ]
  },
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