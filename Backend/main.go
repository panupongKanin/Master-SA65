package main

import (
	"github.com/gin-gonic/gin"
	"github.com/panupongKanin/ProjectSA-arm/controller"
	"github.com/panupongKanin/ProjectSA-arm/entity"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	// ================= 01 ===========================
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
	r.GET("/GetPatient/:id", controller.GetPatient)
	r.POST("/CreatePatient", controller.CreatePatient)

	// ================= 02 ===========================
	//===========IPD===========
	r.POST("/CreateIPD", controller.CreateIPD)
	r.GET("/GetListIPDs", controller.GetListIPDs)
	r.GET("/GetIPD/:id", controller.GetIPD)

	//===========DiseaseType===========
	r.POST("/CreateDiseaseType", controller.CreateDiseaseType)
	r.GET("/GetListDiseaseType", controller.GetListDiseaseTypes)
	r.GET("/GetDiseaseType/:id", controller.GetDiseaseType)

	//===========Disease===========
	r.POST("/CreateDisease", controller.CreateDisease)
	r.GET("/GetListDisease", controller.GetListDiseases)
	r.GET("/GetDisease/:id", controller.GetDisease)

	//===========Triage===========
	r.POST("/CreateTriage", controller.CreateTriage)
	r.GET("/GetListTriages", controller.GetListTriages)
	r.GET("/GetTriage/:id", controller.GetTriage)

	r.PATCH("/UpdatePatientstate", controller.UpdatePatient)

	//=========== Main Table Mapping Bed ===========
	r.POST("/CreateMapBed", controller.CreateMapBed)
	r.GET("/GetListMapBeds", controller.GetListMapBeds)
	r.GET("/GetMapBed/:id", controller.GetMapBed)
	//=========== Main Table Mapping Bed ===========

	//===========Zone===========
	r.POST("/CreateZone", controller.CreateZone)
	r.GET("/GetListZones", controller.ListZones)
	//===========Bed===========
	r.POST("/CreateBed", controller.CreateBed)
	r.GET("/GetListBeds", controller.ListBeds)
	r.GET("/Bed/:zoneid", controller.GetBed_by_zone)
	r.GET("/GetBedName/:id", controller.GetBedName)

	r.PATCH("/UpdateBedstate", controller.UpdateBedstate)
	r.PATCH("/UpdateTriagestate", controller.UpdateTriagestate)

	// ================= 04 ======================================
	//===========Level===========
	r.POST("/CreateLevel",controller.CreateLevel)
	r.GET("/GetListLevels",controller.ListLevel)
	r.GET("/GetLevel/:id",controller.GetLevel)

	//=========== Main Table Symptom ===========
	r.POST("/CreateSymptom",controller.CreateSymptom)
	r.GET("/GetListSymptoms",controller.ListSymptom)
	r.GET("/GetSymptom/:id",controller.GetSymptom)
	//=========== Main Table Symptom ===========
	
	

	// ====================== 05 ===============================

	//Nutrition Router
	r.GET("/nutritions", controller.ListNutritions)
	r.GET("/nutrition/:id", controller.GetNutrition)
	//Manage Router
	r.POST("/CreateManage", controller.CreateManage)
	r.GET("/ListManage", controller.ListManage)


	// ====================== 06 ===============================

	r.GET("/ListMedicine", controller.ListMedicine)
	r.GET("/ListWhere", controller.ListWhere)
	// r.POST("/CreateWhere", controller.CreateWhere)
	r.GET("/ListBasket", controller.ListBasket)
	r.POST("/CreateBasket", controller.CreateBasket)

	//  TODO ==================== 07 ==========================
	// POST /visitrecord
	r.POST("/CreateVisitRecord", controller.CreateVisitRecord)
	// GET /visitrecord/:id
	r.GET("/GetVisitRecord/:id", controller.GetVisitRecord)
	// GET /visitrecord
	r.GET("/ListVisitRecords", controller.ListVisitRecords)

	// POST /visitortypes
	r.POST("/CreateVisitorType", controller.CreateVisitorType)
	// GET /visitortype/:id
	r.GET("/GetVisitorType/:id", controller.GetVisitorType)
	// GET / visitortype
	r.GET("/ListVisitorTypes", controller.ListVisitorTypes)

	
	r.POST("/signup", controller.CreateUser)
	// login User Route
	r.POST("/login", controller.Login)
	r.GET("/user/:id", controller.GetUser)

	r.Run()
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
