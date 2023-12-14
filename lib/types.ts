export interface Categories {
  readonly id: string;
  category: string | null;
  user_id: string | null;
}
export interface Task {
  readonly id: string;
  task: string;
  category: string;
  completed: boolean;
  category_id: string;
  task_order: number | null;
}
