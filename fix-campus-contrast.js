const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src/app/campus');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/text-cream/g, 'text-ink')
    .replace(/border-white\/10/g, 'border-ink/10')
    .replace(/border-white\/20/g, 'border-ink/20')
    .replace(/bg-white\/10/g, 'bg-ink/10')
    .replace(/text-gold-light/g, 'text-gold-dark');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Fixed contrast in', file);
  }
});
