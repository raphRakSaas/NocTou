import { create } from "axios";

import { EVENTS_PAGE_SIZE } from "@/constants/query";
import type { EventItem, EventsPage, EventsResponse, ToulouseEventRecord } from "@/types/event";
import { formatEventDateLabel } from "@/utils/events";

const toulouseApiClient = create({
  baseURL:
    "https://data.toulouse-metropole.fr/api/explore/v2.1/catalog/datasets/agenda-des-manifestations-culturelles-so-toulouse/records",
  timeout: 15000,
});

export async function fetchEvents(offset = 0, limit = EVENTS_PAGE_SIZE): Promise<EventsPage> {
  const response = await toulouseApiClient.get<EventsResponse>("", {
    params: {
      limit,
      offset,
      order_by: "date_debut",
    },
  });

  const items = response.data.results.map(mapRecordToEventItem);
  const nextOffset = offset + limit < response.data.total_count ? offset + limit : null;

  return {
    items,
    totalCount: response.data.total_count,
    nextOffset,
  };
}

export async function fetchEventById(eventId: string): Promise<EventItem> {
  const response = await toulouseApiClient.get<EventsResponse>("", {
    params: {
      limit: 1,
      where: `identifiant="${eventId}"`,
    },
  });

  const selectedRecord = response.data.results[0];

  if (!selectedRecord) {
    throw new Error("Evenement introuvable.");
  }

  return mapRecordToEventItem(selectedRecord);
}

function mapRecordToEventItem(record: ToulouseEventRecord): EventItem {
  const latitude = record.geo_point?.lat ?? record.googlemap_latitude;
  const longitude = record.geo_point?.lon ?? record.googlemap_longitude;
  const description = record.descriptif_long ?? record.descriptif_court ?? "Aucune description disponible.";
  const price = record.manifestation_gratuite ? "Gratuit" : record.tarif_normal ?? "Tarif non communique";

  return {
    id: record.identifiant,
    title: record.nom_de_la_manifestation ?? record.nom_generique ?? "Sortie culturelle",
    summary: record.descriptif_court ?? description,
    description,
    startDate: record.date_debut,
    endDate: record.date_fin,
    displayDate: formatEventDateLabel(record.date_debut, record.dates_affichage_horaires ?? ""),
    venueName: record.lieu_nom ?? "Lieu a confirmer",
    address: buildAddress(record),
    postalCode: record.code_postal ? String(record.code_postal) : null,
    city: record.commune ?? "Toulouse",
    category: record.categorie_de_la_manifestation ?? "Autres sorties",
    eventType: record.type_de_manifestation ?? "Culturelle",
    theme: record.theme_de_la_manifestation,
    metroStation: record.station_metro_tram_a_proximite,
    coordinates: latitude != null && longitude != null ? { latitude, longitude } : null,
    bookingUrl: normalizeUrl(record.reservation_site_internet),
    bookingPhone: record.reservation_telephone,
    bookingEmail: record.reservation_email,
    price,
    childPrice: record.tarif_enfant,
    isFree: price.toLowerCase().includes("gratuit"),
    imagePreviewUrl: null,
    imageUrl: null,
  };
}

function buildAddress(record: ToulouseEventRecord): string {
  const addressParts = [
    record.lieu_adresse_1,
    record.lieu_adresse_2,
    record.lieu_adresse_3,
    record.code_postal ? String(record.code_postal) : null,
    record.commune,
  ].filter(Boolean);

  return addressParts.join(", ") || "Adresse non communiquee";
}

function normalizeUrl(urlValue: string | null): string | null {
  if (!urlValue) {
    return null;
  }

  if (urlValue.startsWith("http://") || urlValue.startsWith("https://")) {
    return urlValue;
  }

  return `https://${urlValue}`;
}
