import { db } from "@/app/firebase/config";
import { collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";

// const sleep = (timer) => {
//   return new Promise((resolve) => setTimeout(resolve, timer));
// };

export async function GET(request, { params }) {
  const { categoria } = params;

  try {
    const productRef = collection(db, "productos");
    let q;
    if (categoria === "all") {
      q = query(productRef);
    } else {
      q = query(productRef, where("category", "==", categoria));
    }
    const querySnapshots = await getDocs(q);
    const docs = querySnapshots.docs.map((doc) => doc.data());
    return NextResponse.json(docs);
  } catch (error) {}

  // await sleep(100);
}
