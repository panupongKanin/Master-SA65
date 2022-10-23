package controller

import (
	"github.com/panupongKanin/ProjectSA-arm/entity"
	"net/http"
	"github.com/gin-gonic/gin"
)

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