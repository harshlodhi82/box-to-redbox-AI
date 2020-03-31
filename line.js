class Line {

    constructor() {
        this.width = WH / 1.2
        this.height = 50
        this.x = WH - this.width
        this.y = WH / 2 - this.height/2
    }

    show() {
        CTX.beginPath()
        CTX.rect(this.x, this.y, this.width, this.height);
        CTX.fillStyle = "#0307fc";
        CTX.fill();
    }
}