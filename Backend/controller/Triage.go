package controller

import (
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



