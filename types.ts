export enum UserMode {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER'
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light'
}

export type Language = 'EN' | 'RU' | 'UZ';

export interface RouteConfig {
  path: string;
  label: string;
  id: number;
}