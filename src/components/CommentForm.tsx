"use client";

import { useState, type FormEvent } from "react";
import StarRating from "@/components/StarRating";
import type { CommunityComment } from "@/lib/types";

interface CommentFormProps {
  onSubmitted?: (comment: CommunityComment) => void;
}

export default function CommentForm({ onSubmitted }: CommentFormProps) {
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      setStatus("error");
      setErrorMessage("Please select a rating from 1 to 5 stars.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      content: String(formData.get("content") ?? ""),
      rating,
    };

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        comment?: CommunityComment;
      };

      if (result.success && result.comment) {
        form.reset();
        setRating(0);
        setStatus("success");
        onSubmitted?.(result.comment);
        return;
      }

      setStatus("error");
      setErrorMessage(result.message || "Unable to submit your comment.");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <h3 className="mb-2 text-lg font-semibold text-emerald-800">Thank you</h3>
        <p className="text-emerald-700">Your comment and rating have been shared.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-emerald-700 hover:underline"
        >
          Write another comment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label htmlFor="comment-name" className="mb-2 block text-sm font-medium text-slate-800">
          Your name
        </label>
        <input
          id="comment-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={80}
          placeholder="Your name"
          disabled={status === "loading"}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div>
        <p id="comment-rating-label" className="mb-2 text-sm font-medium text-slate-800">
          Your rating
        </p>
        <StarRating value={rating} onChange={setRating} disabled={status === "loading"} />
        <p className="mt-2 text-xs text-slate-500">
          {rating ? `${rating} of 5 stars selected` : "Select 1 to 5 stars"}
        </p>
      </div>

      <div>
        <label htmlFor="comment-content" className="mb-2 block text-sm font-medium text-slate-800">
          Your comment
        </label>
        <textarea
          id="comment-content"
          name="content"
          required
          minLength={10}
          maxLength={1000}
          rows={5}
          placeholder="Share your experience with the foundation"
          disabled={status === "loading"}
          className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      {status === "error" ? <p className="text-sm font-medium text-red-600">{errorMessage}</p> : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? "Submitting..." : "Submit comment"}
      </button>
    </form>
  );
}
