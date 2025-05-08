const form = document.getElementById('weather-form');
const result = document.getElementById('result');
const API_KEY = '31d5041b6c3bf2197f98025f4c349c63';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('city').value.trim();
    const country = document.getElementById('country').value;

    if (!city || !country) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric&lang=es`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
            result.innerHTML = `<p>Ciudad no encontrada</p>`;
            return;
        }

        const { name, main } = data;
        result.innerHTML = `
            <h2>Clima de ${name}</h2>
            <p class="current">${main.temp}°C</p>
            <div class="temperatures">
                <p>Min: <span>${main.temp_min}°C</span></p>
                <p>Max: <span>${main.temp_max}°C</span></p>
            </div>
        `;
    } catch (error) {
        result.innerHTML = `<p>Error al consultar el clima</p>`;
    }
});
