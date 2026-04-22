import zlib from "zlib";
import fs from "fs";
import { pipeline } from "stream/promises";
import path from "path";

export async function compress(pathToFile, pathToDest) {
  try {
    const filePath = path.resolve(process.cwd(), pathToFile);
    const destPath = path.resolve(process.cwd(), pathToDest);

    const readable = fs.createReadStream(filePath);
    const writable = fs.createWriteStream(destPath);
    const zip = zlib.createBrotliCompress();

    await pipeline(readable, zip, writable);
    console.log("Завершено");
  } catch (error) {
    console.error("Smth went wrong");
  }
}

export async function decompress(pathToFile, pathToDest) {
  try {
    const filePath = path.resolve(process.cwd(), pathToFile);
    const destPath = path.resolve(process.cwd(), pathToDest);

    const readable = fs.createReadStream(filePath);
    const writable = fs.createWriteStream(destPath);
    const zip = zlib.createBrotliDecompress();
    
    await pipeline(readable, zip, writable);
    console.log("Завершено");
  } catch (error) {
    console.error("Smth went wrong");
  }
}
