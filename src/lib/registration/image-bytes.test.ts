import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  inferImageMime,
  isPlausibleImageBuffer,
  MIN_IMAGE_BYTES,
  parseImageDataUrl,
} from "./image-bytes";
import { toTelHref } from "../utils";
import { validateDocuments } from "./validation";

const ONE_BY_ONE_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

const JPEG_HEADER = Buffer.from([0xff, 0xd8, 0xff, 0xe0, ...Array(600).fill(0)]);

describe("image upload guards", () => {
  it("rejects the empty 1x1 PNG files that were being stored", () => {
    assert.ok(ONE_BY_ONE_PNG.length < MIN_IMAGE_BYTES);
    assert.equal(isPlausibleImageBuffer(ONE_BY_ONE_PNG), false);
    assert.equal(
      parseImageDataUrl(`data:image/png;base64,${ONE_BY_ONE_PNG.toString("base64")}`),
      null,
    );
  });

  it("accepts a buffer that looks like a real JPEG", () => {
    assert.equal(isPlausibleImageBuffer(JPEG_HEADER), true);
  });

  it("infers mime types when mobile browsers omit file.type", () => {
    assert.equal(inferImageMime("photo.PNG", ""), "image/png");
    assert.equal(inferImageMime("scan.jpg", ""), "image/jpeg");
    assert.equal(inferImageMime("sign.webp", "image/webp"), "image/webp");
  });

  it("blocks documents that are missing or too small", () => {
    const errors = validateDocuments(
      { dataUrl: "data:image/png;base64,aaa", name: "p.png", mime: "image/png", size: 70 },
      null,
    );
    assert.ok(errors.photograph);
    assert.ok(errors.signature);
  });
});

describe("phone dial links", () => {
  it("builds a tel: link phones can open", () => {
    assert.equal(toTelHref("+91 9639263202"), "tel:+919639263202");
    assert.equal(toTelHref("+91 7579004581"), "tel:+917579004581");
  });
});
