const uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", () => {
    const image = document.getElementById("image").files[0];
    const puppyName = document.getElementById("puppyName").value;
    const description = document.getElementById("description").value;

    if (!image) {
        alert("Please choose a puppy image first.");
        return;
    }

    alert(
        "Ready to upload!\n\n" +
        "Puppy: " + puppyName +
        "\nDescription: " + description +
        "\nImage: " + image.name
    );
});
