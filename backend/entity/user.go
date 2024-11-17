package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username  string	
	Password  string	
	Email     string	
	FirstName string    
   	LastName  string    
	Birthday  time.Time	
	Profile   string 

	// UserRoleID ทำหน้าที่เป็น FK
	UserRoleID uint 
	UserRole   *UserRoles `gorm:"foreignKey: UserRoleID" `

	// GenderID ทำหน้าที่เป็น FK
	GenderID  uint    
   	Gender    *Gender  `gorm:"foreignKey: GenderID"`

	// 1 user สามารถมีได้ 1 TutorProfile 
	Employee  *Employee  `gorm:"foreignKey:UserID"`

	// 1 user สามารถมีได้ 1 TutorProfile 
	Booking  *Booking  `gorm:"foreignKey:UserID"`
}