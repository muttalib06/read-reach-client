import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import AuthContext from "./AuthContext";
import auth from "../firebase/firebase.config";

// google provider object;

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // create user with email and password;
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signIn with google account

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // sign in with email and password;
  const signIn = (email,password) => {
    return signInWithEmailAndPassword(auth,email,password)
  }

  // signout

  const logOut = () => {
    return signOut(auth)
  }

  // update firebase profile;

  const updateUserProfile = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  // observer of user Auth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // auth information;

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    updateUserProfile,
    signInWithGoogle,
    logOut,
    signIn
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
