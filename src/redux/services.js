import { createAsyncThunk } from "@reduxjs/toolkit";
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
import { db } from "../firebase/firebaseConfig";

const scoreRef = collection(db, "scores");

export const getScores = createAsyncThunk("cardGame/getScores", async () => {
  let data = null;
  const dataQuery = query(scoreRef, orderBy("score", "desc"), limit(15));
  data = await getDocs(dataQuery);

  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
});

export const saveScore = createAsyncThunk(
  "cardGame/saveScore",
  async (input) => {
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
  }
);
