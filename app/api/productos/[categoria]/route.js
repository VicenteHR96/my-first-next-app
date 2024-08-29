import mockData from "@/app/data/mockData";
import { NextResponse } from "next/server";

const sleep = (timer) => {
  return new Promise((resolve) => setTimeout(resolve, timer));
};

export async function GET(request, { params }) {
  const { categoria } = params;
  const data =
    categoria === "all"
      ? mockData
      : mockData.filter(
          (data) => data.category.toLowerCase() === categoria.toLowerCase()
        );
  await sleep(100);
  return NextResponse.json(data);
}
