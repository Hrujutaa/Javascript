const locations = {
    Maharashtra: [
        "Mumbai",
        "Pune",
        "Nagpur",
        "Nashik"
    ],
    Karnataka: [
        "Bengaluru",
        "Mysuru",
        "Hubli"
    ],
    Gujarat: [
        "Ahmedabad",
        "Surat",
        "Vadodara"
    ]
};

const stateDropdown = document.getElementById("state");
const cityDropdown = document.getElementById("city");

// Load states
for (let state in locations) {
    let option = document.createElement("option");
    option.value = state;
    option.text = state;
    stateDropdown.appendChild(option);
}

stateDropdown.addEventListener("change", () => {

    cityDropdown.innerHTML =
        '<option value="">Select City</option>';

    const selectedState = stateDropdown.value;

    locations[selectedState].forEach(city => {
        let option = document.createElement("option");
        option.value = city;
        option.text = city;
        cityDropdown.appendChild(option);
    });

});

const apiKey = "ca7709a59431760c88bf8d1fbdbb68dc";

cityDropdown.addEventListener("change", async () => {

    const city = cityDropdown.value;

    const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("weather").innerHTML = `
        <h3>${city}</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Wind: ${data.wind.speed} m/s</p>
    `;
});