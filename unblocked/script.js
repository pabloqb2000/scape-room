var nRows = 6; // rows
var nCols = 6; // cols
const exit = 2;
var boardEnabled = true;
var bBoard = [];

let blocks = [
    new block(0, 0, 2, true , 0),
    new block(3, 0, 2, true , 1),
    new block(2, 1, 2, true , 2),
    new block(4, 1, 2, true , 3),
    new block(4, 3, 2, true , 4),
    new block(3, 3, 2, true , 5),
    new block(1, 0, 2, false, 6),
    new block(0, 3, 2, false, 7),
    new block(0, 4, 3, false, 8),
    new block(0, 5, 3, false, 9),
    new block(0, 2, 2, false, 10, true)
];



$(document).ready(function(){
    let board = $("#board");
    for(let j = 0; j < nRows; j++) {
        let bRow = [];
        board.append("<div class='board-row d-flex'></div>");
        for(let i = 0; i < nCols; i++) {
            $(".board-row")
                .last()
                .append(`<div class='board-cell' id='cell-${i}-${j}'></div>`);
            bRow.push(false);
        }
        bBoard.push(bRow);
    }

    let size = Math.min($(window).width()*0.08, 50) + 4;
    $(".exit").css("transform", `translate(${size*nCols+7}px, ${size*exit}px)`)
    blocks.forEach(b => b.instantiate());
});