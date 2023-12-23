 let lon;
 let lat;
 let temperature = document.querySelector(".temp")
 let summary = document.querySelector(".summary")
 let loc = document.querySelector(".location")
 let icon = document.querySelector(".icon")
 const kelvin = 273.15;
    window.addEventListener("load", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                const lon = position.coords.longitude;
                const lat = position.coords.latitude;
    
                // Clave de API
                const api = "05aacfc69f8106eb6a44142832c0a440";

                // idioma api
                const lang = "es";

                //  URL de la API de OpenWeatherMap
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&lang=${lang}`;
    
                //  solicitud a la API
                fetch(url)
                    .then((resp) => {
                        console.log("RESPUESTA JSON");
                        return resp.json();
                    })
                    .then((data) => {
                        console.log("ESTA ES LA DATA")
                        console.log(data);
    
                        temperature.textContent=
                        Math.floor(data.main.temp - kelvin ) + "°C";
                        summary.textContent=data.weather[0].description;
                        loc.textContent=data.name + "," + data.sys.country;
                    });
            });
        }
    });
let GustosHelados = [];
let input = document.getElementById("helados");
let boton = document.getElementById("agregar");
let freezer = document.getElementById("freezer");
let inputEliminar = document.getElementById("inputEliminar");
let botonEliminar = document.getElementById("botonEliminar");
// uso de funciones y condiciones
window.onload = function () {
    let helados = localStorage.getItem("heladosguardados");

    if (helados) {
        GustosHelados = JSON.parse(helados);
        registro(); 
    }
};
let contadorId = 1;
boton.addEventListener("click", function () {
    let valorInput = input.value;
    if (valorInput.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, ingresa un gusto de helado antes de agregarlo",
            footer: '<a href="#">¿Por qué tengo este problema?</a>'
        });
        return; 
    }

    let objeto = {
        id: contadorId++, 
        nombre: valorInput,
        gusto: valorInput,
        fecha: new Date().toLocaleString(),
    };

    GustosHelados.push(objeto);

    freezer.innerHTML = `ID: ${objeto.id}, Gusto: ${objeto.gusto}, Fecha: ${objeto.fecha}`;
    localStorage.setItem("heladosguardados", JSON.stringify(GustosHelados));

    input.value = "";

    registro(); 
});
function reiniciarContador() {
    contadorId = 1;
}
reiniciarContador();
botonEliminar.addEventListener("click", async function () {
    let nombreEliminar = inputEliminar.value;
    
    // Utilazando confirm como operación asíncrona simulada con setTimeout
    const confirmacion = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(Swal.fire({
                title: "¿Estás seguro que quieres eliminar este gusto?",
                text: "",  // Puedes dejar el campo de texto vacío si no necesitas un texto adicional
                icon: "question"
            }));
        }, 0,5);
    });



    if (nombreEliminar && confirmacion) {
        GustosHelados = GustosHelados.filter((objeto) => objeto.nombre !== nombreEliminar);
        localStorage.setItem("heladosguardados", JSON.stringify(GustosHelados));
        registro();
        inputEliminar.value = "";
    }
});
let registro = () => {
    freezer.innerHTML = "";  // Limpiar el contenido existente

    GustosHelados.forEach(function (objeto) {
        // Acumular el HTML
        freezer.innerHTML += `ID: ${objeto.id}, Gusto: ${objeto.gusto}, Fecha: ${objeto.fecha}<br>`;
    });
};


