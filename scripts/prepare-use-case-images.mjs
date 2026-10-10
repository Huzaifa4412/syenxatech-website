import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const root = process.cwd();
const manifestPath = path.join(root, "docs/use-cases/image-manifest-v1.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const destination = path.join(root, "public/images/use-cases");
await fs.mkdir(destination, { recursive: true });

for (const asset of manifest.assets) {
    const output = path.join(destination, `${asset.slug}-v1.webp`);
    await sharp(asset.source)
        .resize({ width: 1200, height: 800, fit: "cover", position: "centre", withoutEnlargement: true })
        .webp({ quality: 83, effort: 5 })
        .toFile(output);
    const file = await fs.readFile(output);
    const metadata = await sharp(file).metadata();
    Object.assign(asset, {
        image: `/images/use-cases/${asset.slug}-v1.webp`,
        width: metadata.width,
        height: metadata.height,
        bytes: file.length,
        sha256: crypto.createHash("sha256").update(file).digest("hex"),
    });
}

await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
const source = `// Generated conceptual imagery. Exact prompts and provenance: docs/use-cases/image-manifest-v1.json\nexport const useCaseImages = ${JSON.stringify(Object.fromEntries(manifest.assets.map(asset => [asset.slug, { image: asset.image, alt: asset.alt }])), null, 4)};\n`;
await fs.writeFile(path.join(root, "src/lib/use-case-images.js"), source);
console.log(JSON.stringify({ images: manifest.assets.length, uniqueHashes: new Set(manifest.assets.map(asset => asset.sha256)).size, totalBytes: manifest.assets.reduce((sum, asset) => sum + asset.bytes, 0) }, null, 2));
