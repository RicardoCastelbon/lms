import { uuid } from "uuidv4";

export const slugilizer = (title: string) => {
  const slugify = title.replace(/\s+/g, "-").toLowerCase();

  const result = slugify
    // .replaceAll("Å", "a")
    .replaceAll("å", "a")
    // .replaceAll("Ä", "a")
    .replaceAll("ä", "a")
    // .replaceAll("Ö", "o")
    .replaceAll("ö", "o");

  const slug = `${result}-${uuid()}`;
  return slug;
};
