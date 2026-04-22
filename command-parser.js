import os from "os";
import readline from "readline";
import { stdin as input, stdout as output } from "process";
import * as nwd from "./nwd.js";
import * as fileOps from "./fileOps.js";
import { calculateHash } from "./hash.js";
import { compress, decompress } from "./zip.js";
import { getOSInfo } from "./os.js";

const rl = readline.createInterface({ input, output });

const args = process.argv.slice(2);
const usernameArg = args.find((a) => a.startsWith("--username="));

let username = "Anonymous";
if (usernameArg) {
  username = usernameArg.split("=")[1];
}

console.log(`\t\t\tСписок команд\n
    ____________________________________________________\n

    \t\t\t(Работа с файлами)\n
    ____________________________________________________\n
    cd - переместиться в указанный каталог\n
    up - подняться на уровень выше\n
    ls - вывести все файлы в директории\n
    cat - прочитать указанный файл\n
    add - добавить пустой файл в текущем каталоге\n
    rn - переименовать указанный файл\n
    cp - копировать указанный файл\n
    mv - переместить \n
    rm - удалить файл\n
    ____________________________________________________\n

    \t\t\t(Системная информация)\n
    ____________________________________________________\n
    os --EOL - Получите EOL\n
    os --homedir - Получить домашний каталог\n
    os --cpus - Получите информацию о процессорах хост-компьютера\n
    os --username - Получить текущее системное имя пользователя\n
    os --architecture - Получить архитектуру ЦП\n
    ____________________________________________________\n
    
    \t\t\t(Hash)\n
    ____________________________________________________\n
    hash path_to_file - хэшировать файл\n
    ____________________________________________________\n
    
    \t\t\t(Zip)\n
    ____________________________________________________\n
    compress - сжать файл\n
    decompress - вернуть файл\n
    `);

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${os.homedir()}`);

rl.on("line", async (line) => {
  const [cmd, ...args] = line.trim().split(" ");
  const arg = args.join(" ");

  console.log(`You are currently in ${process.cwd()}`);

  switch (cmd) {
    case "hello":
      console.log("World!");
      break;
    case "cd":
      if (arg) {
        await nwd.changeDir(arg);
      } else {
        console.log("Invalid path or pass missing");
      }
      break;
    case "up":
      await nwd.changeDir("..");
      break;
    case "ls":
      nwd.printDir();
      break;
    case "cat":
      if (arg) {
        await fileOps.readFile(arg);
      } else {
        console.log("Incorrect path");
      }
      break;

    case "hash":
      if (arg) {
        await calculateHash(arg);
      } else {
        console.log("Incorrect path");
      }
      break;

    case "compress":
      if (args.length >= 2) {
        await compress(args[0], args[1]);
      } else {
        console.log("Incorrect path");
      }
      break;

    case "decompress":
      if (args.length >= 2) {
        await decompress(args[0], args[1]);
      } else {
        console.log("Incorrect path");
      }
      break;

    case "add":
      await fileOps.addFile(arg);
      break;

    case "rn":
      if (args.length >= 2) {
        await fileOps.renameFile(args[0], args[1]);
      } else {
        console.log("Incorrect path");
      }
      break;

    case "cp":
      if (args.length >= 2) {
        await fileOps.copyFile(args[0], args[1]);
      } else {
        console.log("Incorrect path");
      }
      break;

    case "mv":
      if (args.length >= 2) {
        await fileOps.moveFile(args[0], args[1]);
      } else {
        console.log("Incorrect path");
      }
      break;

    case "rm":
      if (arg) {
        await fileOps.deleteFile(arg);
      } else {
        console.log("Incorrect path");
      }
      break;

    case "os":
      if (arg) {
        getOSInfo(arg);
      } else {
        console.error("Invilid param");
      }
      break;

    case "exit":
      console.log("Выход из программы...");
      rl.close();
      break;
    default:
      console.log(`Invalid input: '${cmd}'`);
      break;
  }
});

rl.on("close", () => {
  process.exit(0);
});
