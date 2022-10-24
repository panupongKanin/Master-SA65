export interface DiseaseTypeInterface {
      ID: number,
      DiseaseType_name: string
}

export interface DiseaseInterface {
      ID: number,
      Disease_NAME: string,
      DiseaseType_ID: number
      DiseaseType: string
}

export interface InpantientDepartmentInterface {
      ID: number,
      InpantientDepartment_NAME : string
}

export interface TriagesInterface {
      ID: Number,
      Patient_ID:              Number
        Patient:                 string
        Disease_ID:              Number
        Disease:                 string
        InpantientDepartment_ID: Number
        InpantientDepartment:    string
        Triage_COMMENT:          string
        User_ID:                 Number
}

