const fs = require('fs');

const files = [
  './src/components/module-quiz.tsx',
  './src/components/lesson-nav.tsx',
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/text-cream/g, 'text-ink')
    .replace(/border-white\/10/g, 'border-ink/10')
    .replace(/border-white\/12/g, 'border-ink/15')
    .replace(/border-white\/20/g, 'border-ink/20')
    .replace(/border-white\/30/g, 'border-ink/30')
    .replace(/bg-white\/\[0\.02\]/g, 'bg-ink/[0.03]')
    .replace(/bg-white\/\[0\.04\]/g, 'bg-ink/[0.05]')
    .replace(/text-gold-light/g, 'text-gold-dark');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Fixed contrast in', file);
  }
});
