class Bubbel {

    constructor(radious) {
        this.width = radious
        this.height = radious

        this.x = WH / 2
        this.y = WH - radious - 10
        this.speed = SPEED
        this.mover = 0
        this.brain = new NeuralNetwork(4, 3, 1)
        if (HAVE_BEST) this.brain.parse(BEST_BRAIN_DATA)

        this.score = 0
        this.fitness = 0
    }

    show() {
        CTX.beginPath()
        CTX.rect(this.x, this.y, this.width, this.height);
        CTX.stroke()
        CTX.fillStyle = 'yellow'
        CTX.fill()
    }

    update() {
        // this.score ++
        // if(this.mover === 12){
        //     this.y -= this.speed
        // }
        // else if (this.mover === 13) {
        //     this.y += this.speed
        // }
        // else 
        if (this.mover) {
            // console.log("runn");

            this.x = this.x + (this.speed * this.mover)
        }
        this.y -= (this.speed / 2)

    }

    scoreGenerator(endPoint) {
        let _x = endPoint.x - this.x
        let _y = endPoint.y - this.y
        _x = _x * _x
        _y = _y * _y
        let distance = Math.sqrt(_x + _y)
        this.score = WH - distance
    }

    think(line, endPoint) {
        let inputs = [
            this.x,
            this.y,
            line.x,
            // line.y / WH,
            // line.y + line.height / WH,
            endPoint.x
        ]
        // console.log(inputs);

        let output_data = this.brain.predict(inputs)
        let output_one = output_data._data[0][0]
        // console.log("output_one", output_one);

        // let output_two = output_data._data[1][0]

        // if (output_two > 0.5) {
        //     console.log("straight>>");
        //     console.log(output_one);
        //     this.mover = 0
        // } else 
        if (output_one > 0.5) {
            this.mover = 1
        } else {
            this.mover = -1
        }

        // if (output_two > 0.5) {
        //     this.mover = 12
        // } else {
        //     this.mover = 13
        // }
    }

    interSectingWithBorder() {
        return this.x <= 0 || this.x >= WH - this.width
            || this.y <= 0 || this.y >= WH - this.width
    }

    interSectingWith(element) {
        // return false
        return element.y + element.height >= this.y
            && element.y <= this.y + this.height
            && element.x <= this.x + this.width
            && element.x + element.width >= this.x
    }
}