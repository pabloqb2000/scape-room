$(document).ready(function(){
    $("#login").click(async function(event) {
        event.preventDefault();
        if(!$("#inputEmail").val() ||
            !$("#inputPassword").val() ) {
            return;
        }

        var email = $("#inputEmail").val();
        var pwd = $("#inputPassword").val();
        const salt1 = "4247a2fc3e1869";
        const salt2 = "fb247668b10fda";
        var hash1 = await sha256(pwd + salt1);
        var hash2 = await sha256(pwd + salt2);

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
        if(email == "pablo.guzman@loserre.com" && hash1 == "fd6e74eacc943d5d155cc6ef9a2c92e3081b491e05e3bee56f9b30a3e3393d98"){
            window.location.href = "mail_" + hash2.substring(0,4) + ".html";
        } else {
            $("#hint")
                .css("height", "0px")
                .animate({height: "40px"}, 500);
        }
    })
});

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