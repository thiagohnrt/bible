export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = process.env.API_URL;
  const path = searchParams.get("path");

  const res = await fetch(`${url}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return Response.json(data);
}
