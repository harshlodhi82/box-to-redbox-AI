const keyPress = (event) => {
    for (let i = 0; i < TOTAL_BUBBELS; i++) {
        if (event.key === 'ArrowRight') {
            bubbles[0].mover = 1
        } else if (event.key === 'ArrowLeft') {
            bubbles[0].mover = -1
        }
        else if (event.key === 'ArrowUp') {
            bubbles[i].mover = 12
        } else if (event.key === 'ArrowDown') {
            bubbles[i].mover = 13
        }
    }
}

const bubbleRemover = (index) => {
    savedBubble.push(bubbles.splice(index, 1)[0])
}

const initBubbles = () => {
    for (let i = 0; i < TOTAL_BUBBELS; i++) {
        bubbles[i] = new Bubbel(RADIOUS)
    }
    savedBubble = []
}

const compare = (a, b) => {
    let fitness1 = a.fitness
    let fitness2 = b.fitness
    let comp = 0
    if (fitness1 > fitness2) {
        comp = 1
    } else if (fitness1 < fitness2) {
        comp = -1
    }
    return comp
}

const calculateFitness = () => {
    let sum = 0
    for (let i = 0; i < savedBubble.length; i++) {
        savedBubble[i].scoreGenerator(endPoint)
        sum = sum + savedBubble[i].score
    }
    // console.log("sum>>>>>>>", sum);
    let fit_sum = 0
    let parentBubbles = []
    for (let i = 0; i < savedBubble.length; i++) {
        savedBubble[i].fitness = savedBubble[i].score / WH
        fit_sum += savedBubble[i].fitness

        let n = Math.floor(savedBubble[i].fitness * 100)
        // console.log(n);
        for (let j = 0; j < n; j++) {
            parentBubbles.push(savedBubble[i])
        }
    }
    // let avg_fitness = fit_sum / savedBubble.length
    // fit.innerText = `Average fitness: ${avg_fitness}`
    avgFitness = fit_sum / savedBubble.length
    // savedBubble = savedBubble.sort(compare)

    return parentBubbles
}



const nextGeneration = () => {
    // console.log("new Generation...");

    let parentBubbles = calculateFitness()
    // console.log(parentBubbles);
    if (parentBubbles.length > 0) {
        for (let i = 0; i < TOTAL_BUBBELS; i++) {
            let ranIndex1 = math.randomInt(0, parentBubbles.length)
            let ranIndex2 = math.randomInt(0, parentBubbles.length)
            // console.log("RAN>>>", ranIndex1, ranIndex2);

            let dad = parentBubbles[ranIndex1]
            let mom = parentBubbles[ranIndex2]
            // console.log(dad, mom);
            bubbles[i] = mutateNewChild(dad, mom)
        }
    } else {
        console.log("Population should be greater then 1.");
    }
    savedBubble = []
}

const mutateNewChild = (dad, mom) => {
    let child = new Bubbel(RADIOUS)
    child.brain.crossOver(dad.brain, mom.brain)
    child.brain.mutate(MUTATION)
    return child
}

btn1.onclick = () => {
    cycle = 1
}

btn2.onclick = () => {
    cycle = 5
}

btn3.onclick = () => {
    cycle = 10
}

btn4.onclick = () => {
    cycle = 15
}

btn5.onclick = () => {
    cycle = 20
}

btn6.onclick = () => {
    if (bestPlayers.length > 0) {
        let bestPlayer = bestPlayers[bestPlayers.length - 1]
        BEST_BRAIN_DATA = bestPlayer.brain.stringfy()
        TOTAL_BUBBELS = 1
        HAVE_BEST = true
        // downloadHelper(data, 'Brain.json')
    } else {
        console.log("There is no best Agent!");
    }
}

const downloadHelper = (content, name) => {
    let elm = document.createElement('a')
    let data = new Blob([content], { type: 'json' });
    elm.setAttribute('download', name)
    elm.setAttribute('href', URL.createObjectURL(data))
    elm.click()
}

const dataInitializer = (data) => {
    fit.innerText = (data.fitness) ? data.fitness : '00'
    mutaionElm.innerText = (data.mutaion) ? `${data.mutaion * 100}%` : '00'
    gener.innerText = (data.generation) ? data.generation : '00'
    popu.innerText = (data.population) ? data.population : '00'
    winnersElm.innerText = (data.winners) ? data.winners : '00'
}