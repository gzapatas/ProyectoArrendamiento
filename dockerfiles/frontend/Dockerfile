#builder
FROM    node:15.4 as build 
ARG     stage
COPY    ./cliente /opt/react-app
WORKDIR /opt/react-app
RUN     npm i
RUN     REACT_APP_STAGE=${stage} npm run build --verbose

# dist 
FROM    nginx:1.19
COPY    ./dockerfiles/frontend/nginx.conf /etc/nginx/nginx.conf
COPY    --from=build /opt/react-app/build /usr/share/nginx/html