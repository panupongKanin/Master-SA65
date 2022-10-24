// Nutrition
export interface NutritionInterface {
  ID: number;
  Type: string;
  Receive: number;
  Detail: string;
}
//Manage
export interface ManageInterface {
  ID: number;
  User_ID: number;
  NutritionID: number;
  Map_BedID: number;
  Date: Date | null;
  Comment: string;
}
