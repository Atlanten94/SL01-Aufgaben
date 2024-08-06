function saveProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progress = {};

    checkboxes.forEach(checkbox => {
        progress[checkbox.name] = checkbox.checked;
    });

    localStorage.setItem('pflegeformularProgress', JSON.stringify(progress));
    alert('Fortschritt gespeichert!');
}

function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('pflegeformularProgress'));

    if (progress) {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            checkbox.checked = progress[checkbox.name] || false;
        });
    }
}

function resetCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    localStorage.removeItem('pflegeformularProgress');
    alert('Kontrollkästchen zurückgesetzt!');
}

document.addEventListener('DOMContentLoaded', loadProgress);
