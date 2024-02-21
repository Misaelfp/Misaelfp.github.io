let points = [];

document.addEventListener("DOMContentLoaded", function () {
    // Cargar puntos almacenados al cargar la página
    loadPoints();
    showPointList();
});

function addPoint() {
    const point = document.getElementById('pointInput').value;
    const temperature = document.getElementById('temperatureInput').value;
    const humidity = document.getElementById('humidityInput').value;
    const date = new Date().toLocaleString();

    const newPoint = {
        id: new Date().getTime(), // ID único para cada punto
        point: point,
        temperature: temperature,
        humidity: humidity,
        date: date
    };

    points.unshift(newPoint); // Agregar el nuevo punto al principio del array
    savePoints();
    document.getElementById('topographyForm').reset();
    showPointList();
}

function showPointList() {
    const pointListContainer = document.getElementById('pointList');
    pointListContainer.innerHTML = '<h2>Lista de Puntos</h2>';

    if (points.length === 0) {
        pointListContainer.innerHTML += '<p>No hay puntos registrados.</p>';
    } else {
        pointListContainer.innerHTML += '<ul>';
        points.forEach(point => {
            pointListContainer.innerHTML += `
                <li>
                    ${point.point} - Temp: ${point.temperature}°C, Humedad: ${point.humidity}%, Fecha: ${point.date}
                    <button onclick="editPoint(${point.id})">Editar</button>
                    <button onclick="deletePoint(${point.id})">Eliminar</button>
                </li>`;
        });
        pointListContainer.innerHTML += '</ul>';
    }
}

function savePoints() {
    localStorage.setItem('topographyPoints', JSON.stringify(points));
}

function loadPoints() {
    const storedPoints = localStorage.getItem('topographyPoints');
    if (storedPoints) {
        points = JSON.parse(storedPoints);
    }
}

function editPoint(id) {
    const pointIndex = points.findIndex(point => point.id === id);
    if (pointIndex !== -1) {
        const editedPoint = prompt('Editar punto (Punto, Temperatura, Humedad):', `${points[pointIndex].point}, ${points[pointIndex].temperature}, ${points[pointIndex].humidity}`);
        
        if (editedPoint !== null) {
            const [editedPointValue, editedTemperature, editedHumidity] = editedPoint.split(',').map(value => value.trim());

            points[pointIndex].point = editedPointValue;
            points[pointIndex].temperature = editedTemperature;
            points[pointIndex].humidity = editedHumidity;

            savePoints();
            showPointList();
        }
    }
}

function deletePoint(id) {
    const confirmDelete = confirm('¿Seguro que quieres eliminar este punto?');
    if (confirmDelete) {
        points = points.filter(point => point.id !== id);
        savePoints();
        showPointList();
    }
}

function exportPoints() {
    const pointsList = points.map(point => `• ${point.point} - Temp: ${point.temperature}°C, Humedad: ${point.humidity}%, Fecha: ${point.date}`).reverse().join('\n');
    const blob = new Blob([pointsList], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'puntos.txt';
    a.click();
}



