import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';
import { parseSkillFrontmatter } from '../utils/yaml-parser.js';

export function listSkills(directory: string = './skills') {
    if (!existsSync(directory)) {
        console.log(chalk.red(`Directory ${directory} does not exist`));
        return;
    }

    const items = readdirSync(directory);
    const skills: Array<{ name: string; description: string; path: string }> = [];

    for (const item of items) {
        const itemPath = join(directory, item);
        const stat = statSync(itemPath);

        if (stat.isDirectory()) {
            const skillPath = join(itemPath, 'SKILL.md');
            if (existsSync(skillPath)) {
                try {
                    const content = readFileSync(skillPath, 'utf-8');
                    const { metadata } = parseSkillFrontmatter(content);
                    skills.push({
                        name: metadata.name,
                        description: metadata.description,
                        path: itemPath,
                    });
                } catch (error) {
                    console.log(chalk.yellow(`Warning: Could not parse ${skillPath}`));
                }
            }
        }
    }

    if (skills.length === 0) {
        console.log(chalk.yellow('No skills found'));
        return;
    }

    console.log(chalk.blue(`\nFound ${skills.length} skill(s):\n`));
    skills.forEach((skill) => {
        console.log(chalk.green(`  ${skill.name}`));
        console.log(chalk.gray(`    ${skill.description}`));
        console.log(chalk.gray(`    ${skill.path}\n`));
    });
}

