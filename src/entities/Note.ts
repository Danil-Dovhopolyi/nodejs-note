export interface Note {
  id: number;
  createdAt: Date;
  content: string;
  category: string;
  dates: string;
  activeNote: boolean;
  archived: boolean;
}
