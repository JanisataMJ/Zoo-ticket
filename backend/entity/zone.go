package entity

import "gorm.io/gorm"

type Zone struct {
    gorm.Model
    Zone        string
    Description string
    Picture     string

    TicketTypes []TicketType `gorm:"many2many:zone_ticket_types;"`
}
