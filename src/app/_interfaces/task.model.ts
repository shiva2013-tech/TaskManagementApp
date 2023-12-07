export interface Task{
  id: number;
  title: string;
  description: string;
  lastDate:Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}