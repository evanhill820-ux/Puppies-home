import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  increment,
  arrayUnion
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

  <button class="comment-btn" data-id="${puppyId}">
    💬 ${puppy.comments?.length || 0}
  </button>
</div>

<div class="comment-box">
  <input
    type="text"
    class="comment-input"
    data-id="${puppyId}"
    placeholder="Write a comment..."
  >

  <button class="post-comment-btn" data-id="${puppyId}">
    Post
  </button>
</div>

<div class="comments">
  ${(puppy.comments || [])
    .map(comment => `<p>💬 ${comment}</p>`)
    .join("")}
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
document.addEventListener("click", async (e) => {
  const button = e.target.closest(".post-comment-btn");

  if (!button) return;

  const puppyId = button.dataset.id;

  const input = document.querySelector(
    `.comment-input[data-id="${puppyId}"]`
  );

  const comment = input.value.trim();

  if (!comment) {
    alert("Please enter a comment.");
    return;
  }

  await updateDoc(doc(db, "puppies", puppyId), {
    comments: arrayUnion(comment)
  });

  input.value = "";

  loadPuppies();
});
