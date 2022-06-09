// import * as fs from 'fs';
// import * as path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// import BadgeMeta, { Basic as BadgeStory } from '../packages/badge/src/Badge.story';
const test = require('../packages/badge/src/Badge.story');
console.log(test);

// Explicit imports
// const imports = {
//   badge: {
//     meta: BadgeMeta,
//     story: BadgeStory,
//   },
// }

// Object.keys(imports).map((component) => {
//   console.log(imports[component].story.Basic);
// })

// Filenames approach

const fs = require('fs');
const path = require('path');

// const storyFileNames = []

// const getStoryFiles = directory => {
//   const filesInDirectory = fs.readdirSync(directory);

//   for (const file of filesInDirectory) {
//     const filePath = path.join(directory, file);

//     if (fs.statSync(filePath).isDirectory()) {
//       getStoryFiles(filePath);
//     } else {
//       const regex = /^\S*.(story|stories).(tsx|jsx)$/;

//       if (regex.test(filePath)) {
//         storyFileNames.push(filePath);
//       }
//     }
//   }
// };

// const dirPath = path.resolve(__dirname, '../packages');
// getStoryFiles(dirPath)

// Promise.all(storyFileNames.map(fileName => import(fileName))).then((v) => {
//   console.log(v)
// })

// storyFileNames.map(fileName => {
//   import(fileName).then((v) => {
//     console.log(v);
//   })
// });
