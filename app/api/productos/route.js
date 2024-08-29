import mockData from "@/app/data/mockData";
import { NextResponse } from "next/server";

const sleep = (timer) => {
  return new Promise((resolve) => setTimeout(resolve, timer));
};

export async function GET(request) {
  const data = mockData;
  await sleep(3000);
  return NextResponse.json(data);
}
