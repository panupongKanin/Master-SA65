package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/panupongKanin/ProjectSA-arm/entity"
)

// POST Triage
func CreateTriage(c *gin.Context){
	
	var patient entity.Patient
	var disease entity.Disease
	var ipd entity.InpantientDepartment
	var triage entity.Triage


	if err := c.ShouldBindJSON(&triage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if  err := entity.DB().Where("id = ?", triage.Patient_ID).First(&patient); err.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}
	
	if  err := entity.DB().Where("id = ?", triage.Disease_ID).First(&disease); err.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "disease not found"})
		return
	}
	if  err := entity.DB().Where("id = ?", triage.InpantientDepartment_ID).First(&ipd); err.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ipd not found"})
		return
	}
	 
	wv := entity.Triage{
		Patient:patient,
		Disease: disease,
		InpantientDepartment: ipd,
		Triage_COMMENT: triage.Triage_COMMENT,
	}

	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	
	}
	fmt.Printf("%v",wv)
	c.JSON(http.StatusOK, gin.H{"data": wv})
}
	
// GET /getTriage/:id
func GetTriage(c *gin.Context) {
	var GetTriage entity.Triage
	id := c.Param("id")
	if tx := entity.DB().Preload("Patient.Gender").Preload("Disease.DiseaseType").Preload("InpantientDepartment").Where("id = ?", id).First(&GetTriage); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "watchvideo not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": GetTriage})
}

// GET /GetListPatients
func GetListTriages(c *gin.Context) {
	var getListTriages []entity.Triage
	if err := entity.DB().Preload("Patient.Gender").Preload("Disease.DiseaseType").Preload("InpantientDepartment").Raw("SELECT * FROM triages WHERE Triage_State = 0").Find(&getListTriages).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": getListTriages})
}

func CreateIPD(c *gin.Context){

	var ipd entity.InpantientDepartment
	if err := c.ShouldBindJSON(&ipd); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&ipd).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ipd})
}

// GET /getipd/:id
func GetIPD(c *gin.Context) {
	var GetIPD entity.InpantientDepartment
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM inpantient_departments WHERE id = ?", id).Scan(&GetIPD).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}

	c.JSON(http.StatusOK, gin.H{"data": GetIPD})
}

// GET /GetListIPDs
func GetListIPDs(c *gin.Context) {
	var getipds []entity.InpantientDepartment
	if err := entity.DB().Raw("SELECT * FROM inpantient_departments").Scan(&getipds).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}

	c.JSON(http.StatusOK, gin.H{"data": getipds})
}


// POST Disease
func CreateDisease (c *gin.Context){

	var disease entity.Disease
	if err := c.ShouldBindJSON(&disease); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&disease).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": disease})
}

// GET /GetDisease/:id
func GetDisease(c *gin.Context) {
	var GetDisease entity.Disease
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM diseases WHERE id = ?", id).Scan(&GetDisease).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}

	c.JSON(http.StatusOK, gin.H{"data": GetDisease})
}

// GET /GetListDiseases
func GetListDiseases(c *gin.Context) {
	var getListDisease []entity.Disease
	if err := entity.DB().Preload("DiseaseType").Raw("SELECT * FROM diseases").Find(&getListDisease).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}

	c.JSON(http.StatusOK, gin.H{"data": getListDisease})
}

// POST DiseaseType
func CreateDiseaseType (c *gin.Context){
	var diseaseType entity.DiseaseType
	if err := c.ShouldBindJSON(&diseaseType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&diseaseType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": diseaseType})
}

// GET /GetDiseaseType/:id
func GetDiseaseType(c *gin.Context) {
	var GetDiseaseType entity.DiseaseType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM disease_types WHERE id = ?", id).Scan(&GetDiseaseType).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}

	c.JSON(http.StatusOK, gin.H{"data": GetDiseaseType})
}

// GET /GetListDiseaseTypes
func GetListDiseaseTypes(c *gin.Context) {
	var getListDiseaseTypes []entity.DiseaseType
	if err := entity.DB().Raw("SELECT * FROM disease_types").Scan(&getListDiseaseTypes).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}
	c.JSON(http.StatusOK, gin.H{"data": getListDiseaseTypes})
}

func UpdatePatient(c *gin.Context) {
	var patient entity.Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Model(patient).Where("id = ?", patient.ID).Update("Patient_State",patient.Patient_State).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patient})
}


