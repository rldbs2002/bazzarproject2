const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  : "http://localhost:3000/api";

export async function getAllRequestData() {
  try {
    const res = await fetch(`${apiUrl}/request`, {
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

export async function getRequestData(id: string) {
  const res = await fetch(`${apiUrl}/request/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getRequestsData() {
  try {
    const res = await fetch(`${apiUrl}/requests`, {
      next: { revalidate: 20 },
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

export async function getRemainRequestsData() {
  try {
    const res = await fetch(`${apiUrl}/remainrequests`, {
      next: { revalidate: 20 },
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

export async function getMyRequestData() {
  try {
    const res = await fetch(`${apiUrl}/myrequest`, {
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

export async function getAllCartData() {
  const res = await fetch(`${apiUrl}/cart`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getCartData(id: any) {
  const res = await fetch(`${apiUrl}/cart/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getCartsData() {
  const res = await fetch(`${apiUrl}/carts`, {
    next: { revalidate: 20 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getRemainCartsData() {
  try {
    const res = await fetch(`${apiUrl}/remaincarts`, {
      next: { revalidate: 20 },
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

export async function getMyCartsData() {
  const res = await fetch(`${apiUrl}/mycart`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getAllCheckoutData() {
  const res = await fetch(`${apiUrl}/checkout`, {
    next: { revalidate: 20 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getCheckoutsData() {
  const res = await fetch(`${apiUrl}/checkouts`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getCheckoutData(id: any) {
  const res = await fetch(`${apiUrl}/checkout/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getRemainCheckoutsData() {
  try {
    const res = await fetch(`${apiUrl}/remaincheckouts`, {
      next: { revalidate: 20 },
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

export async function getMyCheckoutData() {
  const res = await fetch(`${apiUrl}/mycheckout`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getConsolidateData() {
  const res = await fetch(`${apiUrl}/consolidate`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getRepackingData() {
  const res = await fetch(`${apiUrl}/repacking`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getShippingData() {
  const res = await fetch(`${apiUrl}/shipping`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getUserData() {
  const res = await fetch(`${apiUrl}/user`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getAllNoticeData() {
  const res = await fetch(`${apiUrl}/notice`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getNoticeData(id: any) {
  const res = await fetch(`${apiUrl}/notice/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getDailyRequestData() {
  try {
    const res = await fetch(`${apiUrl}/dailyrequest`, {
      next: { revalidate: 20 },
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

export async function getDailyCartData() {
  try {
    const res = await fetch(`${apiUrl}/dailycart`, {
      next: { revalidate: 20 },
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

export async function getDailyCheckoutData() {
  try {
    const res = await fetch(`${apiUrl}/dailycheckout`, {
      next: { revalidate: 20 },
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

export async function getCompleteRequestData() {
  try {
    const res = await fetch(`${apiUrl}/completerequest`, {
      next: { revalidate: 20 },
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

export async function getCompleteCartData() {
  try {
    const res = await fetch(`${apiUrl}/completecart`, {
      next: { revalidate: 20 },
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

export async function getCompleteCheckoutData() {
  try {
    const res = await fetch(`${apiUrl}/completecheckout`, {
      next: { revalidate: 20 },
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
