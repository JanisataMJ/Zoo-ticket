package controller

import (
	"example.com/sa-67-example/entity"
	"example.com/sa-67-example/config"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateVehicle(c *gin.Context) {
	var vehicle entity.Vehicle
	db := config.DB()

	// รับรูปภาพ
	image, err := c.FormFile("picture")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Error receiving image: %v", err)})
		return
	}

	// สร้างโฟลเดอร์ uploads
	uploadDir := "uploads"
	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create upload directory: %v", err)})
		return
	}

	// บันทึกไฟล์รูปภาพ
	filePath := filepath.Join(uploadDir, image.Filename)
	if err := c.SaveUploadedFile(image, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to save image: %v", err)})
		return
	}

	// รับข้อมูลจากฟอร์ม
	vehicle.Name = c.PostForm("name")

	priceStr := c.PostForm("price")
	price, err := strconv.ParseFloat(priceStr, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid price format: %v", err)})
		return
	}
	vehicle.Price = price

	quantityVehicleStr := c.PostForm("quantityVehicle")
	quantityVehicle, err := strconv.ParseInt(quantityVehicleStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid quantityVehicle format: %v", err)})
		return
	}
	vehicle.QuantityVehicle = uint(quantityVehicle)

	receivedDateStr := c.PostForm("receivedDate")
	receivedDate, err := time.Parse("2006-01-02", receivedDateStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid receivedDate format: %v", err)})
		return
	}
	vehicle.ReceivedDate = receivedDate

	vehicle.AvaliabilityStatus = c.PostForm("avaliabilityStatus")

	vehicleTypeID, err := strconv.ParseUint(c.PostForm("vehicleTypeID"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid vehicleTypeID format: %v", err)})
		return
	}
	vehicle.VehicleTypeID = uint(vehicleTypeID)

	employeeID, err := strconv.ParseUint(c.PostForm("employeeID"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid employeeID format: %v", err)})
		return
	}
	vehicle.EmployeeID = uint(employeeID)

	vehicle.Picture = filePath

	// บันทึกข้อมูลในฐานข้อมูล
	if err := db.Create(&vehicle).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to create vehicle: %v", err)})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Vehicle created successfully",
		"data":    vehicle,
	})
}

func DeleteVehicle(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	var vehicle entity.Vehicle

	if err := db.Where("id = ?", id).First(&vehicle).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Animal not found"})
		return
	}

	if err := db.Delete(&vehicle).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete animal"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Animal deleted successfully"})
}

func ListVehicle(c *gin.Context) {
	var vehicle []entity.Vehicle

	db := config.DB()
	results := db.Preload("VehicleType").Preload("Employee").Find(&vehicle)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, vehicle)
}

func GetVehicleById(c *gin.Context) {
	id := c.Param("id") 
	db := config.DB()

	var vehicle entity.Vehicle

	if err := db.Preload("VehicleType").Preload("Employee").Where("id = ?", id).First(&vehicle).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}

	c.JSON(http.StatusOK, vehicle)
}

func UpdateVehicle(c *gin.Context) {
	var vehicle entity.Vehicle
	db := config.DB()

	// รับ ID ของ Vehicle ที่จะอัปเดต
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing vehicle ID"})
		return
	}

	// ค้นหาข้อมูล Vehicle จากฐานข้อมูล
	if err := db.Where("id = ?", id).First(&vehicle).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}

	// Parse ข้อมูลจากฟอร์ม
	if err := c.Request.ParseMultipartForm(32 << 20); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse form"})
		return
	}

	// อัปเดตข้อมูลฟิลด์ที่สามารถแก้ไขได้
	vehicle.Name = c.PostForm("Name")

	// อัปเดตราคา
	priceStr := c.PostForm("PriceForRent")
	if priceStr != "" {
		price, err := strconv.ParseFloat(priceStr, 64)
		if err == nil {
			vehicle.Price = price
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid price format: %v", err)})
			return
		}
	}

	// อัปเดตจำนวน
	quantityStr := c.PostForm("QuantityVehicle")
	if quantityStr != "" {
		quantity, err := strconv.ParseInt(quantityStr, 10, 64)
		if err == nil {
			vehicle.QuantityVehicle = uint(quantity)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid quantityVehicle format: %v", err)})
			return
		}
	}

	// อัปเดตวันที่รับ
	receivedDateStr := c.PostForm("ReceivedDate")
	if receivedDateStr != "" {
		receivedDate, err := time.Parse("2006-01-02", receivedDateStr)
		if err == nil {
			vehicle.ReceivedDate = receivedDate
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format"})
			return
		}
	}

	// อัปเดตสถานะการใช้งาน
	vehicle.AvaliabilityStatus = c.PostForm("Status")

	// อัปเดตชนิดของรถ
	vehicleTypeID, err := strconv.ParseUint(c.PostForm("Type"), 10, 32)
	if err == nil {
		vehicle.VehicleTypeID = uint(vehicleTypeID)
	}

	// อัปเดตพนักงานที่เกี่ยวข้อง
	employeeID, err := strconv.ParseUint(c.PostForm("EmployeeID"), 10, 32)
	if err == nil {
		vehicle.EmployeeID = uint(employeeID)
	}

	// ถ้ามีไฟล์ภาพใหม่ให้บันทึก
	file, err := c.FormFile("picture")
	if err != nil {
		fmt.Println("Error reading file:", err)
	} else {
		uploadDir := "uploads"
		if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
			return
		}

		fileName := fmt.Sprintf("%d_%s", time.Now().Unix(), file.Filename)
		filePath := filepath.Join(uploadDir, fileName)

		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			return
		}

		vehicle.Picture = fileName
	}


	// อัปเดตข้อมูลในฐานข้อมูล
	if err := db.Save(&vehicle).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to update vehicle: %v", err)})
		return
	}

	// ส่งข้อมูลที่อัปเดตกลับไป
	c.JSON(http.StatusOK, gin.H{
		"message": "Vehicle updated successfully",
		"data":    vehicle,
	})
}

/*func ServeImage(c *gin.Context) {
    fileName := c.Param("filename")
    filePath := filepath.Join("uploads", fileName)

    if _, err := os.Stat(filePath); os.IsNotExist(err) {
        c.JSON(http.StatusNotFound, gin.H{"error": "ไม่พบไฟล์"})
        return
    }

    c.Header("Cache-Control", "no-cache, no-store, must-revalidate")
    c.Header("Pragma", "no-cache")
    c.Header("Expires", "0")

    c.File(filePath)
}*/