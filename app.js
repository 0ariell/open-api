const formClima = document.getElementById("formClima");
const resultado = document.getElementById("resultado");

// apiKey de openWeather
const apiKey = "6261117538cb0ff86044f701a33c518d";

formClima.addEventListener("submit", async (event) => {
  event.preventDefault();

  const ciudad = document.getElementById("ciudad").value.trim();

  if (ciudad === "") {
    Swal.fire("Error", "Debes ingresar una ciudad", "error");
    return;
  }

  await obtenerClima(ciudad);
});

async function obtenerClima(ciudad) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Ciudad no encontrada");

    const data = await response.json();

    mostrarClima(data);
  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
}

function mostrarClima(data) {
  const { name, main, weather } = data;
  resultado.innerHTML = `
    <h2>Clima en ${name}</h2>
    <p><strong>Temperatura:</strong> ${Math.round(main.temp)} °C</p>
    <p><strong>Humedad:</strong> ${main.humidity}%</p>
    <p><strong>Condiciones:</strong> ${weather[0].description}</p>
  `;
}
