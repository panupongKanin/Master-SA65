import { DiseaseTypeInterface } from "./DiseaseType"
export interface DiseaseInterface {
    ID: number,
    Disease_NAME : string,
    DiseaseType_ID : number
    DiseaseType: DiseaseTypeInterface

  }