import CreateForm from "@/app/components/CreateForm";
import EditForm from "@/app/components/EditForm";
import { db } from "@/app/firebase/config";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { ref } from "firebase/storage";
import React from "react";

const getDocumentById = async (id) => {
  const productRef = collection(db, "productos");
  const q = query(productRef, where("id", "==", id));
  const querySnapshots = await getDocs(q);
  return querySnapshots.docs[0].data();
};

const EditPage = async ({ params }) => {
  const { id } = params;

  const product = await getDocumentById(id);

  return (
    <>
      <EditForm productValues={product} />
    </>
  );
};

export default EditPage;
