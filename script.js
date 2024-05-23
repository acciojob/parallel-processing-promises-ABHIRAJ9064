document.addEventListener("DOMContentLoaded", function() {
  const imageUrls = [
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" },
    { url: "https://via.placeholder.com/150" }
  ];

  const downloadButton = document.getElementById("download-images-button");

  downloadButton.addEventListener("click", function() {
    downloadImages(imageUrls)
      .then(images => {
        displayImages(images);
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("output").textContent = error;
      });
  });

  function downloadImages(imageUrls) {
    const promises = imageUrls.map(image => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
          resolve(img);
        };
        img.onerror = function() {
          reject(`Failed to load image's URL: ${image.url}`);
        };
        img.src = image.url;
      });
    });
    return Promise.all(promises);
  }

  function displayImages(images) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
    images.forEach(image => {
      outputDiv.appendChild(image);
    });
  }
});
