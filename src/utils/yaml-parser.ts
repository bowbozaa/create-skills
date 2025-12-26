import yaml from 'js-yaml';
import { SkillMetadata } from '../types/skill.js';

export function parseSkillFrontmatter(content: string): {
    metadata: SkillMetadata;
    body: string;
} {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        throw new Error('SKILL.md must start with YAML frontmatter (---)');
    }

    const yamlContent = match[1];
    const body = match[2];

    const metadata = yaml.load(yamlContent) as SkillMetadata;

    if (!metadata.name || !metadata.description) {
        throw new Error('SKILL.md frontmatter must include "name" and "description"');
    }

    return { metadata, body };
}

export function createSkillFrontmatter(metadata: SkillMetadata): string {
    return `---\n${yaml.dump(metadata)}---\n\n`;
}

