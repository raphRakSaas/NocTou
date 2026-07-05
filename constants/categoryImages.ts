interface CategoryImageRule {
  keywords: string[];
  imageUrls: string[];
}

const categoryImageRules: CategoryImageRule[] = [
  {
    keywords: ["concert", "musique"],
    imageUrls: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=60",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=60",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=60",
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=60",
    ],
  },
  {
    keywords: ["theatre", "spectacle"],
    imageUrls: [
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=60",
      "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=800&q=60",
      "https://images.unsplash.com/photo-1512427691650-1749b76b1c9d?w=800&q=60",
    ],
  },
  {
    keywords: ["festival"],
    imageUrls: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=60",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=60",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=60",
    ],
  },
  {
    keywords: ["exposition", "visite", "musee", "galerie"],
    imageUrls: [
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=60",
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=60",
      "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&q=60",
    ],
  },
  {
    keywords: ["sport"],
    imageUrls: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=60",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=60",
      "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=60",
    ],
  },
  {
    keywords: ["cinema", "film"],
    imageUrls: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=60",
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=60",
    ],
  },
  {
    keywords: ["balade", "rencontre", "conference", "atelier"],
    imageUrls: [
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=60",
      "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=800&q=60",
      "https://images.unsplash.com/photo-1508387027939-27cccde53673?w=800&q=60",
    ],
  },
];

const defaultCategoryImageUrls = [
  "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=60",
  "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=800&q=60",
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=60",
];

export function normalizeCategoryLabel(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function hashSeedToIndex(seed: string, poolSize: number): number {
  let hashValue = 0;

  for (let charIndex = 0; charIndex < seed.length; charIndex += 1) {
    hashValue = (hashValue * 31 + seed.charCodeAt(charIndex)) >>> 0;
  }

  return hashValue % poolSize;
}

export function getCategoryFallbackImageUrl(category: string, seed: string): string {
  const normalizedCategory = normalizeCategoryLabel(category);
  const matchingRule = categoryImageRules.find((rule) =>
    rule.keywords.some((keyword) => normalizedCategory.includes(keyword)),
  );
  const imagePool = matchingRule?.imageUrls ?? defaultCategoryImageUrls;

  return imagePool[hashSeedToIndex(seed, imagePool.length)];
}
