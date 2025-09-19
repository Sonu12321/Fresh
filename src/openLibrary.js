// Small wrapper for Open Library calls

const BASE = "https://openlibrary.org";

export async function searchBooks(query, page = 1) {
  const q = encodeURIComponent(query);
  const res = await fetch(`${BASE}/search.json?q=${q}&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch search results");
  return await res.json();
}

// Book details: key is something like "/works/OLxxxxW"
export async function fetchWorkByKey(workKey) {
  const res = await fetch(`${BASE}${workKey}.json`);
  if (!res.ok) throw new Error("Failed to fetch work details");
  return await res.json();
}
