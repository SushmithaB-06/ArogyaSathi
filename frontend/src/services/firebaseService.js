import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Firebase Configuration - Use import.meta.env for Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log('Firebase Config:', firebaseConfig); // For debugging

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);

// ============ AUTHENTICATION FUNCTIONS ============

// Sign Up Function
export const signUpUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user info to Firestore
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: name,
      email: email,
      createdAt: new Date(),
      language: 'en'
    });

    return user;
  } catch (error) {
    console.error('Sign up error:', error.message);
    throw error;
  }
};

// Login Function
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

// Logout Function
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error.message);
    throw error;
  }
};

// ============ FIRESTORE DATABASE FUNCTIONS ============

// Add Medicine Reminder
export const addMedicineReminder = async (userId, medicineData) => {
  try {
    const docRef = await addDoc(collection(db, 'medicineReminders'), {
      userId: userId,
      medicineName: medicineData.medicineName,
      dosage: medicineData.dosage,
      frequency: medicineData.frequency,
      startDate: medicineData.startDate,
      endDate: medicineData.endDate,
      createdAt: new Date(),
      isActive: true
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding reminder:', error.message);
    throw error;
  }
};

// Get User's Medicine Reminders
export const getUserReminders = async (userId) => {
  try {
    const q = query(collection(db, 'medicineReminders'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const reminders = [];
    querySnapshot.forEach((doc) => {
      reminders.push({ id: doc.id, ...doc.data() });
    });
    return reminders;
  } catch (error) {
    console.error('Error fetching reminders:', error.message);
    throw error;
  }
};

// Save Symptom History
export const saveSymptomsHistory = async (userId, symptoms, analysis) => {
  try {
    const docRef = await addDoc(collection(db, 'symptomsHistory'), {
      userId: userId,
      symptoms: symptoms,
      analysis: analysis,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving symptoms:', error.message);
    throw error;
  }
};

// Get Symptom History
export const getSymptomsHistory = async (userId) => {
  try {
    const q = query(collection(db, 'symptomsHistory'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const history = [];
    querySnapshot.forEach((doc) => {
      history.push({ id: doc.id, ...doc.data() });
    });
    return history;
  } catch (error) {
    console.error('Error fetching history:', error.message);
    throw error;
  }
};

export default { auth, db, signUpUser, loginUser, logoutUser };