import { db } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { id } = params;

  try {
    const docRef = doc(db, "productos", id);
    const docSnapshot = await getDoc(docRef);
    return NextResponse.json(docSnapshot.data());
  } catch (error) {
    return console.log(error);
  }
}
