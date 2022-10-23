package main
 
import (
  "github.com/panupongKanin/ProjectSA-arm/controller"
  "github.com/panupongKanin/ProjectSA-arm/entity"
  "github.com/gin-gonic/gin"
)

func main() {
  	entity.SetupDatabase()


  	r := gin.Default()
	r.Use(CORSMiddleware())

// ================= 01 ========================================================================================= 
	r.GET("/GetUser", controller.GetUser)
	r.POST("/CreateUser", controller.CreateUser)

	r.GET("/ListBlood_type", controller.ListBlood_type)
	r.POST("/CreateBlood_type", controller.CreateBlood_type)

	r.GET("/ListDrug_Allergy", controller.ListDrug_Allergy)
	r.POST("/CreateDrug_Allergy", controller.CreateDrug_Allergy)

	r.GET("/ListGender", controller.ListGender)
	r.POST("/CreateGender", controller.CreateGender)

	r.GET("/ListRIGHTS", controller.ListRIGHTS)
	r.POST("/CreateRIGHTS", controller.CreateRIGHTS)

	r.GET("/ListPatient", controller.Listpatient)
	r.GET("/GetPatient", controller.GetPatient)
	r.POST("/CreatePatient", controller.CreatePatient)



	//=========== Main Table Mapping Bed ===========
	r.POST("/CreateMapBed",controller.CreateMapBed)
	r.GET("/GetListMapBeds",controller.GetListMapBeds)
	r.GET("/GetMapBed/:id",controller.GetMapBed)
	//=========== Main Table Mapping Bed ===========

	//===========Zone===========
	r.POST("/CreateZone",controller.CreateZone)
	r.GET("/GetListZones",controller.ListZones)
	//===========Bed===========
	r.POST("/CreateBed",controller.CreateBed)
	r.GET("/GetListBeds",controller.ListBeds)
	r.GET("/Bed/:zoneid",controller.GetBed_by_zone)
	r.GET("/GetBedName/:id",controller.GetBedName)

	r.PATCH("/UpdateBedstate", controller.UpdateBedstate)
	r.PATCH("/UpdateTriagestate", controller.UpdateTriagestate)


	//===========IPD===========
	r.POST("/CreateIPD",controller.CreateIPD)
	r.GET("/GetListIPDs",controller.GetListIPDs)
	r.GET("/GetIPD/:id",controller.GetIPD)

	
	//===========DiseaseType===========
	r.POST("/CreateDiseaseType",controller.CreateDiseaseType)
	r.GET("/GetListDiseaseType",controller.GetListDiseaseTypes)
	r.GET("/GetDiseaseType/:id",controller.GetDiseaseType)

	//===========Disease===========
	r.POST("/CreateDisease",controller.CreateDisease)
	r.GET("/GetListDisease",controller.GetListDiseases)
	r.GET("/GetDisease/:id",controller.GetDisease)

	//===========Triage===========
	r.POST("/CreateTriage",controller.CreateTriage)
	r.GET("/GetListTriages",controller.GetListTriages)
	r.GET("/GetTriage/:id",controller.GetTriage)


	r.POST("/signup", controller.CreateUser)
	// login User Route
	r.POST("/login", controller.Login)
	r.GET("/user/:id",controller.GetUser)
 
  	r.Run("localhost:8080")
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT,PATCH")
     
		if c.Request.Method == "OPTIONS" {
		  c.AbortWithStatus(204)
		  return
		}
     
		c.Next()
	}
}