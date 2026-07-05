interface CategoryImageRule {
  keywords: string[];
  imageUrl: string;
}

const categoryImageRules: CategoryImageRule[] = [
  {
    keywords: ["concert", "musique"],
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=60",
  },
  {
    keywords: ["theatre", "spectacle"],
    imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=60",
  },
  {
    keywords: ["festival"],
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=60",
  },
  {
    keywords: ["exposition", "visite", "musee", "galerie"],
    imageUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=60",
  },
  {
    keywords: ["sport"],
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=60",
  },
  {
    keywords: ["cinema", "film"],
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=60",
  },
];

const defaultCategoryImageUrl =
  "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=60";

export function getCategoryFallbackImageUrl(category: string): string {
  const normalizedCategory = normalizeForMatch(category);
  const matchingRule = categoryImageRules.find((rule) =>
    rule.keywords.some((keyword) => normalizedCategory.includes(keyword)),
  );

  return matchingRule?.imageUrl ?? defaultCategoryImageUrl;
}

function normalizeForMatch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
