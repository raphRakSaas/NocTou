import { Ionicons } from "@expo/vector-icons";

import { normalizeCategoryLabel } from "@/constants/categoryImages";

type CategoryIconName = keyof typeof Ionicons.glyphMap;

interface CategoryIconRule {
  keywords: string[];
  icon: CategoryIconName;
}

const categoryIconRules: CategoryIconRule[] = [
  { keywords: ["cinema"], icon: "film-outline" },
  { keywords: ["exposition"], icon: "easel-outline" },
  { keywords: ["visite"], icon: "map-outline" },
  { keywords: ["balade"], icon: "walk-outline" },
  { keywords: ["opera"], icon: "mic-outline" },
  { keywords: ["concert"], icon: "musical-notes-outline" },
  { keywords: ["theatre"], icon: "ticket-outline" },
  { keywords: ["festival"], icon: "flag-outline" },
  { keywords: ["clubbing", "soiree"], icon: "moon-outline" },
  { keywords: ["foire", "salon"], icon: "storefront-outline" },
  { keywords: ["sport"], icon: "football-outline" },
  { keywords: ["rencontre"], icon: "people-outline" },
  { keywords: ["spectacle"], icon: "megaphone-outline" },
  { keywords: ["animation"], icon: "color-wand-outline" },
];

const defaultCategoryIcon: CategoryIconName = "calendar-outline";

export function getCategoryIcon(category: string): CategoryIconName {
  const normalizedCategory = normalizeCategoryLabel(category);
  const matchingRule = categoryIconRules.find((rule) =>
    rule.keywords.some((keyword) => normalizedCategory.includes(keyword)),
  );

  return matchingRule?.icon ?? defaultCategoryIcon;
}
