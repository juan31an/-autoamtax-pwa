// Firebase Configuration Template
// Copy this file to firebase-config.js and update with your actual Firebase credentials

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Para obtener estas credenciales:
// 1. Ve a https://console.firebase.google.com/
// 2. Crea un nuevo proyecto o selecciona uno existente
// 3. Ve a "Project Settings" (icono de engranaje)
// 4. Scroll down hasta "Your apps" y haz clic en "Add app" > "Web"
// 5. Registra tu app y copia las credenciales aquí
// 6. Habilita Authentication, Firestore Database y Storage en la consola

// Reglas de Firestore recomendadas para empezar:
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Los usuarios solo pueden acceder a sus propios datos
    match /shifts/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /trips/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /expenses/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Permitir a los usuarios crear nuevos documentos
    match /{document=**} {
      allow create: if request.auth != null;
    }
  }
}
*/

export default firebaseConfig;