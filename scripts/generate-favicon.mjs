import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const imagesDir = path.join(publicDir, 'images');

// Pack multiple PNG buffers into a standard multi-resolution ICO file
export function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = ICO
  header.writeUInt16LE(count, 4); // number of images

  let offset = 6 + count * 16;
  const directoryEntries = [];
  const imagePayloads = [];

  for (const { width, height, buffer } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width === 256 ? 0 : width, 0);
    entry.writeUInt8(height === 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data

    directoryEntries.push(entry);
    imagePayloads.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...directoryEntries, ...imagePayloads]);
}

async function main() {
  const scratchDir = 'C:/Users/HP USER/.gemini/antigravity/brain/65b47c02-e396-45e3-ad10-d3865e1d39f0/scratch';

  const sizes = [
    { width: 256, height: 256, file: 'crisp_leaf_256.png' },
    { width: 128, height: 128, file: 'crisp_leaf_128.png' },
    { width: 64, height: 64, file: 'crisp_leaf_64.png' },
    { width: 48, height: 48, file: 'crisp_leaf_48.png' },
    { width: 32, height: 32, file: 'crisp_leaf_32.png' },
    { width: 16, height: 16, file: 'crisp_leaf_16.png' },
  ];

  const images = sizes.map(({ width, height, file }) => ({
    width,
    height,
    buffer: fs.readFileSync(path.join(scratchDir, file)),
  }));

  const icoBuffer = buildIco(images);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Successfully generated multi-resolution public/favicon.ico with 256, 128, 64, 48, 32, 16 sizes!');

  // Copy crisp 512 master to public/images/logo.png
  const master512 = fs.readFileSync(path.join(scratchDir, 'crisp_leaf_512.png'));
  fs.writeFileSync(path.join(imagesDir, 'logo.png'), master512);
  console.log('✓ Successfully wrote public/images/logo.png!');

  // Write vector favicon.svg for modern browsers
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <path fill="#5F9535" fill-rule="evenodd" d="
    M 78 444
    C 42 340 38 230 148 132
    C 215 72 320 36 448 40
    C 456 160 412 284 316 364
    C 236 430 140 452 78 444 Z
    M 104 422
    C 142 334 220 236 362 162
    C 340 182 246 268 184 380
    C 162 420 126 438 104 422 Z
  "/>
</svg>
`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
  console.log('✓ Successfully wrote public/favicon.svg!');
}

main().catch(console.error);
