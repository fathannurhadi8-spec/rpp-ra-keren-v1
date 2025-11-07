import { cpRA } from "./topics";

export function pickCP(cpRef = ["agama", "jatiDiri", "literasiSTEAM"]) {
  return cpRef.map(group => {
    const list = cpRA[group];
    return list[Math.floor(Math.random() * list.length)];
  });
}
