import React from 'react';

export interface Module {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  icon: string;
}

export interface ConfigEntry {
  key: string;
  value: string;
  scope: 'local' | 'global' | 'system';
}