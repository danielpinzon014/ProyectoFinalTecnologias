//JAVASCRIPT
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'),
        {
            center: { lat: 4.942523, lng: -74.012765 },
            zoom: 8
        });
}


// JQUERY - Ante el evento de hacer click en la opción Mapa, se llama la función de inicializar mapa.	
$(function () {
    $("a[href='#Maps']").on('shown.bs.tab', function () {
        console.log("Aqui");
        initMap();
    });
});


// JQUERY Consultar base de datos y mostrar en una tabla

$("#home-tab1").click(function () {
    submitConsulta();
});


function cargarDatos(data) {
    var rows = "";
    $("#dataTable tr").remove();
    $("#dataTable").append('<tr><td>Placa</td>' +
        '<td>Modelo</td>' +
        '<td>Campo</td>');
    for (x in data) {
        rows += `<tr><td>${data[x].placa}</td><td>${data[x].modelo}</td><td>${data[x].campo}</td></tr>`;
    }
    $("#dataTable").append(rows);

}


function submitConsulta() {
    console.log("Entró a llamar");
    fetch('http://localhost:3000/getVehiculos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(result => {
            if (result.length > 0) {
                cargarDatos(result);
            } else {
                console.log(JSON.stringify(result));
            }
        })
        .catch(error => console.log('error: ' + error));
}

// insertar información a la base de datos capturados desde interfaz gráfica

$(document).ready(function () {
    $("#vehiculoForm").submit(function (event) {
        console.log("entro");
        event.preventDefault();
        submitFormInsert();
    });
});

// Insertar datos de usuario
$(document).ready(function () {
    $("#registform").submit(function (event) {
        console.log("entro a registform");
        event.preventDefault();
        submitFormRegister();
    });
});

$(document).ready(function () {
    $("#loginform").submit(function (event) {
        console.log("entro a loginform");
        event.preventDefault();
        submitFormLogin();
    });
});


function submitFormInsert() {

    var nombre1 = $("#nombre1").val();
    var correo1 = $("#correo1").val();
    var asunto = $("#asunto").val();
    var mensaje = $("#mensaje").val();
    var object = { "nombre1": nombre1, "correo1": correo1, "asunto": asunto, "mensaje":mensaje};



    fetch('http://localhost:3000/insertMsg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object),
        cache: 'no-cache'

    })

        .then(function (response) {
            console.log("entró");
            return response.text();
        })

        .then(function (data) {
            console.log('data = ', data);
            if (data === "OK") {
                formSuccess();
                submitConsulta();
            }
            else {
                alert("Error al insertar");
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}



function submitFormRegister() {

    var nombre = $("#nombre").val();
    var apellidos = $("#apellidos").val();
    var correo = $("#correo").val();
    var username = $("#username").val();
    var password = $("#password").val();

    var user = {
        nombre,
        apellidos,
        correo,
        username,
        password,
    };


    fetch('http://localhost:3000/insertUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        cache: 'no-cache'
    }).then(function (response) {
        console.log("entró");
        return response.text();
    }).then(function (data) {
        console.log('data = ', data);
        if (data === "OK") {
            formSuccess();
            document.getElementById("registform").reset();
        } else {
            alert("Error al insertar");
        }
    }).catch(function (err) {
        console.error(err);
    });
}


function submitFormLogin() {

    var username = $("#uservalidate").val();
    var password = $("#passwordvalidate").val();

    var user = {
        username,
        password,
    };


    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        cache: 'no-cache'
    }).then(function (response) {
        console.log("entró");
        return response.text();
    }).then(function (data) {
        console.log('data = ', data);
        if (data === "OK") {
            loginSuccess();
        } else {
            alert("Contraseña o usuario incorrectos");
        }
    }).catch(function (err) {
        console.error(err);
    });
}

function loginSuccess() {
    location.href ="Cuenta.html";
    document.getElementById('obj1').classList.add("oculto");
    
}

function formSuccess() {
    alert("Datos almacenados");
}

//Contacto
