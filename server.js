const Tesseract = require("tesseract.js");

async function performOCR(file) {
  try {
    const result = await Tesseract.recognize(file, "eng");
    return result.data.text ? result.data.text.trim() : null;
  } catch (error) {
    console.error("Error! ", error.message);
    return null;
  }
}

async function processImage(imageName) {
  const filePath = `./${imageName}.jpg`;

  console.log(`Image: ${filePath}`);

  const ocrResult = await performOCR(filePath);

  if (ocrResult !== null) {
    const lines = ocrResult.split("\n");

    for (const line of lines) {
      const lineNumber = Number(line.split(".")[0]);

      if (isNaN(lineNumber) || !line.toLowerCase().includes("unkn")) continue;

      const ansLetters = line.split("Yes")[1];
      let lineResult = "Yes";

      if (ansLetters.toLowerCase().split("unkn")[0].includes("no")) {
        lineResult = "No";
      }

      console.log(lineNumber, "=>", lineResult, "\n");
    }
  }
}

async function processImages() {
  const imageNames = ["img1", "img2", "img3"];

  for (const name of imageNames) {
    await processImage(name);
  }
}

processImages();
