# Online-Compiler

# Compiler Phases Web App

This project is a web-based application that visualizes the different phases of a compiler, allowing users to input code and see how it progresses through various compilation stages.

## Features
- Displays the phases of a compiler
- Allows users to enter and store code in local storage
- Fetches phase-wise output from an API
- Uses Next.js for frontend development
- Displays a compiler phases image

## Installation & Setup
Follow these steps to set up and run the project locally:

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/compiler-phases.git
cd compiler-phases
```

### 2. Install Dependencies
Run the following command to install required packages:
```sh
npm install --legacy-peer-deps
```

### 3. Start the Development Server
To run the application in development mode, use:
```sh
npm run dev
```
The app will be available at `http://localhost:3000/`.

### 4. Build for Production
To create a production build, run:
```sh
npm run build
```
Then start the production server:
```sh
npm start
```

## Usage
1. Enter your code in the provided input area.
2. Select a compiler phase to process your code.
3. View the output for each phase.
4. Click again on the phase button to toggle the output.

## Troubleshooting
- If dependencies fail to install, try running `npm install --legacy-peer-deps` again.
- Ensure that Node.js (v16 or later) and npm are installed.
- If images are not loading, check if the correct path is used in the `src` attribute.

## Technologies Used
 - Next.js - React-based framework
 - Tailwind CSS - Styling
 - TypeScript - Static typing
 - localStorage - Data persistence
 - Next.js Image Component - Image optimization

## Contributing
Feel free to fork this repository and contribute! Open a pull request with your improvements.

## License
This project is licensed under the MIT License.

## Author

Developed by Saran.
For queries, reach out via saranrocker007@gmail.com

