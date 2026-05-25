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

export interface TeamMember {
  email: string;
  role: 'Admin' | 'Developer' | 'Security';
  status: 'Active' | 'Pending';
  avatar: string;
}

export interface KioskLog {
  id: string;
  time: string;
  msg: string;
  type: 'success' | 'info' | 'warn';
}

export interface CommitItem {
  hash: string;
  msg: string;
}

export interface BadgeItem {
  id: string;
  label: string;
  icon: string;
  desc: string;
  unlock: string;
}

export interface StepItem {
  text: string;
  check?: boolean;
  type?: string;
  action?: string;
}

export interface CampaignItem {
  id: string;
  title: string;
  desc: string;
  steps: StepItem[];
  xp: number;
  badge: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}