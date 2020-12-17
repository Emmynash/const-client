import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { FIREBASE_CONFIG } from './firebaseConfig'

const config = FIREBASE_CONFIG;

class firebase {
  constructor(){
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

   // *** Auth API ***
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  
  doSignOut = () => this.auth.signOut();

  // *** User API ***
  user = (uid) => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
}

export default firebase ;