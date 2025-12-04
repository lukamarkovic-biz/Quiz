# Koristi Alpine verziju Node.js
FROM node:18-alpine AS builder

# Postavi radni direktorijum
WORKDIR /usr/src/app

# Kopiraj samo listu paketa za instalaciju
COPY package*.json ./

# Instaliraj zavisnosti
RUN npm install

# Kopiraj ostatak aplikacije
COPY . .

# Izvrši gradnju aplikacije
RUN npm run build

# Pokreni aplikaciju
CMD ["npm", "run", "start:prod"]
