#builder
FROM    golang:1.18-alpine AS builder
COPY    ./LoginServer /opt/app-code/LoginServer
WORKDIR /opt/app-code/LoginServer
RUN     go mod tidy
RUN     go build -v -o ./dist/app app.go

# dist 
FROM    alpine:3.14 AS dist
COPY    --from=builder /opt/app-code/LoginServer/dist/. /opt/app-code
COPY    ./dockerfiles/micros/LoginServer/config.json /opt/app-code
WORKDIR /opt/app-code
CMD     ["./app"]