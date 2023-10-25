import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import RequestTable from "../components/project/RequestTable";

// export async function getServerData() {
//   const res = await fetch("http://localhost:3000/api/request", {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

export default async function ServerPage() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  // const data = await getServerData();

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "16px" }}>
          <h1 style={{ fontSize: "40px" }}>Server All Requests Page</h1>
          {/* <RequestTable isServerTable={true} /> // For server table */}
        </div>
      </div>
    </div>
  );
}
