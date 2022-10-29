import internal from "stream";

export interface BASKETInterface {
    ID: string,
    Amount: number;
    Add_time: Date | null;
    DOCTOR_ID:number;
    MEDICINE_ID: number;
    MEDICINE: MEDICINEInterface;
    WHERE_ID: number;
    WHERE:WHEREInterface;
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
