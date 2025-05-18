import Tesseract from "tesseract.js";

export async function processImage(file: File): Promise<string[]> {
  try {
    // Convert the file to a data URL
    const imageUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

    // Recognize text from the image
    const result = await Tesseract.recognize(imageUrl, "eng", {
      logger: (m) => console.log(m),
    });

    // Split the text into lines and clean up
    const items = result.data.text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .filter((line) => !line.match(/^[0-9.,$]+$/)); // Remove lines that are just numbers/prices

    return items;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}
