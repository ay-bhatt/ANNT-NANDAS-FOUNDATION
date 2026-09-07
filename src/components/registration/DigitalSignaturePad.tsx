"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { uploadedImageFromCanvas } from "@/lib/registration/image";
import type { UploadedImage } from "@/lib/registration/types";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number };

interface DigitalSignaturePadProps {
  open: boolean;
  title?: string;
  hint?: string;
  onClose: () => void;
  onSave: (image: UploadedImage) => void;
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export default function DigitalSignaturePad({
  open,
  title = "Draw Your Signature",
  hint = "Sign with your finger, stylus, or mouse. The page will not scroll while you are signing.",
  onClose,
  onSave,
}: DigitalSignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const midPointRef = useRef<Point | null>(null);
  const hasInkRef = useRef(false);
  const [hasInk, setHasInk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const paintBlank = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const cssWidth = Math.max(1, wrap.clientWidth);
    const cssHeight = Math.max(1, wrap.clientHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, cssWidth, cssHeight);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#0f172a";
    context.fillStyle = "#0f172a";
    context.lineWidth = Math.max(2.4, Math.min(3.4, cssWidth / 260));
    ctxRef.current = context;
  }, []);

  const clearCanvas = useCallback(() => {
    paintBlank();
    hasInkRef.current = false;
    setHasInk(false);
    setLocalError("");
    drawingRef.current = false;
    lastPointRef.current = null;
    midPointRef.current = null;
  }, [paintBlank]);

  useEffect(() => {
    if (!open || !mounted) return;
    hasInkRef.current = false;
    setHasInk(false);
    setLocalError("");
    setBusy(false);
    drawingRef.current = false;
    lastPointRef.current = null;
    midPointRef.current = null;

    const frame = window.requestAnimationFrame(() => {
      paintBlank();
      headingRef.current?.focus();
    });

    const wrap = wrapRef.current;
    const observer =
      wrap && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            if (!hasInkRef.current) paintBlank();
          })
        : null;
    if (wrap && observer) observer.observe(wrap);

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [mounted, open, paintBlank]);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyTouch: body.style.touchAction,
      bodyOverscroll: body.style.overscrollBehavior,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    body.style.overscrollBehavior = "none";
    return () => {
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.touchAction = previous.bodyTouch;
      body.style.overscrollBehavior = previous.bodyOverscroll;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const preventScroll = (event: Event) => event.preventDefault();
    canvas.addEventListener("touchstart", preventScroll, { passive: false });
    canvas.addEventListener("touchmove", preventScroll, { passive: false });
    canvas.addEventListener("wheel", preventScroll, { passive: false });
    return () => {
      canvas.removeEventListener("touchstart", preventScroll);
      canvas.removeEventListener("touchmove", preventScroll);
      canvas.removeEventListener("wheel", preventScroll);
    };
  }, [mounted, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, open, onClose]);

  const pointFromEvent = (event: PointerEvent, canvas: HTMLCanvasElement): Point => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const startStroke = (point: Point) => {
    const context = ctxRef.current;
    if (!context) return;
    drawingRef.current = true;
    lastPointRef.current = point;
    midPointRef.current = point;
    context.beginPath();
    context.arc(point.x, point.y, context.lineWidth / 2, 0, Math.PI * 2);
    context.fill();
    if (!hasInkRef.current) {
      hasInkRef.current = true;
      setHasInk(true);
      setLocalError("");
    }
  };

  const continueStroke = (point: Point) => {
    const context = ctxRef.current;
    const last = lastPointRef.current;
    const mid = midPointRef.current;
    if (!context || !last || !mid) return;
    const nextMid = midpoint(last, point);
    context.beginPath();
    context.moveTo(mid.x, mid.y);
    context.quadraticCurveTo(last.x, last.y, nextMid.x, nextMid.y);
    context.stroke();
    midPointRef.current = nextMid;
    lastPointRef.current = point;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (busy) return;
    event.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch {
      // Some synthetic or browser events do not support pointer capture.
    }
    startStroke(pointFromEvent(event.nativeEvent, canvas));
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || busy) return;
    event.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const native = event.nativeEvent;
    const coalesced = typeof native.getCoalescedEvents === "function" ? native.getCoalescedEvents() : [native];
    for (const next of coalesced) {
      continueStroke(pointFromEvent(next, canvas));
    }
  };

  const endStroke = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    if (canvas?.hasPointerCapture(event.pointerId)) {
      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch {
        // Ignore browsers that reject capture release for this pointer.
      }
    }
    drawingRef.current = false;
    lastPointRef.current = null;
    midPointRef.current = null;
  };

  const handleSave = async () => {
    if (busy) return;
    if (!hasInkRef.current) {
      setLocalError("Please draw your signature before saving.");
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) {
      setLocalError("Unable to read the signature pad. Please try again.");
      return;
    }
    setBusy(true);
    setLocalError("");
    try {
      const image = await uploadedImageFromCanvas(canvas);
      onSave(image);
      onClose();
    } catch (caught) {
      setLocalError(caught instanceof Error ? caught.message : "Unable to save this signature.");
    } finally {
      setBusy(false);
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[220] flex items-end justify-center bg-slate-950/55 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="digital-signature-title"
        className="flex h-[min(92dvh,680px)] max-h-[100dvh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.28)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="border-b border-slate-100 px-4 pb-3 pt-4 sm:px-6 sm:pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">Signature</p>
          <h2
            id="digital-signature-title"
            ref={headingRef}
            tabIndex={-1}
            className="mt-1 text-xl font-bold tracking-tight text-slate-950 outline-none sm:text-2xl"
          >
            {title}
          </h2>
          <p className="mt-1.5 text-sm leading-6 text-slate-600">{hint}</p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-4 py-3 sm:px-6 sm:py-4">
          <div
            ref={wrapRef}
            className="relative min-h-[160px] w-full flex-1 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-inner"
          >
            <canvas
              ref={canvasRef}
              className="block h-full w-full touch-none select-none"
              style={{ touchAction: "none" }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endStroke}
              onPointerCancel={endStroke}
              onContextMenu={(event) => event.preventDefault()}
            />
            {!hasInk ? (
              <p className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-sm font-medium text-slate-400">
                Sign here
              </p>
            ) : null}
          </div>
          {localError ? (
            <p className="mt-3 text-sm font-medium text-rose-600" role="alert">
              {localError}
            </p>
          ) : (
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Use the full width of the pad. You can clear and try again before saving.
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 border-t border-slate-100 px-4 py-3 sm:px-6 sm:py-4">
          <button type="button" onClick={clearCanvas} disabled={busy} className="btn-outline-dark !min-h-12 flex-1 sm:flex-none">
            Clear
          </button>
          <button type="button" onClick={onClose} disabled={busy} className="btn-outline-dark !min-h-12 flex-1 sm:flex-none">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={busy}
            className={cn("btn-primary !min-h-12 flex-[1.2] sm:ml-auto sm:flex-none", busy && "opacity-80")}
          >
            {busy ? "Saving…" : "Use Signature"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
