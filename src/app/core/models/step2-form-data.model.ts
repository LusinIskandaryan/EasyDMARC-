import { IndustryTypeEnum } from "../enums/industry-type.enum";
import { UserRoleEnum } from "../enums/user-role.enum";

export interface IStep2FormData {
    industry: IndustryTypeEnum;
    experienceInYears: number;
    yourRole: UserRoleEnum;
}