class EndPoint{
    
    constructor(radious){
        this.width = radious
        this.height = radious
        this.x = WH/2
        this.y = radious /2
    }

    show (){
        CTX.beginPath()
        CTX.rect(this.x, this.y, this.width, this.height);
        CTX.fillStyle = "red";
        CTX.fill();
    }
}