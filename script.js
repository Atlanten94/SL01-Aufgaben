// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcWNv5A0JUnaprb3dMoCGwKpQEaxiku9c",
    authDomain: "sl01-aufgaben.firebaseapp.com",
    projectId: "sl01-aufgaben",
    storageBucket: "sl01-aufgaben.appspot.com",
    messagingSenderId: "407438028848",
    appId: "1:407438028848:web:d633a796db7d8bcbf1fdf5",
    measurementId: "G-F4HJBTKS19"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Save progress to Firebase
function saveProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progress = {};

    checkboxes.forEach(checkbox => {
        progress[checkbox.name] = checkbox.checked;
    });

    database.ref('pflegeformular').set(progress, (error) => {
        if (error) {
            alert('Fehler beim Speichern des Fortschritts.');
        } else {
            console.log('Fortschritt erfolgreich gespeichert.');
        }
    });
}

// Load progress from Firebase
function loadProgress() {
    database.ref('pflegeformular').once('value').then((snapshot) => {
        const progress = snapshot.val();

        if (progress) {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');

            checkboxes.forEach(checkbox => {
                checkbox.checked = progress[checkbox.name] || false;
            });
        }
    }).catch((error) => {
        console.error('Fehler beim Laden des Fortschritts:', error);
    });
}

// Reset checkboxes and clear progress from Firebase
function resetCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    database.ref('pflegeformular').remove((error) => {
        if (error) {
            alert('Fehler beim Zurücksetzen der Kontrollkästchen.');
        } else {
            alert('Kontrollkästchen erfolgreich zurückgesetzt!');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();

    // Add change event listeners to all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', saveProgress);
    });
});

