import React from 'react';

export const INITIAL_CONFIGS: { [key: string]: string } = {
  'user.name': 'Learner',
  'user.email': 'learner@example.com',
  'core.editor': 'vim',
  'init.defaultBranch': 'main',
};

export const SCOPES = [
  { id: 'local', name: 'Local', priority: 1, description: 'Specific to one repository' },
  { id: 'global', name: 'Global', priority: 2, description: 'User-wide across all repos' },
  { id: 'system', name: 'System', priority: 3, description: 'All users on the system' },
];

export const MODULE_IDS = {
  INTRO: 'intro',
  SCOPES: 'scopes',
  ESSENTIALS: 'essentials',
  READING: 'reading',
  WRITING: 'writing',
  REMOVING: 'removing',
  TYPES: 'types',
  ADVANCED: 'advanced',
  SCENARIOS: 'scenarios',
  CHEATSHEET: 'cheatsheet',
  TROUBLESHOOTING: 'troubleshooting',
};