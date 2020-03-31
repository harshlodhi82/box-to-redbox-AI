let bubbles = []
let savedBubble = []
let bestPlayers = []

let line
let endPoint
let cycle = 1
let generations = 0
let winners = 0
let avgFitness = 0
let tmp = true


const setup = () => {
    CANVAS.width = WH
    CANVAS.height = WH
    CANVAS.style.background = '#41d14a'
    line = new Line()
    endPoint = new EndPoint(RADIOUS)
    initBubbles()
    // document.addEventListener('keydown', keyPress)
    // setInterval(draw, 200)
    draw()
}

const draw = () => {
    let i = 0
    while (i < cycle) {
        CTX.clearRect(0, 0, WH, WH)
        let initData = {}
        initData.population = TOTAL_BUBBELS
        initData.generation = generations
        initData.winners = winners
        initData.mutaion = MUTATION
        initData.fitness = avgFitness
        dataInitializer(initData)
        
        //show
        line.show()
        endPoint.show()
        for (let i = 0; i < bubbles.length; i++) {
            bubbles[i].show()
        }

        //update
        for (let i = 0; i < bubbles.length; i++) {
            if (bubbles[i].interSectingWith(endPoint)) {
                // console.log("WINNER WINNER CHICKEN DINNER");
                bestPlayers.push(bubbles[i])
                winners++
                bubbleRemover(i)
            } else if (bubbles[i].interSectingWithBorder()) {
                // console.log("game over border");
                bubbleRemover(i)
            } else if (bubbles[i].interSectingWith(line)) {
                // console.log("game over line");
                bubbleRemover(i)
            } else {
                bubbles[i].think(line, endPoint)
                bubbles[i].update()
            }
        }

        if (bubbles.length === 0) {
            generations++
            if (!HAVE_BEST) nextGeneration()
            else initBubbles()
            // tmp = false
        }
        i++
    }
    if (tmp)
        window.requestAnimationFrame(draw)
}

setup()



















// let inputs = [1, 2, 3, 4, 5]
// let brain = new NeuralNetwork(5, 2, 1)
// let i = 0
// // while (i < 1000) {
// //     brain.train(inputs, [1])
// //     console.log("runn>>");
// //     i++
// // }
// let strV = `{"input_nodes":5,"hidden_nodes":2,"output_nodes":1,"learningRate":1,"weights_ih":{"mathjs":"DenseMatrix","data":[[-0.6366564620138024,-0.6545683830068798,0.7572178765868587,0.6046302415404932,1.0132750602663503],[0.14401793544401487,0.6862268501173222,-1.0700947416905462,-1.1783599564364662,0.08374739132727496]],"size":[2,5]},"weights_ho":{"mathjs":"DenseMatrix","data":[[1.9315496944821342,-0.17790828833416467]],"size":[1,2]},"bias_h":{"mathjs":"DenseMatrix","data":[[0.9457291933799081],[0.1228144070840486]],"size":[2,1]},"bias_o":{"mathjs":"DenseMatrix","data":[[2.1681106624199904]],"size":[1,1]}}`

// brain.parse(strV)
// let output = brain.predict(inputs)
// console.log(output);
