interface ThumbnailProps {
  url: string;
  alt: string;
}

export function Thumbnail({ url, alt }: ThumbnailProps) {
  return (
    <img
      className="h-16 w-16 rounded-md border border-slate-300"
      src={url}
      alt={alt}
    />
  );
}
