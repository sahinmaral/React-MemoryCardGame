import {
  collection,
  getDocs,
  orderBy,
  limit,
  query,
  setDoc,
  doc,
  addDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const scoreRef = collection(db, "scores");

export const getScores = async () => {
  let data = null;
  try {
    const dataQuery = query(scoreRef, orderBy("score", "desc"), limit(15));
    data = await getDocs(dataQuery);
  } catch (error) {
    throw error;
  }
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const saveScore = async (input) => {
  try {
    const dataQuery = query(scoreRef, where("name", "==", input.name));
    const data = await getDocs(dataQuery);

    const filtered = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    if (filtered.length === 0) {
      await addDoc(scoreRef, {
        name: input.name,
        score: input.score,
      });
    } else if (filtered.some((item) => item.score < input.score)) {
      const item = filtered.find((item) => item.name === input.name);
      const docRef = doc(db, "scores", item.id);
      await setDoc(docRef, input);
    }
  } catch (e) {
    console.error("Error saving score: ", e.message);
  }
};
