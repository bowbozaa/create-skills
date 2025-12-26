#!/usr/bin/env node

import { Command } from 'commander';
import { createSkill } from './commands/create.js';
import { validateSkills } from './commands/validate.js';
import { listSkills } from './commands/list.js';

const program = new Command();

program
  .name('create-skills')
  .description('CLI tool for creating and managing Anthropic Agent Skills')
  .version('1.0.0');

program
  .command('create')
  .alias('new')
  .description('Create a new Agent Skill')
  .argument('[name]', 'Name of the skill')
  .option('-t, --template <template>', 'Template to use', 'basic-skill')
  .option('-d, --directory <directory>', 'Directory path for the skill')
  .action(async (name, options) => {
    await createSkill(name, options);
  });

program
  .command('validate')
  .description('Validate existing skills')
  .argument('[directory]', 'Directory containing skills', './skills')
  .action((directory) => {
    validateSkills(directory);
  });

program
  .command('list')
  .description('List all skills in a directory')
  .argument('[directory]', 'Directory containing skills', './skills')
  .action((directory) => {
    listSkills(directory);
  });

program.parse();

