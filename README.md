# hotel
-- in development processes -- 

# Hotel Management System

Welcome to the Hotel Management System project . This system is designed to provide a comprehensive solution for hotel operations, including room booking, guest reporting of faults, and task management for workers and managers. This README.md file will guide you through the project, its features, setup, and usage.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)

## Introduction

The Hotel Management System is a web-based application built with React for the front end, NestJS for the server, and MongoDB for the database. It provides an integrated solution for hotel operations, offering the following key features:

- **Room Booking System:** Guests can book rooms online with ease, check availability, and make reservations according to their preferences.

- **Fault Reporting:** Guests can report issues or faults in their rooms, such as broken fixtures or faulty appliances, dirt, ensuring a seamless and comfortable stay.

- **Task Management:** Hotel staff, designated as "works," can access a dashboard to receive, and complete tasks assigned by guests. These tasks may include fixing reported issues or fulfilling guest requests.

- **Managerial Controls:** Hotel managers can manage the workers, oversee the tasks assigned to users,  and allocate tasks to the appropriate staff members.

This project aims to streamline hotel operations, enhance the guest experience, and improve task management for the hotel's workforce.

## Features

- **Room Booking System**
    - User-friendly interface for room selection and reservation.
    - Real-time availability check.
        
- **Fault Reporting**
    - Guest reporting of issues or faults.
    - Logging and tracking of reported faults.
    - Prioritization of fault resolution.

- **Task Management**
    - Workers (hotel staff) dashboard for task assignment and tracking.
    - Assignment of tasks to appropriate staff members.
    - Task status updates and completion tracking.

- **Managerial Controls**
    - Manager dashboard for task management.
    - Performance monitoring of tasks and staff.
    - Add or edit worker


## Getting Started

### Prerequisites

Before setting up the Hotel Management System, ensure you have the following prerequisites:

- Node.js and npm installed on your development machine.
- MongoDB database installed and running.
- A web server to serve the React front end and NestJS server.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/hotel-management-system.git
    ```

2. **Front End Setup:**
    - Navigate to the `client` directory and install dependencies by running:
      ```bash
      cd client
      npm install
      ```

3. **Server Setup:**
    - Navigate to the `server` directory and install server dependencies by running:
      ```bash
      cd server
      npm install
      ```
    
4. **Database Configuration:**
    - Create a MongoDB database for the application.
    - Configure the database connection in the server's `config` file.

5. **Web Server Configuration:**
    - Configure your web server to serve the React front end and NestJS server.

6. **Initialize Database:**
    - Run any necessary database migrations or seed data as required by your NestJS application.

7. **Web Application Setup:**
    - Configure application settings, such as the server's URL, in the React front end.

8. **Start the Application:**
    - Start the React front end and NestJS server.

9. **Access the Application:**
    - Open your web browser and navigate to the application's URL.

## Usage

Once the Hotel Management System is set up, here's how to use the system:

- **Guests:**
    - Access the system and use the Room Booking feature to reserve rooms.
    - Report any issues or faults in the rooms using the Fault Reporting feature.

- **Workers (Hotel Staff):**
    - Log in to the User Dashboard to view and manage assigned tasks.
    - Update task status.

- **Managers:**
    - Log in to the Manager Dashboard to oversee task management.
    - Assign, reassign, and monitor task performance.
    - Add or edit workers.




