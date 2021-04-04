import { ThemePalette } from "@angular/material/core";

export interface CheckboxTask {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: CheckboxTask[];
}
