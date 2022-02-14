# CustomerService
Spring boot App with frontend on React, PostgreSQL, Docker, Swagger

### Instrucion to install: ###
#### 1. Download project. From command line: ####
> $ git clone --recursive https://github.com/Kruuten/CustomerService.git

#### 2. Enter project directory: ####
> $ cd download_folder/CustomerService

#### 3. Build project: ####

On Linux/Mac:
> $ ./gradlew build

On Windows:
> $ gradlew build

#### 4. Deploy project with Docker (should be installed): ####
> $ docker-compose up --build

#### 5. Check app: ####
> $ Webview : http://localhost:3000/

> $ Webview only CRUD methods: http://localhost:8080/swagger
