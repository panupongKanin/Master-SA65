export interface LevelInterface {
	ID: number;
    Level_name: string;
}

export interface SymptomInterface {
	ID: number;
    Check_date: Date | null;
	Temperature: string;
	Pressure: number;
	Heart_rate: number;
	Comment: string;
	Medicine: string;
    CheckID: number;
	LevelID: number;
	MapbID: number;
}

