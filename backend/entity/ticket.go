package entity

import (

	"gorm.io/gorm"
)

type Ticket struct {
	gorm.Model
	Description  string 
	Price float64

	// UserId ทำหน้าที่เป็น FK
	TicketGenerationID *uint
	Generation   *TicketGeneration `gorm:"foreignKey:TicketGenerationID"`

	TicketTypeID *uint
	TicketType   *TicketType `gorm:"foreignKey:TicketTypeID"`

	TicketBookings []TicketBooking `gorm:"foreignKey:TicketID"`

}