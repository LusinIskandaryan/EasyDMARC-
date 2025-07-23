import { IStep1FormData } from "./models/step1-form-data.model";
import { IStep2FormData } from "./models/step2-form-data.model";
import { IStep3FormData } from "./models/step3-form-data.model";

export type UserData = IStep1FormData & IStep2FormData & IStep3FormData;