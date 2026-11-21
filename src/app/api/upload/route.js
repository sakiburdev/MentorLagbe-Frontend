import { cookies } from "next/headers";

export async function POST(request) {
  const cookieStore = await cookies();

  if (!cookieStore.get("ml-token")) {
    return Response.json({ message: "Please sign in first" }, { status: 401 });
  }

  const incoming = await request.formData();
  const file = incoming.get("image");

  if (!file)
    return Response.json({ message: "No image found" }, { status: 400 });

  const body = new FormData();
  body.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    {
      method: "POST",
      body,
    },
  );
  const result = await res.json();

  if (!res.ok || !result.success) {
    return Response.json({ message: "ImgBB upload failed" }, { status: 500 });
  }

  return Response.json({ url: result.data.url });
}
