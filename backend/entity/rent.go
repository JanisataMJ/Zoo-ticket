package entity

import (
	"time"

	"gorm.io/gorm"
)

type Rent struct {
	gorm.Model
	Quantity  string 
	RentDate  time.Time 
	StartDate     time.Time  
	EndDate time.Time 
	TotalPrice float64

	// UserId ทำหน้าที่เป็น FK
	VehicleID *uint
	Vehicle   *Vehicle `gorm:"foreignKey:VehicleID"`

	// UserId ทำหน้าที่เป็น FK
	TicketBookingID *uint
	TicketBooking   *TicketBooking `gorm:"foreignKey:TicketBookingID"`
}