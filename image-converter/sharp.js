const fs = require("fs");
const { promisify } = require("util");
const sharp = require("sharp");

const paths = [];

async function readFiles(dirname) {
  const reader = promisify(fs.readdir);

  const fileNames = await reader(dirname);

  fileNames.forEach((filename) =>
    paths.push({
      path: `./image-converter/images/${filename}`,
      fileName: filename.split(".")[0],
    })
  );
}

async function useSharp(file) {
  await sharp(file.path)
    .webp({ quality: 80 })
    .toFile(`./image-converter/output/${file.fileName}.webp`);
}

async function generator() {
  try {
    await readFiles("./image-converter/images");
    paths.map(async (file) => await useSharp(file));
  } catch (error) {
    console.log(error, 24);
  }
}

generator();
