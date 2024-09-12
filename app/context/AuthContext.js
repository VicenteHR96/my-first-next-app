"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, googleProvider } from "../firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const getDocumentById = async (id) => {
  const profileRef = collection(db, "usuarios");
  const q = query(profileRef, where("uid", "==", id));
  const querySnapshots = await getDocs(q);

  // Verifica si hay documentos en la consulta
  if (querySnapshots.docs.length > 0) {
    return querySnapshots.docs[0].data();
  } else {
    console.error("No se encontró un perfil de usuario con ese ID.");
    return null; // O maneja el caso de que no haya documentos
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    email: null,
    uid: null,
  });

  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    about: "",
    email: "",
    avatar: null,
    telefono: 56,
    rol: "user",
    id: "",
  });

  const registerUser = async (values) => {
    const { email, password } = values;

    // Registra al usuario y obtén el objeto user directamente
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const registeredUser = userCredential.user;

    // Crea el perfil del usuario en Firestore usando el uid e email del usuario recién creado
    const docRef = doc(db, "usuarios", registeredUser.uid);
    await setDoc(docRef, {
      //   ...values, // Incluye los valores adicionales como nombre, apellido, etc.
      uid: registeredUser.uid,
      email: registeredUser.email,
    });
  };

  const loginUser = async (values) => {
    await signInWithEmailAndPassword(auth, values.email, values.password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const googleLogin = async () => {
    try {
      // Autentica al usuario mediante Google
      const result = await signInWithPopup(auth, googleProvider);

      // Obtén el usuario de la autenticación de Google
      const googleUser = result.user;

      // Referencia al documento del usuario en Firestore usando su uid
      const docRef = doc(db, "usuarios", googleUser.uid);

      // Verifica si el documento ya existe
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Si no existe, crea el perfil del usuario
        await setDoc(docRef, {
          uid: googleUser.uid,
          email: googleUser.email,
          nombre: googleUser.displayName.split(" ")[0],
          apellido: googleUser.displayName.split(" ")[1] || "",
          avatar: googleUser.photoURL || "",
          // telefono: googleUser.phoneNumber || "",
          // rol: "user",
        });
        console.log("Perfil de usuario creado");
      } else {
        console.log("El usuario ya existe en la base de datos");
      }
    } catch (error) {
      console.error(
        "Error en la autenticación de Google o creación de perfil:",
        error
      );
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (user) {
          const userProfile = await getDocumentById(user.uid);
          setValues({
            ...values,
            ...userProfile,
            id: user.uid,
            email: user.email,
          });
        }
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };
    fetchUserProfile();
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("User:" + user);
      if (user) {
        setUser({
          logged: true,
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({
          logged: false,
          email: null,
          uid: null,
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        values,
        setValues,
        registerUser,
        loginUser,
        logout,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
