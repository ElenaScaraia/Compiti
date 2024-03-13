// Client-side JavaScript code for handling form submission
document.getElementById('preferencesForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Display result to the user
        alert(result.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
