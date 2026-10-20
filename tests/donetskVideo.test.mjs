import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { moduleLoader } from "./helpers/componentHarness.mjs";

const { donetskHeroVideo } = moduleLoader().load("app/donetsk/video.generated.ts");
const assets = [
  donetskHeroVideo.poster,
  donetskHeroVideo.mobile.webm,
  donetskHeroVideo.mobile.mp4,
  donetskHeroVideo.desktop.webm,
  donetskHeroVideo.desktop.mp4,
];

function readAsset(asset) {
  assert.match(asset.src, /^\/donetsk\/video\/generated\/[a-z0-9-]+\.(webp|webm|mp4)$/);
  return readFileSync(path.join("public", asset.src));
}

// Inspect ISO BMFF boxes directly so these tests need no FFmpeg installation.
function boxes(buffer, start = 0, end = buffer.length) {
  const result = [];
  for (let offset = start; offset < end;) {
    assert.ok(offset + 8 <= end, "truncated MP4 box header");
    let size = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    let headerSize = 8;
    if (size === 1) {
      assert.ok(offset + 16 <= end, "truncated extended MP4 box header");
      const extended = buffer.readBigUInt64BE(offset + 8);
      assert.ok(extended <= BigInt(Number.MAX_SAFE_INTEGER), "MP4 box is too large");
      size = Number(extended);
      headerSize = 16;
    } else if (size === 0) {
      size = end - offset;
    }
    assert.ok(size >= headerSize && offset + size <= end, `invalid ${type} box bounds`);
    result.push({ type, offset, body: offset + headerSize, end: offset + size });
    offset += size;
  }
  return result;
}

function requiredBox(entries, type) {
  const matches = entries.filter((entry) => entry.type === type);
  assert.equal(matches.length, 1, `expected one ${type} box`);
  return matches[0];
}

test("every published video/poster URL matches its file bytes and SHA-256 cache key", () => {
  assert.equal(new Set(assets.map(({ src }) => src)).size, 5);
  for (const asset of assets) {
    const buffer = readAsset(asset);
    assert.ok(buffer.length > 0, `${asset.src}: empty media asset`);
    assert.equal(buffer.length, asset.bytes, `${asset.src}: stale manifest size`);
    const hash = createHash("sha256").update(buffer).digest("hex").slice(0, 12);
    assert.equal(/-([a-f0-9]{12})\.(webp|webm|mp4)$/.exec(asset.src)?.[1], hash, `${asset.src}: stale immutable URL`);
  }
});

for (const name of ["mobile", "desktop"]) {
  test(`${name} MP4 is ready for progressive playback, silent, and matches its declared dimensions`, () => {
    const variant = donetskHeroVideo[name];
    const buffer = readAsset(variant.mp4);
    const topLevel = boxes(buffer);
    requiredBox(topLevel, "ftyp");
    const moov = requiredBox(topLevel, "moov");
    const mdat = requiredBox(topLevel, "mdat");
    assert.ok(moov.offset < mdat.offset, "metadata must precede media data for fast-start playback");
    const tracks = boxes(buffer, moov.body, moov.end).filter(({ type }) => type === "trak");
    assert.equal(tracks.length, 1, "generated video must contain only its visual track");
    const track = boxes(buffer, tracks[0].body, tracks[0].end);
    const mdia = requiredBox(track, "mdia");
    const handler = requiredBox(boxes(buffer, mdia.body, mdia.end), "hdlr");
    assert.ok(handler.body + 12 <= handler.end);
    assert.equal(buffer.toString("ascii", handler.body + 8, handler.body + 12), "vide", "audio must be removed from the published derivative");
    const tkhd = requiredBox(track, "tkhd");
    assert.ok(tkhd.end - tkhd.body >= 8);
    assert.equal(buffer.readUInt32BE(tkhd.end - 8) / 65536, variant.width);
    assert.equal(buffer.readUInt32BE(tkhd.end - 4) / 65536, variant.height);
  });
}
