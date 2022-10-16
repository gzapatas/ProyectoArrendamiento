package utils

import (
	"app/core/models"
	"app/libs/log"
	"fmt"
	"math/rand"
	"time"
	"github.com/dgrijalva/jwt-go"
)

func CreateToken(obj models.TokenObject) string{
	data := jwt.MapClaims{
		"UserId" : obj.Userid,
		"SessionKey" : obj.Sessionkey,
		"Start" : time.Now().UTC(),
	}

	certificate := jwt.NewWithClaims(jwt.SigningMethodHS256,data)
	token, err := certificate.SignedString([]byte("ABCDEFGHIJK1234"))
	
	if err != nil{
		log.Log.Error(err.Error(),"Token")
		return ""
	}

	return token
}

func DecodeToken(data string) map[string]interface{} {
	token, err := jwt.Parse(data, func(token *jwt.Token) (interface{}, error) {
		return []byte("ABCDEFGHIJK1234"), nil
	 })

	 if err != nil {
		return nil
	 }

	 if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims
	} else {
		return nil
	}
}

func generateRandomString(n int) string {
	rand.Seed(time.Now().Unix())

	const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-"
	var ret string
	for i := 0; i < n; i++ {

		num := rand.Intn(len(letters)-1)
		ret += string(letters[num])
	}

	return string(ret)
}

func GenerateSession() (bool,string) {
	now := time.Now()

	strdate := fmt.Sprintf("%04d%02d%02d%02d%02d%02d%03d", now.Year(),int(now.Month()),now.Day(),now.Hour(),now.Minute(),now.Second(),now.Nanosecond()/1000000)
	sessionkey := generateRandomString(8) + strdate

	if sessionkey == "" {
		return false, "Could not generate a session key"
	}


	return true,sessionkey
}