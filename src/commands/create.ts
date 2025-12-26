import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSkillFrontmatter } from '../utils/yaml-parser.js';
import { readTemplate } from '../utils/file-manager.js';
import { SkillMetadata } from '../types/skill.js';

export async function createSkill(skillName?: string, options?: { template?: string; directory?: string }) {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Skill name:',
            default: skillName,
            validate: (input: string) => input.length > 0 || 'Skill name is required',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Skill description:',
            validate: (input: string) => input.length > 0 || 'Description is required',
        },
        {
            type: 'list',
            name: 'template',
            message: 'Choose a template:',
            choices: ['basic-skill', 'code-skill', 'multi-file-skill'],
            default: options?.template || 'basic-skill',
        },
        {
            type: 'input',
            name: 'directory',
            message: 'Directory path:',
            default: (answers: any) => {
                if (options?.directory) {
                    return options.directory;
                }
                // Use the actual entered name from the prompt, not the CLI argument
                const actualName = answers.name || skillName || 'my-skill';
                return `./skills/${actualName}`;
            },
        },
    ]);

    const skillDir = answers.directory;

    if (existsSync(skillDir)) {
        console.log(chalk.yellow(`Directory ${skillDir} already exists.`));
        const { overwrite } = await inquirer.prompt([{
            type: 'confirm',
            name: 'overwrite',
            message: 'Overwrite existing skill?',
            default: false,
        }]);

        if (!overwrite) {
            console.log(chalk.red('Cancelled.'));
            return;
        }
    }

    mkdirSync(skillDir, { recursive: true });

    const metadata: SkillMetadata = {
        name: answers.name,
        description: answers.description,
    };

    let skillContent: string;
    try {
        const template = readTemplate(answers.template);
        skillContent = template
            .replace(/\{\{name\}\}/g, answers.name)
            .replace(/\{\{description\}\}/g, answers.description);
    } catch {
        // Fallback to basic template
        skillContent = createSkillFrontmatter(metadata) + `# ${answers.name}\n\n${answers.description}\n`;
    }

    const skillPath = join(skillDir, 'SKILL.md');
    writeFileSync(skillPath, skillContent, 'utf-8');

    console.log(chalk.green(`✓ Created skill: ${answers.name}`));
    console.log(chalk.green(`  Location: ${skillPath}`));
}

