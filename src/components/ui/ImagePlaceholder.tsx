"use client";

interface ImagePlaceholderProps {
  label?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
  bgColor?: string;
}

export default function ImagePlaceholder({
  label = "Image",
  className = "",
  aspectRatio = "landscape",
  bgColor = "bg-gradient-to-br from-gray-100 to-gray-200",
}: ImagePlaceholderProps) {
  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "video"
        ? "aspect-video"
        : aspectRatio === "portrait"
          ? "aspect-[3/4]"
          : "aspect-[4/3]";

  return (
    <div
      className={`img-zoom ${aspectClass} ${bgColor} ${className}`}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center p-4">
          <svg className="w-10 h-10 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs text-gray-400 font-inter font-medium">{label}</p>
        </div>
      </div>
    </div>
  );
}