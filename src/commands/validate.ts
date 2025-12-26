import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';
import { validateSkill } from '../utils/skill-validator.js';

export function validateSkills(directory: string = './skills') {
    if (!existsSync(directory)) {
        console.log(chalk.red(`Directory ${directory} does not exist`));
        return;
    }

    const items = readdirSync(directory);
    let validCount = 0;
    let invalidCount = 0;

    for (const item of items) {
        const itemPath = join(directory, item);
        const stat = statSync(itemPath);

        if (stat.isDirectory()) {
            console.log(chalk.blue(`\nValidating skill: ${item}`));
            const result = validateSkill(itemPath);

            if (result.valid) {
                console.log(chalk.green(`  ✓ Valid`));
                validCount++;
            } else {
                console.log(chalk.red(`  ✗ Invalid:`));
                result.errors.forEach((error) => {
                    console.log(chalk.red(`    - ${error}`));
                });
                invalidCount++;
            }
        }
    }

    console.log(chalk.blue(`\nSummary: ${validCount} valid, ${invalidCount} invalid`));
}

