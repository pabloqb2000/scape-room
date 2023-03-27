class block {
    constructor(x, y, len, isVert, id, isMain=false) {
        this.x = x;
        this.y = y;
        this.len = len;
        this.isVert = isVert;
        this.id = id;
        this.isMain = isMain;
        this.duration = 100;
    }

    instantiate() {
        let id = `block-${this.id}-`;
        let cssClass = `block ${this.isMain ? "main" : ""} block-${this.id}`;
        if(this.len == 1) {
            this.spawnBlock(this.x, this.y, cssClass, id+"0")
        } else if (this.isVert) {
            this.spawnBlock(this.x, this.y, cssClass+" v-start", id+"0");
            for(let i = 1; i < this.len-1; i++) {
                this.spawnBlock(this.x, this.y+i, cssClass+" v-block", id+i);
            }
            this.spawnBlock(this.x, this.y+this.len-1, cssClass+" v-end", id+(this.len-1).toString());
        } else {
            this.spawnBlock(this.x, this.y, cssClass+" hb h-start", id+"0");
            for(let i = 1; i < this.len-1; i++) {
                this.spawnBlock(this.x+i, this.y, cssClass+" hb h-block", id+i);
            }
            this.spawnBlock(this.x+this.len-1, this.y, cssClass+" hb h-end", id+(this.len-1).toString());
        }

        // Add callbacks
        $(`.block-${this.id}`)
            .mouseenter(() => this.mouseEnter())
            .mouseleave(() => this.mouseLeave())
            .click(() => this.click())
    }

    spawnBlock(x, y, cssClass, id) {
        bBoard[y][x] = true;
        this.htmlId = id;
        $(`#cell-${x}-${y}`).append(`<div class='${cssClass}' id='${id}'></div>`);
    }

    mouseEnter() {
        $(`.block-${this.id}`).addClass("hover");
    }

    mouseLeave() {
        $(`.block-${this.id}`).removeClass("hover");
    }

    click() {
        if(boardEnabled) {
            boardEnabled = false;
            if(this.isVert) this.moveY()
            else this.moveX()
        }
    }

    moveX() {
        let xR = this.x + this.len;
        let step = 0;
        if(xR < nCols && !bBoard[this.y][xR]) {
            step = this.movesRight();
        } else if (this.x > 0 && !bBoard[this.y][this.x-1]) {
            step = this.movesLeft();
        } 
        if(step == 0){ 
            boardEnabled=true;
            return;
        }
        if(this.isMain && this.x + this.len + step == nCols) {
            this.winAnim();
            return;
        }
        
        for(let i = 0; i < this.len; i++) 
            bBoard[this.y][this.x+i] = false;
        for(let i = 0; i < this.len; i++) 
            bBoard[this.y][this.x+step+i] = true;
        this.x += step;

        let size = Math.min($(window).width()*0.08, 50) + 4;
        $(`.block-${this.id}`).animate({ 
            left: `+=${size*step}px`,
          }, {duration: this.duration, complete:function() {boardEnabled=true;}} );
    }

    moveY() {
        let yB = this.y + this.len;
        let step = 0;
        if(yB < nRows && !bBoard[yB][this.x]) {
            step = this.movesDown();
        } else if (this.y > 0 && !bBoard[this.y-1][this.x]) {
            step = this.movesUp();
        }
        if(step == 0){ 
            boardEnabled=true;
            return;
        }
        
        for(let i = 0; i < this.len; i++) 
            bBoard[this.y+i][this.x] = false;
        for(let i = 0; i < this.len; i++) 
            bBoard[this.y+step+i][this.x] = true;
        this.y += step;

        let size = Math.min($(window).width()*0.08, 50) + 4;
        $(`.block-${this.id}`).animate({ 
            top: `+=${size*step}px`,
          }, {duration: this.duration, complete:function() {boardEnabled=true;}} );
    }

    movesRight() {
        let xR = this.x + this.len;
        let step = 0;
        for(let i = xR; i < nCols; i++) {
            if(bBoard[this.y][i]) break;
            step++;
        }
        return step;
    }

    movesLeft() {
        let step = 0;
        for(let i = this.x-1; i >= 0; i--) {
            if(bBoard[this.y][i]) break;
            step++;
        }
        return -step;
    }

    movesDown() {
        let yB = this.y + this.len;
        let step = 0;
        for(let i = yB; i < nRows; i++) {
            if(bBoard[i][this.x]) break;
            step++;
        }
        return step;
    }
    
    movesUp() {
        let step = 0;
        for(let i = this.y-1; i >= 0; i--) {
            if(bBoard[i][this.x]) break;
            step++;
        }
        return -step;
    }

    winAnim() {
        let size = Math.min($(window).width()*0.08, 50) + 4;
        $(`.block-${this.id}`).animate(
            { 
                left: `+=${size*this.len + Math.min($(window).width())}px`,
            }, 
            {
                duration: 500, complete: function() {
                    $('.cont').animate(
                        {height:"0px"},
                        {duration: 250, complete: function() {
                            $('.end-pannel')
                                .collapse('toggle')
                                .animate({opacity: 1}, 500)
                        }});
                } 
            });
    }
}