export async function getRequestData() {
  const res = await fetch("http://localhost:3000/api/request", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
