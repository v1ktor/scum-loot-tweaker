import * as fs from "node:fs";

export const isFile = (fileName: fs.PathLike) => {
  return fs.lstatSync(fileName).isFile();
}