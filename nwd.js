import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

let __filename = fileURLToPath(import.meta.url);
let __currentDir = path.dirname(__filename);

export async function changeDir(pathTo) {
  try {
    const newPath = path.resolve(process.cwd(), pathTo);
    process.chdir(newPath);
  } catch (error) {
    console.error("Operation Failed");
  }
}

export async function printDir() {
  try {
    const files = await fs.readdir(process.cwd(), {
      withFileTypes: true,
    });

    const result = files.map((f) => ({
      NameOfFile: f.name,
      IsDir: f.isDirectory(),
    }));

    console.table(result);
  } catch (error) {
    console.error("Operation Failed");
  }
}