Calendar Application for Communication Tracking
Objective
The purpose of this project is to develop a React-based calendar application that helps maintain and track communications with different companies. The goal is to ensure timely follow-ups and manage the frequency of engagements based on pre-defined schedules. The application consists of three primary modules:

Admin Module for managing companies and communication parameters.
User Module for managing and performing communication tasks.
Reporting and Analytics Module (optional) for insights into the communication history.
Table of Contents
Features
Installation
Deployment
Usage
Testing
Known Limitations
Contributions
Licenses
Features
Admin Module
Company Management: Add, edit, and delete companies with details like name, location, LinkedIn profile, emails, phone numbers, comments, and communication periodicity.
Communication Method Management: Define communication methods like LinkedIn Post, LinkedIn Message, Email, Phone Call, and others. Set the sequence and mandatory flags for communication steps.
User Module
Dashboard: View and manage companies with a summary of the last five communications and the next scheduled communication.
Color-Coded Highlights: Red highlights for overdue communications, yellow for communications due today. Users can override or disable these highlights.
Communication Action: Log new communications by selecting the company and communication type (e.g., LinkedIn Post, Email), and input additional notes.
Notifications: View grids for overdue and today's communications with a badge count.
Calendar View: A calendar interface to manage past and upcoming communications.
Reporting and Analytics Module (Optional)
Communication Frequency Report: Visual representation of the frequency of each communication method used.
Engagement Effectiveness Dashboard: Metrics to track successful communication responses.
Overdue Communication Trends: A trendline or heatmap for overdue communications over time.
Downloadable Reports: Export reports in PDF or CSV formats.
Real-Time Activity Log: Live feed displaying communication activities performed.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/harshalpuri1/Calendar-Application-for-Communication-Tracking_Frontend.git
cd calendar-communication-tracking
Install dependencies:

bash
Copy code
npm install
Set up environment variables if required. Create a .env file in the root directory with the necessary configuration (e.g., API keys, database credentials).

Start the application locally:

bash
Copy code
npm start
The application will run on http://localhost:3000.

Deployment
This project is deployed on Vercel for live access.

You can view the live application here: https://calender-application-by-hp-orpin.vercel.app.

Usage
Once the application is running, users can:

Admin users can manage companies and communication methods through the admin dashboard.
Users can track communications, log interactions, and view upcoming engagements in the user dashboard.
The calendar view allows users to visualize and manage communication schedules.
Testing
We ensured the application runs smoothly by performing the following tests:

Functional testing of all features, such as adding/editing companies, communication logging, and dashboard actions.
Usability testing to ensure the user interface is intuitive and easy to navigate.
Performance testing to check for smooth rendering and data handling.
Test data has been provided for the evaluation, including mock companies, communication methods, and schedules.

Known Limitations
The Reporting and Analytics Module is optional and not implemented in the initial version. However, it can be integrated in future versions.
The application does not currently support multi-language localization.
Notifications rely on periodic checks, so there may be a slight delay in reflecting updates in the communication status.
Contributions
Feel free to fork this repository, contribute, and raise issues. Contributions are welcome!

Licenses
This project is licensed under the MIT License - see the LICENSE file for details.