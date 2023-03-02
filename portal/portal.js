$(document).ready(function(){
    $(".nav-1").click(async function(event) {
        toggle_nav_link(".nav-1", ".nav-2");
    });
    $(".nav-2").click(async function(event) {
        toggle_nav_link(".nav-2", ".nav-1");
    });
});

function toggle_nav_link(pressed_loc, other_loc) {
    let press = $(pressed_loc);
    let other = $(other_loc);
    press.addClass("active");
    other.removeClass("active");
    $(".mcontent").toggleClass("move");
}