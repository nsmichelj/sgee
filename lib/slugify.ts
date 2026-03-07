export function slugify(input: string, force: boolean = false) {
  let slug = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  if (force) {
    slug += `-${Math.random().toString(36).substring(2, 9)}`;
  }

  return slug;
}
