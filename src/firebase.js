import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDa733T9Xi4BeV3WDLMUsDHaBe57pVxvB0",
    authDomain: "mern-netflix-clone-1c105.firebaseapp.com",
    projectId: "mern-netflix-clone-1c105",
    storageBucket: "mern-netflix-clone-1c105.appspot.com",
    messagingSenderId: "729327054319",
    appId: "1:729327054319:web:33ce835ff59685348d9a1a",
    measurementId: "G-ZSK88WW8JM"
  };

  initializeApp(firebaseConfig);
  const storage = getStorage();
  export default storage;