import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function loadPuppies() {
  const gallery = document.querySelector(".gallery");

  // Clear the existing sample puppies
  gallery.innerHTML = "";

  const q = query(collection(db, "puppies"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const puppy = doc.data();
    const puppyId = doc.id;

    gallery.innerHTML += `
  <div class="card">
    <img src="${puppy.imageUrl}" alt="${puppy.puppyName}">
    <h3>${puppy.puppyName}</h3>
    <p>${puppy.description}</p>

    <div class="buttons">
      <button class="like-btn" data-id="${puppyId}">
        ❤️ ${puppy.likes || 0}
      </button>
      💬 0
    </div>

  </div>
`;
  });
}

loadPuppies();

document.addEventListener("click", async (e) => {
  const button = e.target.closest(".like-btn");

if (!button) return;

const puppyId = button.dataset.id;

  await updateDoc(doc(db, "puppies", puppyId), {
    likes: increment(1)
  });

  loadPuppies();
});
