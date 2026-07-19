import type { FieldConfig } from "@/components/admin/auto-form";

export interface ResourceConfig {
  /** Prisma client delegate name, e.g. prisma.committeeMember */
  model: "committeeMember" | "newsPost" | "eventPost" | "activity" | "sponsor" | "galleryImage";
  fields: FieldConfig[];
  /** Convert raw string form values into the correctly-typed Prisma payload */
  parse: (values: Record<string, unknown>) => Record<string, unknown>;
  defaultOrderBy: Record<string, "asc" | "desc">;
}

const str = (v: unknown) => (v == null ? "" : String(v));
const int = (v: unknown) => (v === "" || v == null ? null : Number(v));
const bool = (v: unknown) => Boolean(v);
const date = (v: unknown) => (v ? new Date(String(v)) : null);

export const resourceConfigs: Record<string, ResourceConfig> = {
  committee: {
    model: "committeeMember",
    defaultOrderBy: { displayOrder: "asc" },
    fields: [
      { key: "name", label: "Name (English)", type: "text", required: true },
      { key: "nameBn", label: "Name (বাংলা)", type: "text", required: true },
      { key: "designation", label: "Designation (English)", type: "text", required: true },
      { key: "designationBn", label: "Designation (বাংলা)", type: "text", required: true },
      { key: "photo", label: "Photo", type: "image" },
      { key: "bio", label: "Bio (English)", type: "textarea" },
      { key: "bioBn", label: "Bio (বাংলা)", type: "textarea" },
      { key: "displayOrder", label: "Display order", type: "number" },
      { key: "isActive", label: "Active", type: "checkbox" },
    ],
    parse: (v) => ({
      name: str(v.name),
      nameBn: str(v.nameBn),
      designation: str(v.designation),
      designationBn: str(v.designationBn),
      photo: v.photo ? str(v.photo) : null,
      bio: v.bio ? str(v.bio) : null,
      bioBn: v.bioBn ? str(v.bioBn) : null,
      displayOrder: int(v.displayOrder) ?? 0,
      isActive: v.isActive === undefined ? true : bool(v.isActive),
    }),
  },

  news: {
    model: "newsPost",
    defaultOrderBy: { createdAt: "desc" },
    fields: [
      { key: "title", label: "Title (English)", type: "text", required: true },
      { key: "titleBn", label: "Title (বাংলা)", type: "text", required: true },
      { key: "slug", label: "Slug (url-friendly)", type: "text", required: true },
      { key: "excerpt", label: "Excerpt (English)", type: "textarea", required: true },
      { key: "excerptBn", label: "Excerpt (বাংলা)", type: "textarea", required: true },
      { key: "content", label: "Content (English)", type: "textarea", required: true },
      { key: "contentBn", label: "Content (বাংলা)", type: "textarea", required: true },
      { key: "coverImage", label: "Cover image", type: "image" },
      { key: "authorName", label: "Author", type: "text" },
      { key: "isPublished", label: "Published", type: "checkbox" },
    ],
    parse: (v) => ({
      title: str(v.title),
      titleBn: str(v.titleBn),
      slug: str(v.slug)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      excerpt: str(v.excerpt),
      excerptBn: str(v.excerptBn),
      content: str(v.content),
      contentBn: str(v.contentBn),
      coverImage: v.coverImage ? str(v.coverImage) : null,
      authorName: v.authorName ? str(v.authorName) : null,
      isPublished: bool(v.isPublished),
      publishedAt: bool(v.isPublished) ? new Date() : null,
    }),
  },

  events: {
    model: "eventPost",
    defaultOrderBy: { startDate: "desc" },
    fields: [
      { key: "title", label: "Title (English)", type: "text", required: true },
      { key: "titleBn", label: "Title (বাংলা)", type: "text", required: true },
      { key: "slug", label: "Slug (url-friendly)", type: "text", required: true },
      { key: "description", label: "Description (English)", type: "textarea", required: true },
      { key: "descriptionBn", label: "Description (বাংলা)", type: "textarea", required: true },
      { key: "coverImage", label: "Cover image", type: "image" },
      { key: "location", label: "Location (English)", type: "text" },
      { key: "locationBn", label: "Location (বাংলা)", type: "text" },
      { key: "startDate", label: "Start date", type: "date", required: true },
      { key: "endDate", label: "End date", type: "date" },
      {
        key: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "UPCOMING", label: "Upcoming" },
          { value: "ONGOING", label: "Ongoing" },
          { value: "PAST", label: "Past" },
        ],
      },
      { key: "isFeatured", label: "Featured", type: "checkbox" },
    ],
    parse: (v) => ({
      title: str(v.title),
      titleBn: str(v.titleBn),
      slug: str(v.slug)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      description: str(v.description),
      descriptionBn: str(v.descriptionBn),
      coverImage: v.coverImage ? str(v.coverImage) : null,
      location: v.location ? str(v.location) : null,
      locationBn: v.locationBn ? str(v.locationBn) : null,
      startDate: date(v.startDate) ?? new Date(),
      endDate: date(v.endDate),
      status: v.status ? str(v.status) : "UPCOMING",
      isFeatured: bool(v.isFeatured),
    }),
  },

  activities: {
    model: "activity",
    defaultOrderBy: { displayOrder: "asc" },
    fields: [
      { key: "title", label: "Title (English)", type: "text", required: true },
      { key: "titleBn", label: "Title (বাংলা)", type: "text", required: true },
      { key: "description", label: "Description (English)", type: "textarea", required: true },
      { key: "descriptionBn", label: "Description (বাংলা)", type: "textarea", required: true },
      { key: "icon", label: "Icon (lucide name, e.g. trophy)", type: "text" },
      { key: "image", label: "Image", type: "image" },
      { key: "displayOrder", label: "Display order", type: "number" },
      { key: "isActive", label: "Active", type: "checkbox" },
    ],
    parse: (v) => ({
      title: str(v.title),
      titleBn: str(v.titleBn),
      description: str(v.description),
      descriptionBn: str(v.descriptionBn),
      icon: v.icon ? str(v.icon) : null,
      image: v.image ? str(v.image) : null,
      displayOrder: int(v.displayOrder) ?? 0,
      isActive: v.isActive === undefined ? true : bool(v.isActive),
    }),
  },

  sponsors: {
    model: "sponsor",
    defaultOrderBy: { displayOrder: "asc" },
    fields: [
      { key: "name", label: "Sponsor name", type: "text", required: true },
      { key: "logo", label: "Logo", type: "image", required: true },
      { key: "website", label: "Website URL", type: "text" },
      {
        key: "tier",
        label: "Tier",
        type: "select",
        required: true,
        options: [
          { value: "TITLE", label: "Title" },
          { value: "GOLD", label: "Gold" },
          { value: "SILVER", label: "Silver" },
          { value: "PARTNER", label: "Partner" },
        ],
      },
      { key: "displayOrder", label: "Display order", type: "number" },
      { key: "isActive", label: "Active", type: "checkbox" },
    ],
    parse: (v) => ({
      name: str(v.name),
      logo: str(v.logo),
      website: v.website ? str(v.website) : null,
      tier: str(v.tier) || "PARTNER",
      displayOrder: int(v.displayOrder) ?? 0,
      isActive: v.isActive === undefined ? true : bool(v.isActive),
    }),
  },
  gallery: {
    model: "galleryImage",
    defaultOrderBy: { displayOrder: "asc" },
    fields: [
      { key: "imageUrl", label: "Image", type: "image", required: true },
      { key: "title", label: "Title (English)", type: "text" },
      { key: "titleBn", label: "Title (বাংলা)", type: "text" },
      { key: "category", label: "Category", type: "text" },
      { key: "displayOrder", label: "Display order", type: "number" },
    ],
    parse: (v) => ({
      imageUrl: str(v.imageUrl),
      title: v.title ? str(v.title) : null,
      titleBn: v.titleBn ? str(v.titleBn) : null,
      category: v.category ? str(v.category) : null,
      displayOrder: int(v.displayOrder) ?? 0,
    }),
  },
};
