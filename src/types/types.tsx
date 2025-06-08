export type Tag = 'Frontend' | 'Backend' | 'Design';
export type ColumnType = 'Open' | 'In Progress' | 'Done';

export interface Task {
  id: string;
  title: string;
  description: string;
  tag: Tag;
  assignee: string;
  dueDate: string;
  createdAt: string;
  createdBy: string;
  estimation: string;
  column: ColumnType;
}
export type CardType = {
  id: string;
  title: string;
  dueDate: string;
  assignee: string;
  tag: string;
  column: ColumnType;
};


