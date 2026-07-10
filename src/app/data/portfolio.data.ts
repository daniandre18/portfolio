import content from './portfolio-content.json';

export type Lang = 'es' | 'en';

export interface BiLingual {
  es: string;
  en: string;
}

export interface ExpItem {
  current?: boolean;
  date: string;
  co: string;
  logo: string;
  logoMono?: boolean;
  role: BiLingual;
  bullets: { es: string[]; en: string[] };
  tags: string[];
}

export interface EarlyItem {
  role: BiLingual;
  co: string;
  date: string;
  desc: BiLingual;
}

export interface Belt {
  label: BiLingual;
  color: string;
  textOn: string;
}

export type BeltKey = 'white' | 'blue' | 'purple' | 'brown' | 'black';

export type SkillCategory = 'frontend' | 'backend';

export interface SkillItem {
  name: string;
  belt: BeltKey;
  stripes: number;
  logo?: string;
  years: BiLingual;
  category: SkillCategory;
}

export interface ProjectLink {
  label: BiLingual;
  url: string;
}

export interface ProjectItem {
  tag: BiLingual;
  name: BiLingual;
  co?: string;
  desc: BiLingual;
  stack: string[];
  images?: string[];
  logo?: string;
  links?: ProjectLink[];
}

export interface StatItem {
  num: string;
  label: BiLingual;
}

/* Content (copy, experience, skills, projects, stats) lives in
   portfolio-content.json — this file only defines its shape. */
export const dict = content.dict;
export const expData = content.expData as ExpItem[];
export const earlyData = content.earlyData as EarlyItem[];
export const earlyHeader: BiLingual = content.earlyHeader;
export const belts = content.belts as Record<BeltKey, Belt>;
export const skills = content.skills as SkillItem[];
export const projects = content.projects as ProjectItem[];
export const stats = content.stats as StatItem[];
