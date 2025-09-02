// lib/slug.ts
export function slugify(text?: string | null) {
    if (!text) return "";
    return String(text)
        .toLowerCase()
        .normalize("NFKD") // better handling for accents
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}
