# create-skills

CLI tool for creating and managing Anthropic Agent Skills.

## Installation

```bash
npm install -g create-skills
```

Or use locally:

```bash
npm install
npm run build
npm link
```

## Usage

### Create a new skill

```bash
create-skills create [name] [options]
```

Options:

- `-t, --template <template>` - Template to use (basic-skill, code-skill, multi-file-skill)
- `-d, --directory <directory>` - Directory path for the skill

Example:

```bash
create-skills create my-skill
create-skills create pdf-tool -t code-skill -d ./my-skills/pdf-tool
```

### Validate skills

```bash
create-skills validate [directory]
```

Validates all skills in the specified directory (default: `./skills`).

### List all skills

```bash
create-skills list [directory]
```

Lists all skills with their names and descriptions.

## What are Agent Skills?

Agent Skills are organized folders containing a `SKILL.md` file that extends Claude's capabilities. Each skill must have:

- A `SKILL.md` file with YAML frontmatter containing:
  - `name` (required)
  - `description` (required)
  - Optional: `version`, `author`, `tags`

Skills can include additional files and code that Claude can discover and use progressively.

## Skill Structure

```
my-skill/
├── SKILL.md          # Required: Main skill file with YAML frontmatter
├── reference.md      # Optional: Additional documentation
├── advanced.md       # Optional: Advanced usage patterns
└── script.py         # Optional: Executable code
```

## Templates

- **basic-skill**: Simple skill with just SKILL.md
- **code-skill**: Skill that includes executable code
- **multi-file-skill**: Skill organized into multiple files

## Examples

See the `examples/` directory for example skills, including a PDF manipulation skill.

## Learn More

- [Agent Skills Documentation](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- [Agent Skills Open Standard](https://www.anthropic.com/news/agent-skills-open-standard)
