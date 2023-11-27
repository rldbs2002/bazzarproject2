export async function getAllRequestData() {
  try {
    const res = await fetch("https://api.vercel.com/api/request", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    return res.json();
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

export async function getRequestData(id: any) {
  const res = await fetch(`https://api.vercel.com/api/request/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getAllCartData() {
  const res = await fetch("https://api.vercel.com/api/cart", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getCartData(id: any) {
  const res = await fetch(`https://api.vercel.com/api/cart/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getCheckoutData(id: any) {
  const res = await fetch(`https://api.vercel.com/api/checkout/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getConsolidateData() {
  const res = await fetch("https://api.vercel.com/api/consolidate", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getRepackingData() {
  const res = await fetch("https://api.vercel.com/api/repacking", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getShippingData() {
  const res = await fetch("https://api.vercel.com/api/shipping", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getUserData() {
  const res = await fetch(`https://api.vercel.com/api/user`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
