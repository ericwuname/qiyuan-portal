import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ContentMeta {
  slug: string;
  title: string;
  category: string;
  date?: string;
  description?: string;
  cover?: string;
  featured?: boolean;
  tags?: string[];
  status?: string;
  tier?: string;
  tech?: string[];
}

export interface ContentDoc {
  meta: ContentMeta;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getContentByType(type: string): ContentDoc[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        meta: {
          slug: file.replace(/\.mdx?$/, ""),
          title: data.title || "",
          category: data.category || type,
          date: data.date,
          description: data.description,
          cover: data.cover,
          featured: data.featured,
          tags: data.tags,
          status: data.status,
          tier: data.tier,
          tech: data.tech,
        } as ContentMeta,
        content,
      };
    })
    .sort((a, b) => (b.meta.date || "").localeCompare(a.meta.date || ""));
}

export function getContentBySlug(type: string, slug: string): ContentDoc | null {
  for (const ext of [".mdx", ".md"]) {
    const filePath = path.join(CONTENT_DIR, type, slug + ext);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        meta: {
          slug,
          title: data.title || "",
          category: data.category || type,
          date: data.date,
          description: data.description,
          cover: data.cover,
          featured: data.featured,
          tags: data.tags,
          status: data.status,
          tier: data.tier,
          tech: data.tech,
        } as ContentMeta,
        content,
      };
    }
  }
  return null;
}

export function getAllSlugs(type: string): string[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getAllContent(): ContentDoc[] {
  const types = ["projects", "skills", "updates"];
  const all: ContentDoc[] = [];
  for (const t of types) {
    all.push(...getContentByType(t));
  }
  return all.sort((a, b) => (b.meta.date || "").localeCompare(a.meta.date || ""));
}