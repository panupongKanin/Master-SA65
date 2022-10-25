//ตารางหลัก
import { MappingBedInterface } from "./MapBedUI";

export interface VisitRecordInterface {
    ID: number;
    VisitorTypeID : number;
    VisitorType: VisitorTypeInterface;
    Map_BedID: number;
    Map_Bed: MappingBedInterface;
    UserID: number;
    Added_Time: Date | null;
    VisitorName: string;
    VisitorContact: string;
    
}

export interface VisitorTypeInterface {
    ID: number;
    Name: string;
}