import internal from "stream";
export interface MappingBedInterface {
      ID: number,
      Triage_ID: number,
      Bed_ID: number,
      MapBed_Comment: string,
      Admidtime: Date | null;
      User_ID:number 
}

export interface BedInterface {
      ID: number,
      Bed_Name: string,
      Zone_ID: number
}

export interface ZoneInterface {
      ID: number,
      Zone_Name: string,
}

