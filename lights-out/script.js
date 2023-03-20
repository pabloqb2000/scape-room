const initBoard = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
const shuffle = 50;

var interact = true;
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
    do {
        for (let i = 0; i < shuffle; i++) {
            toggle(rndInt(0,5), rndInt(0,5), check_win=false);
        }
    } while($.grep($(".light"), (l, n) => l.classList.contains("on")).length < 2);
});

function toggle(x, y, check_win=true) {
    if(!interact) return;
    toggleLight(lights[x][y]);
    if(x > 0) toggleLight(lights[x-1][y]);
    if(y > 0) toggleLight(lights[x][y-1]);
    if(x < 4) toggleLight(lights[x+1][y]);
    if(y < 4) toggleLight(lights[x][y+1]);
    if(check_win)
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
        interact = false;
        winAnim();
    }
}

async function winAnim() {
    for (let t = 0; t < 30; t++) {
        if(t < 27) {
            for(x = t%9; x >= 0; x--) {
                console.log(x);
                let y = (t%9)-x;
                if(x < 5 && y < 5) {
                    toggleLight(lights[x][y]);
                }
            }
        }
        if(t >= 3) {
            for(x = (t-3)%9; x >= 0; x--) {
                let y = ((t-3)%9)-x;
                if(x < 5 && y < 5) {
                    toggleLight(lights[x][y]);
                }
            }
        }
        await new Promise(r => setTimeout(r, 250/4));
    }

    $("#results").css("opacity", "0");
    $("#game").animate({opacity: 0}, 500, () => {
        $("#game").removeClass("d-flex");
        $("#game").addClass("d-none");
        $("#results").removeClass("d-none");
        $("#results").addClass("d-flex");
        $("#results").animate({opacity: 1}, 500)
    });

}

function rndInt(min, max) {
    return min + Math.floor(Math.random() * (max-min));
}
