# Instructions go here if you didn't know what to do

#Uses node version 22 as our base image
FROM node:22

# Goes to the app directory (think of it like a cd terminal command)
WORKDIR /src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of our app into the container
COPY . .

# Set port environment variable 
ENV PORT=8080

# Expose the port so our computer can access it
EXPOSE 8080

# # Run the app
# CMD ["npm", "run", "dev"]

# Generate Prisma client at runtime (with real env vars)
CMD ["sh", "-c", "npx prisma generate && npm run dev"]