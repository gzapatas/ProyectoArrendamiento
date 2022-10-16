package log

import (
	"fmt"
	"time"
)

const (
	RESET   = "\x1b[0m"
	MAGENTA = "\x1b[95m"
	YELLOW  = "\x1b[33m"
	GREEN   = "\x1b[32m"
	CYAN    = "\x1b[96m"
	RED     = "\x1b[31m"
)

type LogItem struct {
	Message   string
	Timestamp string
	Directory string
}

var Log LogObject

type LogObject struct {
	MaxFiles       int
	FilePrefix     string
	FileLimit      string
	Directory      string
	ConsoleEnabled bool
	FileEnabled    bool
	MaxQueue       int
}

func (o *LogObject) addLog(level string, message string, directory string) {
	now := time.Now()
	strdate := fmt.Sprintf("%04d/%02d/%02d %02d:%02d:%02d.%03d", now.Year(), int(now.Month()), now.Day(), now.Hour(), now.Minute(), now.Second(), now.Nanosecond()/1000000)

	item := LogItem{
		Directory: directory,
		Message:   message,
		Timestamp: strdate,
	}
	o.write(level, item)
}

func (obj LogObject) write(keyColor string, log LogItem) {
	keyStr := fmt.Sprintf("%s%s%s", keyColor, log.Directory, RESET)
	fmt.Printf("%s | %s | %s\n", keyStr, log.Timestamp, log.Message)
}

func (o *LogObject) Warning(message string, directory string) {
	o.addLog(YELLOW, message, directory)
	o.Trace(message)
}

func (o *LogObject) Information(message string, directory string) {
	o.addLog(CYAN, message, directory)
	o.Trace(message)
}

func (o *LogObject) Error(message string, directory string) {
	o.addLog(RED, message, directory)
	o.Trace(message)
}

func (o *LogObject) Panic(message string, directory string) {
	o.addLog(RED, message, directory)
	o.Trace(message)
	time.Sleep(1 * time.Second)
	panic(message)
}

func (o *LogObject) Trace(message string) {
	o.addLog(GREEN, message, "Trace")
}
