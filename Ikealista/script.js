$(document).ready(function(){
    // Collapsable
    $(".reviews").click(async function(event) {
        let txt = $(".reviews").children(".underline").text();
        txt = txt == "Ver reseñas" ? "Ocultar reseñas" : "Ver reseñas";
        $(".collapsable").slideToggle(500, function () {
            $(".reviews").children(".underline").text(txt);
        });
    });
});