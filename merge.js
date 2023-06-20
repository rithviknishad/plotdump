const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "data");
const folders = fs.readdirSync(dataDir).filter((f) => {
  return fs.statSync(path.join(dataDir, f)).isDirectory();
});

folders.forEach((folder) => {
  const folderPath = path.join(dataDir, folder);
  const files = fs.readdirSync(folderPath);
  const merged = [];
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const data = fs.readFileSync(filePath);
    try {
      const json = JSON.parse(data);
      merged.push(...json);
    } catch (err) {
      console.error(`Error parsing ${filePath}`);
      console.error(err);
    }
  });
  const mergedPath = path.join(__dirname, `data/${folder}.json`);
  fs.writeFileSync(mergedPath, JSON.stringify(merged, null, 2));
});
