
## Technical Choices

### Backend
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** SQLite, managed with the Knex.js query builder.
- **Environment Variables:** `dotenv` is used to manage configuration.
- **Other libraries:**
  - `tsx` for running TypeScript directly.
  - `cors` for handling cross-origin requests.
  - `xlsx` for reading data from Excel files.

### Frontend
- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router
- **State Management:** Zustand
- **HTTP Client:** Axios


## How to Install and Run

You need to run both the `backend` and the `frontend` separately.

### Backend Setup
1.  Navigate to the `backend` directory:
    cd backend
2.  Install the dependencies:
    npm install
3.  Create a `.env` file in the `backend` directory with the server port:
    PORT=5001
4.  Run the development server:
    npm run dev
    The server will start on the port specified in your `.env` file.

### Frontend Setup
1.  Navigate to the `frontend` directory:
    cd frontend
2.  Install the dependencies:
    npm install
3.  Create a `.env` file in the `frontend` directory with the API URL:
    VITE_API_URL=http://localhost:5001/api

    The port must match the `PORT` in the backend's `.env` file.*
4.  Run the development server:
    npm run dev
    The application will be available at http://localhost:5173 (or another port if 5173 is busy).

## Known Limitations

- **No Tests:** The project currently lacks an automated test suite.
- **No Authentication/Authorization:** There are no security measures to protect routes or data.