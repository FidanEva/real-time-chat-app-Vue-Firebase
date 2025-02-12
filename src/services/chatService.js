import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

const messagesCollection = collection(db, "messages");

export const sendMessage = async (user, text) => {
  await addDoc(messagesCollection, {
    user: user.displayName,
    uid: user.uid,
    text,
    createdAt: new Date(),
  });
};

export const subscribeToMessages = (callback) => {
  const q = query(messagesCollection, orderBy("createdAt", "asc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};
