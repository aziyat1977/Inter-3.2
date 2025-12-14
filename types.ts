export enum UserMode {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER'
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light'
}

export interface RouteConfig {
  path: string;
  label: string;
  id: number;
}