// import { NextResponse } from "next/server";

// const { URLBASE } = require("@/app/config/constants");

// const getProductById = async (id) => {
//   const product = await fetch(`${URLBASE}/producto/${id}`);
//   const data = await product.json();
//   return data;
// };

// export async function GET(request, { params }) {
//   const { id } = params;
//   const product = await getProductById(id);
//   if (!product) {
//     return NextResponse.json(
//       { error: "Producto no encontrado" },
//       { status: 404 }
//     );
//   }
//   return NextResponse.json(product);
// }
