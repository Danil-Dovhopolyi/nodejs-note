import { EntityBase } from './EntityBase.js';
export interface Note extends EntityBase {
  content: string;
  category: string;
  dates: string;
  activeNote: boolean;
  archived: boolean;
}
