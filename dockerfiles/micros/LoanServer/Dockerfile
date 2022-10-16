#builder
FROM    golang:1.18-alpine AS builder
COPY    ./LoanServer /opt/app-code/LoanServer
WORKDIR /opt/app-code/LoanServer
RUN     go mod tidy
RUN     go build -v -o ./dist/app app.go

# dist 
FROM    alpine:3.14 AS dist
COPY    --from=builder /opt/app-code/LoanServer/dist/. /opt/app-code
COPY    ./dockerfiles/micros/LoanServer/config.json /opt/app-code
WORKDIR /opt/app-code
CMD     ["./app"]