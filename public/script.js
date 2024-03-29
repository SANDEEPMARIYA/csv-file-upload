document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const csvFileInput = document.getElementById('csvFileInput');
    formData.append('csvFile', csvFileInput.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            displayDataInTable(data);
        } else {
            throw new Error('Failed to upload CSV file');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

function displayDataInTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';

    const table = document.createElement('table');
    const headerRow = table.insertRow();
    for (const key in data[0]) {
        const headerCell = document.createElement('th');
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    }

    data.forEach((row) => {
        const rowElement = table.insertRow();
        for (const key in row) {
            const cell = rowElement.insertCell();
            cell.textContent = row[key];
        }
    });

    tableContainer.appendChild(table);
}
