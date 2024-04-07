# Prior Authorization Case Management System

## Overview
This project aims to develop a Prior Authorization (PA) case management system for the Utilization Management (UM) team, specifically UM nurses. The system prioritizes PA cases based on urgency and adheres to both CMS and State guidelines regarding case deadlines. It implements a state-specific scoring system for prioritization.

## Features
- **PA Case Management**: Allows UM nurses to review and manage PA cases efficiently.
- **UM Nurse Management**: Provides a platform to manage UM nurses and their expertise.
- **Scoring System**: Implements a state-specific scoring system for prioritizing PA cases.

## Assumptions
- The "providerurgency" value in PA cases is ignored in the logic due to ambiguity.
- Case distribution among nurses is based on their expertise in specific CPT codes.

## Stack Used
- **Frontend**: ReactJS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL

## Backend Design
- Utilizes PostgreSQL for data storage.
- Implements controllers, routes, and utility functions for efficient data management.
- Dynamically generates controller files for database tables.

## Frontend Design
- Utilizes React Router for managing routes.
- Implements components for the dashboard, PA cases, and UM nurses.
- Displays key metrics, data visualization, and tables for case management.

## Workload Distribution Algorithm
- Utilizes a round-robin algorithm to evenly distribute cases among nurses based on expertise and case complexity.

## Repository Structure
- **/backend**: Contains backend code including controllers, routes, and utility functions.
- **/frontend**: Contains frontend code including React components and styles.
- **/database**: Contains PostgreSQL setup and data processing scripts.

## Usage
1. Clone the repository: `git clone https://github.com/your-username/project-name.git`
2. Install dependencies: `npm install`
3. Start the backend server: `npm run start:backend`
4. Start the frontend server: `npm run start:frontend`
5. Access the application in your browser: `http://localhost:3000`

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the [MIT License](LICENSE).
