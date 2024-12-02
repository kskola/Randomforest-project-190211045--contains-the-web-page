document.getElementById('strokeForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent form from submitting normally

    // Gather the form data into an object of features
    const features = {
        sex: document.getElementById('sex').value,
        age: document.getElementById('age').value,  
        hypertension: document.getElementById('hypertension').value,
        heart: document.getElementById('heart').value,
        married: document.getElementById('married').value,
        work: document.getElementById('work').value,
        residence: document.getElementById('residence').value,
        glucose: document.getElementById('glucose').value,
        bmi: document.getElementById('bmi').value,
        smoking: document.getElementById('smoking').value
    };

    try {
        // Call the strokeprediction function to send the data to the Flask backend
        const prediction = await strokeprediction(features);

        // Display the prediction result
        document.getElementById('result').innerHTML = `
            <p>Stroke prediction: ${prediction.prediction}</p>
            <p>The confidence level of this prediction: ${prediction.probability.toFixed(4)}</p>
        `;
    } catch (error) {
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
    }

    const ageValue = parseInt(age.value);

    if (ageValue < 1 || ageValue > 107) {
        alert('Please enter an age between 1 and 107.')
    };

    const glucoseValue = parseInt(glucose.value);

    if (glucoseValue < 55 || glucoseValue > 287) {
        alert('Please enter an average glucose level between 55 and 287.')
    };

    const bmiValue = parseInt(bmi.value);

    if (bmiValue < 11 || bmiValue > 93) {
        alert('Please enter bmi between 11 and 93.')
    };
});

async function strokeprediction(features) {
    console.log("Sending features:", features);
    const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(features),
    });

    const responseText = await response.text();
    console.log("Server response:", responseText);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
    }

    return JSON.parse(responseText);
}


<script src="{{ url_for('static', filename='script/prediction.js') }}"></script>