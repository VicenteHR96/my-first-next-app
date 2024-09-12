import { db } from "@/app/firebase/config";
import { collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";

// const sleep = (timer) => {
//   return new Promise((resolve) => setTimeout(resolve, timer));
// };

export async function GET(request) {
  try {
    const productRef = collection(db, "productos");
    let q;
    q = query(productRef);
    const querySnapshots = await getDocs(q);
    const docs = querySnapshots.docs.map((doc) => doc.data());
    // await sleep(3000);
    return NextResponse.json(docs);
  } catch (error) {}
}
