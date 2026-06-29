// Travel map data. Coordinates are [longitude, latitude].
// NOTE: These are editable placeholders — adjust the lists / memories to your
// real travel history. `status` drives the marker colour in the app.

export type PlaceStatus = "visited" | "wishlist" | "home"

export interface Place {
  id: string
  name: string
  country: string
  coordinates: [number, number]
  status: PlaceStatus
  year?: string
  memory?: string
}

export const places: Place[] = [
  // Home base
  {
    id: "phnom-penh",
    name: "Phnom Penh",
    country: "Cambodia",
    coordinates: [104.9282, 11.5564],
    status: "home",
    memory: "Home base — where I study, build, and shoot most of my photography.",
  },
  {
    id: "siem-reap",
    name: "Siem Reap",
    country: "Cambodia",
    coordinates: [103.8448, 13.3633],
    status: "visited",
    year: "2023",
    memory: "Angkor Wat at sunrise — endless inspiration for composition and light.",
  },
  {
    id: "sihanoukville",
    name: "Sihanoukville",
    country: "Cambodia",
    coordinates: [103.5234, 10.6093],
    status: "visited",
    year: "2024",
    memory: "Coastline trips and long-exposure ocean shots.",
  },

  // Visited abroad
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    coordinates: [100.5018, 13.7563],
    status: "visited",
    year: "2024",
    memory: "Street photography and the chaos of the night markets.",
  },
  {
    id: "ho-chi-minh",
    name: "Ho Chi Minh City",
    country: "Vietnam",
    coordinates: [106.6297, 10.8231],
    status: "visited",
    year: "2023",
    memory: "Coffee culture and motorbike rivers.",
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    coordinates: [103.8198, 1.3521],
    status: "visited",
    year: "2025",
    memory: "Clean lines, futuristic architecture, design everywhere.",
  },

  // Wishlist
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    coordinates: [139.6917, 35.6895],
    status: "wishlist",
    memory: "Tech, design, and neon — top of the list.",
  },
  {
    id: "seoul",
    name: "Seoul",
    country: "South Korea",
    coordinates: [126.978, 37.5665],
    status: "wishlist",
    memory: "Music, cafés, and the developer scene.",
  },
  {
    id: "san-francisco",
    name: "San Francisco",
    country: "USA",
    coordinates: [-122.4194, 37.7749],
    status: "wishlist",
    memory: "Silicon Valley — where the software I admire is built.",
  },
  {
    id: "zurich",
    name: "Zurich",
    country: "Switzerland",
    coordinates: [8.5417, 47.3769],
    status: "wishlist",
    memory: "Mountains, precision, and Swiss design heritage.",
  },
  {
    id: "reykjavik",
    name: "Reykjavik",
    country: "Iceland",
    coordinates: [-21.8174, 64.1265],
    status: "wishlist",
    memory: "Northern lights and dramatic landscape photography.",
  },
]

export const STATUS_META: Record<PlaceStatus, { label: string; color: string }> = {
  home: { label: "Home", color: "#F38020" },
  visited: { label: "Visited", color: "#228B49" },
  wishlist: { label: "Want to visit", color: "#9CA3AF" },
}

export const travelStats = {
  countriesVisited: 4,
  citiesVisited: 6,
  onWishlist: 5,
}
