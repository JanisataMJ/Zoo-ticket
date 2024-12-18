package controller

/*import (
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

func CreateTicketBooking(c *gin.Context) {
	var vehicle entity.TicketBooking
	db := config.DB()

	VisitDate        time.Time
	QuantityCustomer uint
	TotalPrice       float64
	Checking         bool
	TicketID
	BookingID

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
}*/