import { Fact } from "./factClient"

export function createFactSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export function buildFactUrl(fact: Fact): string {
  const slug = createFactSlug(fact.body)
  return `/facts/${fact.id}/${slug}`
}
