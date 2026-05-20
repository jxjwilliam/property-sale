import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const MANIFEST = path.resolve(ROOT, "../rental/docs/manifest.json");
const GALLERY = path.resolve(ROOT, "src/config/gallery.ts");

function groupKey(fileName) {
  if (fileName.startsWith("phone__")) return "phone";
  if (fileName.includes("__matterport__")) return "matterport";
  if (fileName.includes("__realtor-ca__")) return "realtor";
  if (fileName.includes("__rew-ca__")) return "rew";
  if (fileName.includes("__craigslist__")) return "craigslist";
  if (fileName.includes("__linkedin__")) return "linkedin";
  return "other";
}

const GROUP_META = {
  all: { label: "All", description: "Every frame in the upload set" },
  phone: { label: "Phone", description: "Mobile captures" },
  matterport: { label: "Matterport", description: "3D tour preview" },
  realtor: { label: "Realtor.ca", description: "MLS listing photos" },
  rew: { label: "REW.ca", description: "Market listing set" },
  craigslist: { label: "Craigslist", description: "Listing photos" },
  linkedin: { label: "LinkedIn", description: "Social listing photos" },
  other: { label: "Other", description: "Additional photos" },
};

async function main() {
  const manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"));
  const files = manifest.copied.map((e) => e.relativePath);

  const buckets = { all: [...files] };
  for (const file of files) {
    const key = groupKey(file);
    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(file);
  }

  const order = ["all", "phone", "matterport", "realtor", "rew", "craigslist", "linkedin", "other"];
  const groups = order
    .filter((key) => buckets[key]?.length)
    .map((key) => ({
      key,
      label: GROUP_META[key].label,
      description: GROUP_META[key].description,
      files: buckets[key],
    }));

  const groupsBlock = groups
    .map(
      (g) => `  {
    key: ${JSON.stringify(g.key)},
    label: ${JSON.stringify(g.label)},
    description: ${JSON.stringify(g.description)},
    files: ${JSON.stringify(g.files, null, 6).replace(/\n/g, "\n    ")},
  }`,
    )
    .join(",\n");

  let source = await fs.readFile(GALLERY, "utf8");
  source = source.replace(
    /export const galleryGroups: GalleryGroup\[\] = \[[\s\S]*?\];/,
    `export const galleryGroups: GalleryGroup[] = [\n${groupsBlock}\n];`,
  );

  await fs.writeFile(GALLERY, source);
  console.log(`Updated gallery.ts with ${files.length} images in ${groups.length} groups.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
