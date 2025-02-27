# Bus Scheduling and Management System (MERN Stack)

This is a full-stack web application for managing bus scheduling and operations. It includes features for managing buses, drivers, conductors, routes, and bus stops.

## 📌 Project Features
- Create and manage buses, drivers, and conductors.
- Define bus stops and map them to create routes.
- Assign buses to routes along with conductors and drivers.
- Visualize routes on a map.

## 🚀 Getting Started

### **1️⃣ Clone the Repository**
```sh
git clone <repository-url>
```
Replace `<repository-url>` with your actual GitHub repository link.

Move into the project folder:
```sh
cd <project-folder-name>
```

---

### **2️⃣ Set Up MongoDB Atlas**
Since this project uses MongoDB, follow these steps to set up your database:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up (if you don’t have an account).
2. Create a new **cluster** and choose a free tier.
3. Click on **Connect** and select **Connect your application**.
4. Copy the provided **MongoDB connection string**.
5. Update the `.env` file in the `backend` folder:
   ```sh
   URI=mongodb+srv://<username>:<password>@<cluster-url>/bus_management
   ```
   Replace `<username>`, `<password>`, and `<cluster-url>` with your actual database credentials.
6. In MongoDB Atlas, make sure your **IP address is whitelisted** in the **Network Access** section to allow connections.
7. Test your connection using:
   ```sh
   npm run test-db
   ```
   If successful, it means your backend can communicate with the database.

---

### **3️⃣ Install Dependencies**
#### **Backend Setup**
1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the backend server:
   ```sh
   npm run dev  # or yarn dev
   ```

#### **Frontend Setup**
1. Move to the `frontend` folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the frontend development server:
   ```sh
   npm start  # or yarn start
   ```

---

### **4️⃣ Run the Project**
- The **backend** will run on `http://localhost:5000` (or the port specified in `.env`).
- The **frontend** will run on `http://localhost:3000`.

Make sure both servers are running simultaneously to fully use the application.

---

## 📌 Additional Notes
- If you encounter permission issues, try running commands with `sudo` (Mac/Linux).
- If a port is already in use, modify it in the `.env` file or `package.json`.
- Ensure that MongoDB Atlas allows connections from your IP address (Manage in Network Access settings in MongoDB Atlas).

Now you're ready to use the Bus Scheduling and Management System! 🚍🚀

