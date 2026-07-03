export type EventDateFilter = "all" | "today" | "week" | "month";
export type EventSortMode = "date" | "proximity";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface EventItem {
  id: string;
  title: string;
  summary: string;
  description: string;
  startDate: string;
  endDate: string | null;
  displayDate: string;
  venueName: string;
  address: string;
  postalCode: string | null;
  city: string;
  category: string;
  eventType: string;
  theme: string | null;
  metroStation: string | null;
  coordinates: Coordinates | null;
  bookingUrl: string | null;
  bookingPhone: string | null;
  bookingEmail: string | null;
  price: string;
  childPrice: string | null;
  isFree: boolean;
  imagePreviewUrl: string | null;
  imageUrl: string | null;
}

export interface ToulouseEventRecord {
  identifiant: string;
  nom_generique: string | null;
  nom_de_la_manifestation: string | null;
  descriptif_court: string | null;
  descriptif_long: string | null;
  date_debut: string;
  date_fin: string | null;
  horaires: string | null;
  dates_affichage_horaires: string | null;
  modification_derniere_minute: string | null;
  lieu_nom: string | null;
  lieu_adresse_1: string | null;
  lieu_adresse_2: string | null;
  lieu_adresse_3: string | null;
  code_postal: number | null;
  commune: string | null;
  type_de_manifestation: string | null;
  categorie_de_la_manifestation: string | null;
  theme_de_la_manifestation: string | null;
  station_metro_tram_a_proximite: string | null;
  googlemap_latitude: number | null;
  googlemap_longitude: number | null;
  reservation_telephone: string | null;
  reservation_email: string | null;
  reservation_site_internet: string | null;
  manifestation_gratuite: string | null;
  tarif_normal: string | null;
  tarif_enfant: string | null;
  tranche_age_enfant: string | null;
  geo_point: {
    lon: number;
    lat: number;
  } | null;
}

export interface EventsResponse {
  total_count: number;
  results: ToulouseEventRecord[];
}

export interface EventsPage {
  items: EventItem[];
  totalCount: number;
  nextOffset: number | null;
}

export interface EventFilters {
  category: string;
  dateFilter: EventDateFilter;
  sortMode: EventSortMode;
  proximityEnabled: boolean;
}
