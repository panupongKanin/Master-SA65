import { UserTypeInterface } from "./UserType"
export interface UserInterface {
    ID: number,
	User_NAME:     string
	User_PASSWORD: string
	ISNAME:        string
	UserType_ID: Number
	UserType:    UserTypeInterface
  }