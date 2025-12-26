import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { parseSkillFrontmatter } from './yaml-parser.js';

export function validateSkill(directory: string): {
    valid: boolean;
    errors: string[];
} {
    const errors: string[] = [];
    const skillPath = join(directory, 'SKILL.md');

    if (!existsSync(skillPath)) {
        errors.push('SKILL.md file is missing');
        return { valid: false, errors };
    }

    try {
        const content = readFileSync(skillPath, 'utf-8');
        const { metadata } = parseSkillFrontmatter(content);

        if (!metadata.name) {
            errors.push('Missing required field: name');
        }
        if (!metadata.description) {
            errors.push('Missing required field: description');
        }
    } catch (error) {
        errors.push(`Error parsing SKILL.md: ${error instanceof Error ? error.message : String(error)}`);
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

