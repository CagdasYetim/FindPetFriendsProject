import { ThemePalette } from "@angular/material/core";

export interface CheckboxTask {
  name: string;
  label:string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: CheckboxTask[];
}
