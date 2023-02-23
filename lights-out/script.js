const initBoard = [
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0]
];
var lights = [];
$(document).ready(function(){
    for (let i = 0; i < 5; i++) {
        let line = [];
        for(let j = 0; j < 5; j++) {
            let light = $("#light"+(i*5+j));
            if(initBoard[i][j]) {
                light.addClass("on");
                light.children("i.fa-lightbulb").addClass("fa-regular");
            } else {
                light.addClass("off");
                light.children("i.fa-lightbulb").addClass("fa-solid");
            }
            light.click(() => toggle(i, j));

            line.push(light);
        }
        lights.push(line);
    }
    console.log(lights);
});

function toggle(x, y) {
    toggleLight(lights[x][y]);
    if(x > 0) toggleLight(lights[x-1][y]);
    if(y > 0) toggleLight(lights[x][y-1]);
    if(x < 4) toggleLight(lights[x+1][y]);
    if(y < 4) toggleLight(lights[x][y+1]);
    checkWin();
}

function toggleLight(light) {
    light.toggleClass("on");
    light.toggleClass("off");
    light.children("i.fa-lightbulb").toggleClass("fa-regular");
    light.children("i.fa-lightbulb").toggleClass("fa-solid");
}

function checkWin() {
    if($.grep($(".light"), (l, n) => l.classList.contains("on")).length == 0) {
        $("#game").removeClass("d-flex");
        $("#game").addClass("d-none");
        $("#results").removeClass("d-none");
        $("#results").addClass("d-flex");
    }
}
