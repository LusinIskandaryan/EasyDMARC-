import { FormGroup } from "@angular/forms";

export interface INavigationStep {
    label: string;
    id: number;
    path: string;
    stepControl: FormGroup,
}