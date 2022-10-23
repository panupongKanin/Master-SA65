package controller

import (
	"github.com/panupongKanin/ProjectSA-arm/entity"
	"net/http"
	"github.com/gin-gonic/gin"
)

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