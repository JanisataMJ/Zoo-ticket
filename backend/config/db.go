package config

import (
	"fmt"
	"time"

	//"github.com/Tawunchai/Zootopia/entity"
	"example.com/sa-67-example/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("Zootopia.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {

	db.AutoMigrate(
		&entity.Booking{},
		&entity.Employee{},
		&entity.Gender{},
		&entity.Rent{},
		&entity.TicketBooking{},
		&entity.TicketGeneration{},
		&entity.TicketType{},
		&entity.Ticket{},
		&entity.UserRoles{},
		&entity.User{},
		&entity.VehicleType{},
		&entity.Vehicle{},
		&entity.Zone{},
	)	

	VehicleType1 := entity.VehicleType{VehicleType: "Bicycle"}
	VehicleType2 := entity.VehicleType{VehicleType: "Golf Cart"}

	db.FirstOrCreate(&VehicleType1, &entity.VehicleType{VehicleType: "Bicycle"})
	db.FirstOrCreate(&VehicleType2, &entity.VehicleType{VehicleType: "Golf Cart"})

	Vehicle1 := entity.Vehicle{
		Name:        		"A01",
		ReceivedDate: 		time.Date(2018, 5, 15, 0, 0, 0, 0, time.UTC),
		AvaliabilityStatus:	"Available",
		Price:      		20,
		QuantityVehicle:  	1,
		Picture:     		"uploads/lion.jpg",

		VehicleTypeID:		VehicleType1.ID,
		EmployeeID:			1,
	}
	
	Vehicle2 := entity.Vehicle{
		Name:        		"D01",
		ReceivedDate: 		time.Date(2018, 5, 15, 0, 0, 0, 0, time.UTC),
		AvaliabilityStatus:	"Available",
		Price:      		100,
		QuantityVehicle:  	1,
		Picture:     		"uploads/lion.jpg",

		VehicleTypeID:		VehicleType2.ID,
		EmployeeID:			1,
	}
	
	db.FirstOrCreate(&Vehicle1, entity.Vehicle{Name: "A01"})
	db.FirstOrCreate(&Vehicle2, entity.Vehicle{Name: "D01"})
	

}
