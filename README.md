<h2>Gift of Life - Organ Donation Website</h2>

<h3>Introduction</h3>

Gift of Life is a web-based platform designed to facilitate organ donation and help connect donors with recipients. The platform aims to raise awareness about organ donation, simplify the registration process for donors, and provide necessary information to those in need of organ transplants.

<h3>Features</h3>

Donor Registration: Users can sign up as organ donors by providing necessary details.

Recipient Search: Patients in need of organs can search for potential donors.

Awareness & Education: Informative resources and success stories to encourage organ donation.

Secure Database: Ensures the safety and privacy of donor and recipient information.

Admin Panel: Allows administrators to manage users and verify donor registrations.

Offline Image Upload: Users can upload images even without an internet connection, and they will be synced when online.

<h3>Technologies Used</h3>

Frontend: React.js, Bootstrap

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ORM)

Cloud Storage: Cloudinary (for online image uploads) for now i made it to store files in images folder

Offline Storage: Local storage and IndexedDB for offline image uploads

Authentication: JWT (JSON Web Token) for secure login

<h3>Installation & Setup</h3>

Prerequisites

Make sure you have the following installed:

Node.js

MongoDB (or a cloud database like MongoDB Atlas)


<h3>Steps to Run the Project</h3>

1.Clone the repository:
  git clone https://github.com/ghanshyamydv/Gift-Of-life.git
  
2.Install dependencies and run:

  open two different terminal
  
  in 1st terminal run "cd backend"
  
  npm install
  
  node --watch app.js
  
  in 2st terminal run "cd frontend"
  
  npm install
  
  npm run dev
  
  
<h3>Note: no need to configure .env images will get stored in images folder of your backend folder and it will get default port 4000</h3>

