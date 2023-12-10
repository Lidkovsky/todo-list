export interface Categories {
  readonly id: string;
  category: string;
}
export interface Task {
  readonly id: string;
  task: string;
  category: string;
  completed: boolean;
  order: number;
}
