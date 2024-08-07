// Your web app's Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB3a7mBkYun-pW-reZ90qDzWKxM-Nntbc0",
    authDomain: "dienstaufgaben-42703.firebaseapp.com",
    databaseURL: "https://dienstaufgaben-42703-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dienstaufgaben-42703",
    storageBucket: "dienstaufgaben-42703.appspot.com",
    messagingSenderId: "308022795905",
    appId: "1:308022795905:web:8d395d93530aaf368ef780",
    measurementId: "G-WDLP80WGEB"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function saveProgress() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const progress = {};

  checkboxes.forEach(checkbox => {
    progress[checkbox.name] = checkbox.checked;
  });

  set(ref(database, 'pflegeformular'), progress)
    .then(() => {
      console.log('Fortschritt erfolgreich gespeichert.');
    })
    .catch((error) => {
      console.error('Fehler beim Speichern des Fortschritts:', error);
    });
}

function loadProgress() {
  const progressRef = ref(database, 'pflegeformular');
  get(progressRef).then((snapshot) => {
    if (snapshot.exists()) {
      const progress = snapshot.val();
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');

      checkboxes.forEach(checkbox => {
        checkbox.checked = progress[checkbox.name] || false;
      });
    }
  }).catch((error) => {
    console.error('Fehler beim Laden des Fortschritts:', error);
  });
}

function resetCheckboxes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  remove(ref(database, 'pflegeformular'))
    .then(() => {
      alert('Kontrollkästchen erfolgreich zurückgesetzt!');
    })
    .catch((error) => {
      alert('Fehler beim Zurücksetzen der Kontrollkästchen.');
      console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadProgress();

  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', saveProgress);
  });
});

// Zeit in Stunden und Minuten, zu der die Kontrollkästchen zurückgesetzt werden sollen
const resetHour = 4; // 18 Uhr
const resetMinute = 55; // 00 Minuten

// Funktion zum Zurücksetzen der Kontrollkästchen
function resetCheckboxes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  remove(ref(database, 'pflegeformular'))
    .then(() => {
      console.log('Kontrollkästchen erfolgreich zurückgesetzt!');
    })
    .catch((error) => {
      console.error('Fehler beim Zurücksetzen der Kontrollkästchen:', error);
    });
}

// Überprüft jede Minute, ob es Zeit ist, die Kontrollkästchen zurückzusetzen
setInterval(() => {
  const now = new Date();
  if (now.getHours() === resetHour && now.getMinutes() === resetMinute) {
    resetCheckboxes();
  }
}, 60000); // alle 60 Sekunden (1 Minute)


