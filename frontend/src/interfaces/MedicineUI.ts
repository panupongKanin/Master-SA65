import internal from "stream";

export interface BASKETInterface {
    ID: string,
    Amount: number;
    Add_time: Date | null;
    DOCTOR_ID:number;
    DOCTOR:DOCTORInterface;
    MEDICINE_ID: number;
    MEDICINE: MEDICINEInterface;
    WHERE_ID: number;
    WHERE:WHEREInterface;
}
export interface DOCTORInterface {
    ID: string,
    Name: string,
    Title: string,
}
export interface MEDICINEInterface {
    ID: string,
    Name: string,
    How: string,
    So: string,
    Unit: string,
}
export interface WHEREInterface {
    ID: string,
    Name: string,
}
