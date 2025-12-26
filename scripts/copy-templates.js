import { existsSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcTemplatesDir = join(__dirname, '..', 'src', 'templates');
const distTemplatesDir = join(__dirname, '..', 'dist', 'templates');

// Create dist/templates directory if it doesn't exist
if (!existsSync(distTemplatesDir)) {
  mkdirSync(distTemplatesDir, { recursive: true });
}

// Copy all .md files from src/templates to dist/templates
if (existsSync(srcTemplatesDir)) {
  const files = readdirSync(srcTemplatesDir);
  const templateFiles = files.filter(file => file.endsWith('.md'));
  
  templateFiles.forEach(file => {
    const srcPath = join(srcTemplatesDir, file);
    const distPath = join(distTemplatesDir, file);
    copyFileSync(srcPath, distPath);
    console.log(`Copied ${file} to dist/templates/`);
  });
} else {
  console.error('src/templates directory not found!');
  process.exit(1);
}

