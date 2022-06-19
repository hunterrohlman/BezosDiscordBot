// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore, collection } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo-o-G-qhbzKE1SS5lGfv8CwLwSKCgff0",
  authDomain: "bezos-bot.firebaseapp.com",
  projectId: "bezos-bot",
  storageBucket: "bezos-bot.appspot.com",
  messagingSenderId: "744359136699",
  appId: "1:744359136699:web:f35964f3ae1b8a57dec89e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createTicket(threadId: string, text: string) {
  try {
    await addDoc(collection(db, "tickets"), {
      threadId,
      text,
      openedAt: Date(),
    });
  } catch (e) {
    console.error("Error adding documentj: ", e);
  }
}
