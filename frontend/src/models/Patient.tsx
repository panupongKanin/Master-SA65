import { GenderInterface } from "./Gender"
import { Blood_typeInterface } from "./Blood_type"
export interface PatientInterface {
    ID: number,
    Patient_NAME: string
    Gender_ID: Number
    Gender: GenderInterface
    Blood_type_ID: Number
    Blood_typr: Blood_typeInterface
  }