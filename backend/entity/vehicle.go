package entity

import (
	"time"

	"gorm.io/gorm"
)

type Vehicle struct {
	gorm.Model
	ReceivedDate time.Time
	Avaliability_status string
	Price float64
	Picture string

	VehicleTypeID uint
	VehicleType   VehicleType `gorm:"foreignKey:VehicleTypeID"`

	EmployeeID uint
	Employee   Employee `gorm:"foreignKey:EmployeeID"`

	Rents []Rent `gorm:"foreignKey:VehicleID"`
}
