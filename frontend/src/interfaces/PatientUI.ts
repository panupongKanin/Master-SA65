import internal from "stream";

export interface PatientInterface {
    ID: string,
    ID_Card: string;
    Name: string;
    BirthDay: Date | null;
    GenderID:number;
    Gender:GenderInterface;
    Blood_typeID: number;
    Blood_type: Blood_typeInterface;
    Drug_AllergyID: number;
    Drug_Allergy:Drug_AllergyInterface;
    RightsID: number;
    Rights: RIGHTSInterface;
    Addess:string;
    Other: string;
    UserID:number
    User:UsersInterface
}
export interface UsersInterface {  // add data whan add user
    ID: string,
}
export interface Blood_typeInterface {
    ID: number,
    Blood_Name: string,
}
export interface GenderInterface {
    ID: number,
    Gender_Name: string,
}
export interface Drug_AllergyInterface {
    ID: number,
    Drug_Name:  string,
	Drug_Group: string,
}
export interface RIGHTSInterface {
    ID: number,
    RIGHTS_Name: string,
}