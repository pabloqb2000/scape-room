$(document).ready(function(){
    $(".nav-1").click(async function(event) {
        toggle_nav_link(".nav-1", ".nav-2");
    });
    $(".nav-2").click(async function(event) {
        toggle_nav_link(".nav-2", ".nav-1");
    });
    $("#consultar").on("click", consultar)
    toggle_nav_link(".nav-2", ".nav-1"); //TODO: Borrar
});

function toggle_nav_link(pressed_loc, other_loc) {
    let press = $(pressed_loc);
    let other = $(other_loc);
    press.addClass("active");
    other.removeClass("active");
    $(".mcontent").toggleClass("move");
}

async function consultar() {
    if(confirm("¿Estás seguro/a de que deseas hacer la consulta? Las respuestas deben ser correctas y la referencia catastral coincidir con la planta y piso seleccionados.")) {
        let values = "";
        values += $("#catastral-ref").val();
        values += $("#data1").val();
        values += $("#data2").val();
        values += $("#data3").val();
        values += $("#data4").val();
        values += $("#data5").val();
        
        const salt1 = "4247a2fc3e1869";
        const salt2 = "fb247668b10fda";
        var hash1 = await sha256(values + salt1);
        var hash2 = await sha256(values + salt2);

        const access_token = "98e424dee807af01f7a23050e37515eb5c2d0c586fcd39483e6f27b3648af882";

        /**
         * Eh listillx!
         * ¿Qué te pensabas?
         * Efectivamente, no tengo lana para pagar un backend para el scape-room.
         * Espero poder retenerte con esta chapuza de hashes y que sigas el scape-room
         * por la vía normal.
         * Ya que has demostrado un extra de ingenio, te dejo un meme de regalo:
         * https://raw.githubusercontent.com/pabloqb2000/scape-room/main/memes/meme02.png
         * Mándame un correo si quieres mi paypal para pagarme un backend ;)
         */
        if(hash1 == access_token){
            window.location.href = "escrituras_" + hash2.substring(0,4) + ".pdf";
        } else {
            window.location.href = "cagaste.html";
        }
    }
}


async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message.toLowerCase());                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}