package utils

import (
	"app/libs/dotenv"
	"fmt"
)

type Database struct {
	Ip           string
	Name         string
	Pass         string
	Port         int
	User         string
	MaxIdleConns int
	MaxOpenConns int
}

func (o *Database) ToString() string {
	return fmt.Sprintf("host=%s port=%d user=%s dbname=%s password=%s", o.Ip, o.Port, o.User, o.Name, o.Pass)
}

type Log struct {
	FileEnabled    bool
	ConsoleEnabled bool
	MaxFiles       int
	FilePrefix     string
	FileLimit      string
	Directory      string
}

type Configuration struct {
	Port         int
	CertPath     string
	KeyPath      string
	HttpsEnabled bool
	DBParams     Database
	Log          Log
}

var Config Configuration

func (o *Configuration) Load() {
	var de dotenv.DotEnv

	o.Log = Log{
		FileEnabled:    de.GetBool("LOG_FILE_ENABLED", "false", ""),
		ConsoleEnabled: de.GetBool("LOG_CONSOLE_ENABLED", "false", ""),
		MaxFiles:       int(de.GetInt("LOG_MAX_FILES", "10", "")),
		FilePrefix:     de.GetString("LOG_FILE_PREFIX", "log", ""),
		FileLimit:      de.GetString("LOG_FILE_LIMIT", "100 KB", ""),
		Directory:      de.GetString("LOG_DIRECTORY", "", ""),
	}

	o.DBParams = Database{
		Ip:           de.GetString("DB_IP", "127.0.0.1", ""),
		Name:         de.GetString("DB_NAME", "loanserver", ""),
		Pass:         de.GetString("DB_PASS", "serverpwd123456@@", ""),
		Port:         int(de.GetInt("DB_PORT", "5432", "")),
		User:         de.GetString("DB_USER", "db_user", ""),
		MaxIdleConns: int(de.GetInt("DB_MAX_IDLE", "20", "")),
		MaxOpenConns: int(de.GetInt("DB_MAX_OPEN", "20", "")),
	}

	o.Port = int(de.GetInt("APP_PORT", "7001", ""))
	o.CertPath = de.GetString("APP_CERT_PATH", "", "")
	o.KeyPath = de.GetString("APP_KEY_PATH", "", "")
	o.HttpsEnabled = de.GetBool("APP_HTTPS_ENABLED", "false", "")
}
