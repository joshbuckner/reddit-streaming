## Available Scripts

In the project directory, you can:

### Build the Docker image

`docker build -t reddit-streaming:dev .`

### Create a new container instance on Windows

`docker run -v %cd%:/app -v /app/node_modules -p 3001:3000 --rm reddit-streaming:dev`

### Create a new container instance on Mac

`docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm reddit-streaming:dev`

Open [http://localhost:3001](http://localhost:3001) to view it in the browser.