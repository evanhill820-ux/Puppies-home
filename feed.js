import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function loadPuppies() {
  const gallery = document.querySelector(".gallery");

  // Clear the existing sample puppies
  gallery.innerHTML = "";

  const q = query(collection(db, "puppies"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const puppy = doc.data();

    gallery.innerHTML += `
      <div class="card">
        <img src="${puppy.imageUrl}" alt="${puppy.puppyName}">
        <h3>${puppy.puppyName}</h3>
        <p>${puppy.description}</p>
        <div class="buttons">
          ❤️ 0 &nbsp;&nbsp; 💬 0
        </div>
      </div>
    `;
  });
}

loadPuppies();
