const fs = require('fs');
const path = require('path');

// TODO get better this script
const FILES_TO_CREATE = [
  'data',
  'domain',
  'infra',
  'presenters',
];

function getModuleToCreate() {
  const module = process.argv.slice(2);
  return module[0];
}

async function generateModuleFiles(folder) {
  const module = getModuleToCreate();
  await fs.promises.writeFile(path.join(__dirname, `../src/${module}/${folder}/index.ts`), '', () => {
    console.log(`Creating files for ${module}`);
  });

  await fs.promises.writeFile(path.join(__dirname, `../src/${module}/index.ts`), () => {
    console.log(`Creating files for ${module}`);
  });
}

async function generateModuleFolders() {
  const module = getModuleToCreate();
  FILES_TO_CREATE.map((title) => {
    fs.promises.mkdir(path.join(__dirname, `../src/${module}/${title}`), {
      recursive: true,
    }).then(() => {
      generateModuleFiles(title);
    });
  });
}

function generateAll() {
  generateModuleFolders();
}

generateAll();
