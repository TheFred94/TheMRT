import { readFileSync } from 'fs'; // Import for file reading

interface User {
  id: number;
  email: string;
  password: string;
}

interface Session {
  [key: number]: string;
}

// Function to read user data from JSON file
const getUsersFromFile = async (): Promise<User[]> => {
  const userJSON = readFileSync('public/users.json', 'utf-8'); // Read user.json from public folder
  return JSON.parse(userJSON) as User[]; // Parse JSON data to User objects
};

let users: User[] = []; // Initialize empty user array

// Call getUsersFromFile on initialization to populate users array
(async () => {
  try {
    users = await getUsersFromFile();
  } catch (error) {
    console.error('Error reading user data:', error);
  }
})(); // Immediately Invoked Function Expression (IIFE) to load users on startup

let sessions: Session = {};

export const getUserByEmailAndPassword = async (
  email: string,
  password: string
): Promise<User | undefined> => {
  return users.find(
    (user) => user.email === email && user.password === password
  );
};

export const setUserSession = async (
  userId: number,
  token: string
): Promise<void> => {
  sessions[userId] = token;
};

export const getSessionByToken = async (
  token: string
): Promise<number | undefined> => {
  return parseInt(
    Object.keys(sessions).find(
      (userId) => sessions[parseInt(userId)] === token
    ) || ''
  );
};
