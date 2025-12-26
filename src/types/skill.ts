export interface SkillMetadata {
    name: string;
    description: string;
    version?: string;
    author?: string;
    tags?: string[];
}

export interface Skill {
    metadata: SkillMetadata;
    content: string;
    directory: string;
    files?: string[];
}

