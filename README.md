# CustomerService
Spring boot App with frontend on React, PostgreSQL, Docker, Swagger

### Instrucion to install: ###
#### 1. Clone project. From command line: ####
> $ git clone --recursive https://github.com/Kruuten/CustomerService.git

#### 2. Build project from project directory: ####

On Linux/Mac:
> $ ./gradlew build

On Windows:
> $ gradlew build

#### 3. Deploy project with Docker (should be installed): ####
> $ docker-compose up --build

#### 4. Check app: ####
> $ Webview : http://localhost:3000/

> $ Webview only CRUD methods: http://localhost:8080/swagger
