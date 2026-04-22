import os from "os";

export function getOSInfo(flag) { 
  switch (flag) {
    case "--architecture":
      console.log(`CPU Architecture: ${process.arch}`);
      break;
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      break;
    case "--cpus":
      const cpus = os.cpus();
      console.log(`Overall amount of CPUs: ${cpus.length}`);
      const cpuTable = cpus.map((cpu) => ({
        Model: cpu.model.trim(),
        Speed: `${(cpu.speed / 1000).toFixed(2)} GHz`,
      }));
      console.table(cpuTable);
      break;
    case "--username":
      console.log(os.userInfo().username);
      break;
    case "--homedir":
      console.log('HOMEDIR: ' + os.homedir());
      break;
    default:
      console.log("Invalid flag");
  }
}