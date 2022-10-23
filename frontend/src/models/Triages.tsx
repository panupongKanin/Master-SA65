import { PatientInterface } from "./Patient"
import { DiseaseInterface } from "./Disease"
import { InpantientDepartmentInterface } from "./InpantientDepartment"
//import { UserInterface } from "./User"
export interface TriagesInterface {
    ID: Number,
    Patient_ID:              Number
	Patient:                 PatientInterface
	Disease_ID:              Number
	Disease:                 DiseaseInterface
	InpantientDepartment_ID: Number
	InpantientDepartment:    InpantientDepartmentInterface
	Triage_COMMENT:          String
	// User_ID:                 Number
	// User:                    UserInterface
  }