import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
const auth = getAuth();
const uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", async () => {
    const image = document.getElementById("image").files[0];
    const puppyName = document.getElementById("puppyName").value;
    const description = document.getElementById("description").value;

    if (!image) {
        alert("Please choose a puppy image first.");
        return;
    }

const formData = new FormData();

formData.append("file", image);
formData.append("upload_preset", "puppies_upload");

try {
    const response = await fetch(
        "https://api.cloudinary.com/v1_1/shaoccat/image/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Upload failed");
}
    console.log(data);

  await addDoc(collection(db, "puppies"), {
    userId: auth.currentUser.uid,
    puppyName: puppyName,
    description: description,
    imageUrl: data.secure_url,
    likes: 0,
    comments: [],
    createdAt: serverTimestamp()
});
    alert("Image uploaded successfully!");
} catch (error) {
    console.error(error);
    alert("Upload failed.");
}

});
