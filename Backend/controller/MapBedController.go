package controller

import (

	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/panupongKanin/ProjectSA-arm/entity"
)

// POST Map_Bed

func 	CreateMapBed(c *gin.Context){

	var triage entity.Triage
	var bed entity.Bed
	var user entity.User
	var map_bed entity.Map_Bed

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 10 จะถูก bind เข้าตัวแปร map_bed
	if err := c.ShouldBindJSON(&map_bed); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 11: ค้นหา triage ด้วย id
	if tx := entity.DB().Where("id = ?", map_bed.Triage_ID).First(&triage); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "triage not found"})
		return
	}

	// 12: ค้นหา bed ด้วย id
	if tx := entity.DB().Where("id = ?", map_bed.Bed_ID).First(&bed); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bed not found"})
		return
	}

	// 13: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", map_bed.User_ID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// 14: สร้าง Mapbed
	mb := entity.Map_Bed{
		Triage_ID: map_bed.Triage_ID,         	// โยงความสัมพันธ์กับ Entity Triage
		Admidtime: map_bed.Admidtime, 		// ตั้งค่าฟิลด์ Admidtime
		Bed_ID:    map_bed.Bed_ID,                // โยงความสัมพันธ์กับ Entity Bed
		MapBed_Comment: map_bed.MapBed_Comment,
		//User_ID: map_bed.User_ID,               // โยงความสัมพันธ์กับ Entity User
	}

	// 15: บันทึก
	if err := entity.DB().Create(&mb).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mb})

}

// GET /Mapbed/:id
func GetMapBed(c *gin.Context) {
	var GetMapBed entity.Map_Bed
	id := c.Param("id")
	if err := entity.DB().Preload("Bed.Zone").Preload("Triage.Patient.Gender").Preload("Triage.Disease.DiseaseType").Preload("Triage.Ipd").Raw("SELECT * FROM map_beds WHERE id = ?", id).Scan(&GetMapBed).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}
	c.JSON(http.StatusOK, gin.H{"data": GetMapBed})
}

func UpdateTriagestate(c *gin.Context) {
	var triage entity.Triage
	if err := c.ShouldBindJSON(&triage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Model(triage).Where("id = ?", triage.ID).Update("Triage_State",triage.Triage_State).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": triage})
}


// GET /mapbeds
// return ไปให้เพื่อน
func GetListMapBeds(c *gin.Context) {
	var GetMapBeds []entity.Map_Bed
	if err := entity.DB().Preload("Bed.Zone").Preload("Triage.Patient.Gender").Preload("Triage.Disease.DiseaseType").Preload("Triage.InpantientDepartment").Raw("SELECT * FROM map_beds").Find(&GetMapBeds).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}
	c.JSON(http.StatusOK, gin.H{"data": GetMapBeds})
}


func 	CreateZone(c *gin.Context){

	var zone entity.Zone
	if err := c.ShouldBindJSON(&zone); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&zone).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": zone})

}

// GET /zone/:id
func GetZone(c *gin.Context) {
	var zone entity.Zone
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM zones WHERE id = ?", id).Scan(&zone).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}
	c.JSON(http.StatusOK, gin.H{"data": zone})
}

// GET /zones
func ListZones(c *gin.Context) {
	var zones []entity.Zone
	if err := entity.DB().Raw("SELECT * FROM zones").Scan(&zones).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}
	c.JSON(http.StatusOK, gin.H{"data": zones})
}

// POST Bed
func CreateBed(c *gin.Context){
	var bed entity.Bed
	if err := c.ShouldBindJSON(&bed); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&bed).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bed})
}

// GET /bed/:id
func GetBedName(c *gin.Context) {
	var bed entity.Bed
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT bed_name FROM beds WHERE id = ?", id).Scan(&bed).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}
	c.JSON(http.StatusOK, gin.H{"data": bed})
}

// GET /bed/:zoneid
func GetBed_by_zone(c *gin.Context) {
	var bed_by_zone []entity.Bed
	zone_id := c.Param("zoneid")
	if err := entity.DB().Raw("SELECT * FROM beds WHERE Zone_ID = ? AND Bed_State = 0", zone_id).Scan(&bed_by_zone).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}
	c.JSON(http.StatusOK, gin.H{"data": bed_by_zone})
}

// GET /beds
func ListBeds(c *gin.Context) {
	var beds []entity.Bed
	if err := entity.DB().Preload("Zone").Raw("SELECT * FROM beds").Find(&beds).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}
	c.JSON(http.StatusOK, gin.H{"data": beds})
}

func UpdateBedstate(c *gin.Context) {
	var bed entity.Bed
	if err := c.ShouldBindJSON(&bed); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Model(bed).Where("id = ?", bed.ID).Update("Bed_State",bed.Bed_State).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bed})
}
