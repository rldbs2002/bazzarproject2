export async function getAllRequestData() {
  const res = await fetch("http://localhost:3000/api/request", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getRequestData(id: any) {
  const res = await fetch(`http://localhost:3000/api/request/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getAllCartData() {
  const res = await fetch("http://localhost:3000/api/cart", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getCartData(id: any) {
  const res = await fetch(`http://localhost:3000/api/cart/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getCheckoutData(id: any) {
  const res = await fetch(`http://localhost:3000/api/checkout/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getConsolidateData() {
  const res = await fetch("http://localhost:3000/api/consolidate", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getRepackingData() {
  const res = await fetch("http://localhost:3000/api/repacking", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getShippingData() {
  const res = await fetch("http://localhost:3000/api/shipping", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getUserData() {
  const res = await fetch(`http://localhost:3000/api/user`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
