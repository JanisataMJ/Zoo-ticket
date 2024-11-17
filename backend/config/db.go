package config

import (
	"fmt"

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
}
