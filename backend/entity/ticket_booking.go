package entity

import (
	"time"

	"gorm.io/gorm"
)

type TicketBooking struct {
	gorm.Model
	VisitDate        time.Time
	QuantityCustomer uint
	TotalPrice       float64
	Checking         bool

	// กำหนด Foreign Key สำหรับ Ticket
	TicketID *uint
	Ticket   Ticket `gorm:"foreignKey:TicketID"`

	// กำหนด Foreign Key สำหรับ Booking
	BookingID *uint
	Booking   Booking `gorm:"foreignKey:BookingID"`

	// อ้างอิง Rents และกำหนด Foreign Key ให้ชัดเจน
	Rents []Rent `gorm:"foreignKey:TicketBookingID"`
}
