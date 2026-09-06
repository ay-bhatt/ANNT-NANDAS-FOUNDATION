import "server-only";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import type { CommunityComment } from "@/lib/types";

const COMMENTS_DIR = path.join(process.cwd(), ".comments");
const COMMENTS_FILE = path.join(COMMENTS_DIR, "comments.json");
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

let memoryComments: CommunityComment[] = [];

function readFromDisk(): CommunityComment[] {
  try {
    if (!fs.existsSync(COMMENTS_FILE)) return [];
    const parsed = JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf8")) as CommunityComment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeToDisk(comments: CommunityComment[]) {
  try {
    if (!fs.existsSync(COMMENTS_DIR)) {
      fs.mkdirSync(COMMENTS_DIR, { recursive: true });
    }
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
  } catch (error) {
    console.warn("[comments] Unable to persist comments to disk:", error);
  }
}

function loadComments(): CommunityComment[] {
  const fromDisk = readFromDisk();
  if (fromDisk.length > 0) {
    memoryComments = fromDisk;
    return fromDisk;
  }
  return memoryComments;
}

export function getComments(): CommunityComment[] {
  return [...loadComments()].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function isValidRating(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5;
}

export function addComment(input: {
  name: string;
  content: string;
  rating: number;
}): { comment?: CommunityComment; error?: string } {
  const name = input.name.trim();
  const content = input.content.trim();
  const rating = input.rating;

  if (name.length < 2 || name.length > 80) {
    return { error: "Please enter a valid name." };
  }

  if (content.length < 10 || content.length > 1000) {
    return { error: "Please enter a comment between 10 and 1000 characters." };
  }

  if (!isValidRating(rating)) {
    return { error: "Please choose a rating between 1 and 5 stars." };
  }

  const existing = loadComments();
  const now = Date.now();
  const duplicate = existing.some(
    (item) =>
      item.name.toLowerCase() === name.toLowerCase() &&
      item.content === content &&
      item.rating === rating &&
      now - Date.parse(item.createdAt) < DUPLICATE_WINDOW_MS,
  );

  if (duplicate) {
    return { error: "This comment was already submitted. Please wait before sending it again." };
  }

  const comment: CommunityComment = {
    id: randomUUID(),
    name,
    content,
    rating,
    createdAt: new Date().toISOString(),
  };

  const next = [comment, ...existing];
  memoryComments = next;
  writeToDisk(next);
  return { comment };
}
