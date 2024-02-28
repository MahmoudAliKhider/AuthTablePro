
React Authentication and Table Application
This is a React.js application that includes authentication functionality using Auth.js (previously NextAuth) and a table displaying client data. The application follows the T3 stack.

Features
Authentication
Users can sign up using either their email and password or their Google account.
Users can log in using their email and password, Google account, or a magic link.
Only logged-in users can add, edit, or delete records in the table.
Table
Pagination and Dynamic Row Size:

The table is paginated with a dynamic row size to enhance user experience.
Add New Record:

Pressing "Add New" inserts a blank editable row at the beginning of the table.
The row fields are empty, and users can insert data one by one.
The "Status" field is a dropdown with options: Verified, Pending, or Rejected, represented by corresponding icons.
A checkmark button saves the record to the database.
Edit Record:

Selecting a record and clicking on the "Edit" button makes that row's fields editable.
Database Integration:

The data in the table is fetched from a database table named "Clients," separate from the "Users" table.
Screenshots
[Insert Screenshots or Gifs here]

Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/react-auth-table-app.git
Change into the project directory:
bash
Copy code
cd react-auth-table-app
Install dependencies:
bash
Copy code
npm install
Set up Auth.js (NextAuth) configurations:

[Provide instructions or refer to Auth.js documentation]

Run the application:

bash
Copy code
npm start
The application should now be running on http://localhost:3000.

Usage
[Provide details on how to use the application, including authentication and table interactions.]

Contributors
[Your Name]
License
This project is licensed under the MIT License.
