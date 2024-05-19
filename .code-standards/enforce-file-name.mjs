import * as fs from 'fs';
import * as path from 'path';

console.log("Validating folder and file names");
const directoriesToSkip = ["/node_modules", "/.git", "/.code-standard"];
const invalidFiles = [];

function traverseDirectory(directory) {

  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    // Skip directories mentioned above for code-standards tests
    if (directoriesToSkip.some(dir => filePath.includes(dir))){
      return;
    }

    if (stats.isDirectory() || path.extname(file) === '.ts') {
      const regex =/^[a-z]+([-]?[a-z]+)*([.][a-z]*)*$/;
      if (!regex.test(file)) {
        console.error(`File or folder name ${file} does not follow kebab-case.`);
        invalidFiles.push(file);
      }
    }
    
    if (stats.isDirectory()) {
      traverseDirectory(filePath); // Recursively traverse subdirectories
    }
  });
}

traverseDirectory(process.cwd());

if(invalidFiles.length !==0){
  process.exit(1);
}
