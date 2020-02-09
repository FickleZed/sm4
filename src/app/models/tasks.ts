export interface Tasks {
  daily: TaskCategories;
  break: TaskCategories;
  foreplay: TaskCategories;
  sex: TaskCategories;
}

export interface TaskCategories {
  [ key: string ]: TaskCategory;
}

export interface TaskCategory {
  name: string;
  tasks: { [key: string]: Task };
}

export interface Task {
  name: string;
  description: string;
  difficulty?: number;
  slaveFlags?: { [ flag: string ]: boolean };
  partnerFlags?: { [ flag: string ]: boolean };
  minPartners?: number;
  maxPartners?: number;
  equipment?: string[];
}
