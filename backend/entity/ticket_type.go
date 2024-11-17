package entity

import "gorm.io/gorm"

type TicketType struct {
    gorm.Model
    TicketType string

    Zones []Zone `gorm:"many2many:zone_ticket_types;"`
}
