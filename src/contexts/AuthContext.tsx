import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

interface AuthContextType {
  currentUser: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password
  async function signUp(email: string, password: string) {
    try {
      console.log('Attempting to sign up with:', { email, password: password ? '***' : 'empty' });
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Sign up successful!');
    } catch (error: any) {
      console.error('Error signing up:', error);
      
      // Provide more helpful error messages
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('An account with this email already exists. Please sign in instead or use a different email.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password is too weak. Please use at least 6 characters.');
      } else if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Email/password sign up is not enabled. Please contact support.');
      } else {
        throw error;
      }
    }
  }

  // Sign in with email and password
  async function signIn(email: string, password: string) {
    try {
      console.log('Attempting to sign in with:', { email, password: password ? '***' : 'empty' });
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful!');
    } catch (error: any) {
      console.error('Error signing in:', error);
      
      // Provide more helpful error messages
      if (error.code === 'auth/invalid-credential') {
        throw new Error('Invalid email or password. If you signed up with Google, please use the "Sign In with Google" button instead.');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email. Please sign up first.');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed sign-in attempts. Please try again later.');
      } else {
        throw error;
      }
    }
  }

  // Sign in with Google
  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  // Sign out
  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  // Reset password
  async function resetPassword(email: string) {
    try {
      console.log('Attempting to send password reset email to:', email);
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent successfully!');
    } catch (error: any) {
      console.error('Error sending password reset email:', error);
      
      // Provide more helpful error messages
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email address. Please check the email or sign up first.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many password reset attempts. Please try again later.');
      } else {
        throw new Error(error.message || 'Failed to send password reset email. Please try again.');
      }
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    resetPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
