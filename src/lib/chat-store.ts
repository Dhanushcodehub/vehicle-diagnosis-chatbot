// lib/chat-store.ts
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function saveMessage(uid: string, chatId: string, role: "user" | "assistant", content: string) {
  await addDoc(collection(db, "users", uid, "chats", chatId, "messages"), {
    role,
    content,
    createdAt: serverTimestamp(),
  });
}
