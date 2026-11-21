"use client";
import { useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { toast } from "sonner";

export default function ImageUpload({
  value,
  onChange,
  label = "Upload Image",
}) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/"))
      return toast.error("Please choose an image file");

    if (file.size > 5 * 1024 * 1024)
      return toast.error("Image must be under 5MB");

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);

    if (!res.ok) return toast.error(data.message || "Upload failed");

    onChange(data.url);
    toast.success("Image uploaded");
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted">
        {value ? (
          <img
            src={value}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <LuImagePlus className="h-7 w-7 text-muted-foreground" />
        )}
      </div>

      <label className="cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary">
        {uploading ? "Uploading..." : label}

        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  );
}
