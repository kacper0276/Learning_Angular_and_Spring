# Learning_Angular_and_Spring

Learning_Angular_and_Spring is a repository designed for learning and understanding the Angular framework and the Spring framework. It includes various examples and exercises to help you get acquainted with these technologies and how they can be used together to build modern web applications.

## Description

This repository provides examples and projects to help you learn:
- **Angular**: A popular framework for building dynamic single-page applications (SPAs) using TypeScript.
  - Understanding Angular components, services, and routing.
  - Building user interfaces with Angular's templating and data binding features.
  - Using Angular Material for pre-built UI components and styling.

- **Spring**: A powerful framework for building robust and scalable backend applications using Java.
  - Understanding Spring Boot for creating stand-alone, production-grade Spring-based applications.
  - Working with Spring Data JPA for data access and Spring Security for authentication and authorization.

## Technologies

- **Angular**: A TypeScript-based framework for building client-side applications.
- **Angular Material**: A UI component library for Angular that provides pre-built components and styles to help build modern and responsive user interfaces.
- **Spring**: A Java framework for building server-side applications.
- **Spring Boot**: Simplifies the setup and development of Spring applications.
- **Spring Data JPA**: Provides a simplified data access layer.
- **Spring Security**: Handles authentication and authorization.

## Installation

To set up the project locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/kacper0276/Learning_Angular_and_Spring.git
    ```

2. **Navigate to the backend directory (Spring)**:
    ```bash
    cd Learning_Angular_and_Spring/backend
    ```

3. **Update the application configuration (if necessary)**:
    - Adjust the settings in `src/main/resources/application.properties` to match your environment.

4. **Build and run the Spring Boot application**:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```

5. **Navigate to the frontend directory (Angular)**:
    ```bash
    cd ../frontend
    ```

6. **Install frontend dependencies**:
    ```bash
    npm install
    ```

7. **Install Angular Material**:
    ```bash
    ng add @angular/material
    ```
    - Follow the prompts to set up Angular Material and choose a theme.

8. **Start the Angular development server**:
    ```bash
    ng serve
    ```

   The application will be available at [http://localhost:4200](http://localhost:4200).
