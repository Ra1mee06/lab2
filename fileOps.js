import fs from "fs";
import { writeFile, rename, cp, rm } from "fs/promises";
import { stdout } from "process";
import { pipeline } from "stream/promises";
import path from "path";

export async function readFile(pathTo) {
  try {
    const curPath = path.resolve(process.cwd(), pathTo);
    const stream = fs.createReadStream(curPath);
    await pipeline(stream, stdout, { end: false });
    console.log("\n");
  } catch (error) {
    console.error("Operation failed");
  }
}

export async function addFile(filename) {
  try {
    const curFile = path.resolve(process.cwd(), filename);
    await writeFile(curFile, "", {
      flag: "wx",
    });
  } catch (error) {
    console.error("FS operation failed");
  }
}

export async function renameFile(pathTo, newName) {
  try {
    const curPath = path.resolve(process.cwd(), pathTo);
    const newPath = path.resolve(path.dirname(curPath), newName);
    await rename(curPath, newPath);
  } catch (error) {
    console.error("Operation failed");
  }
}

export async function copyFile(pathFrom, pathToDir) {
  try {
    const srcPath = path.resolve(process.cwd(), pathFrom);
    const fileName = path.basename(srcPath);
    const destPath = path.resolve(process.cwd(), pathToDir, fileName);

    const readable = fs.createReadStream(srcPath);
    const writable = fs.createWriteStream(destPath);

    await pipeline(readable, writable);
    console.log("Файл скопирован");
  } catch (error) {
    console.error("Operation failed");
  }
}

export async function moveFile(pathFrom, pathToDir) {
  try {
    const srcPath = path.resolve(process.cwd(), pathFrom);

    await copyFile(pathFrom, pathToDir);
    await rm(srcPath);
    console.log("Файл перемещён");
  } catch (error) {
    console.error("Operation failed");
  }
}

export async function deleteFile(pathTo) {
  try {
    const curFile = path.resolve(process.cwd(), pathTo);
    await rm(curFile);
    console.log("Файл удалён");
  } catch (error) {
    console.error("Operation failed");
  }
}
