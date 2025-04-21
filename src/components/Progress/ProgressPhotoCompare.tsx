
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useRef, useState } from "react";

export default function ProgressPhotoCompare() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [photos, setPhotos] = useState<{ url: string; date: string }[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileArray = Array.from(e.target.files);
    fileArray.forEach(file => {
      const url = URL.createObjectURL(file);
      const date = new Date().toISOString().slice(0, 10);
      setPhotos((prev) => prev.length < 2 ? [...prev, { url, date }] : [prev[1], { url, date }]);
    });
  };

  const handleClick = () => {
    fileRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Photo Progress Compare</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {photos.length === 0 && (
            <button
              className="text-sm px-4 py-2 border rounded bg-muted hover:bg-muted/50"
              onClick={handleClick}
            >
              Upload Progress Photos
            </button>
          )}
          {photos.length > 0 && (
            <div className="flex gap-2">
              {photos.map((photo, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <img
                    src={photo.url}
                    alt={`Progress photo ${i + 1}`}
                    className="h-28 w-20 object-cover rounded border"
                  />
                  <span className="text-xs text-muted-foreground">{photo.date}</span>
                </div>
              ))}
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            multiple
          />
          {photos.length >= 2 && (
            <span className="text-xs text-primary ml-2">Side by side compare</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
