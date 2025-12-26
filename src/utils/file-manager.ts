import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function createSkillDirectory(path: string): void {
    if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
    }
}

export function validateSkillDirectory(path: string): void {
    if (!existsSync(join(path, 'SKILL.md'))) {
        throw new Error('SKILL.md must exist in skill directory');
    }
}

export function getTemplatePath(templateName: string): string {
    return join(__dirname, '..', 'templates', `${templateName}.md`);
}

export function readTemplate(templateName: string): string {
    const templatePath = getTemplatePath(templateName);
    if (!existsSync(templatePath)) {
        throw new Error(`Template ${templateName} not found`);
    }
    return readFileSync(templatePath, 'utf-8');
}

