"use strict"
class NeuralNetwork {
    test = 5
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes
        this.hidden_nodes = hidden_nodes
        this.output_nodes = output_nodes
        this.learningRate = 1

        this.weights_ih = math.zeros(this.hidden_nodes, this.input_nodes)
        this.weights_ho = math.zeros(this.output_nodes, this.hidden_nodes)

        this.weights_ih = this.randomize(this.weights_ih)
        this.weights_ho = this.randomize(this.weights_ho)

        this.bias_h = math.zeros(this.hidden_nodes, 1)
        this.bias_o = math.zeros(this.output_nodes, 1)

        this.bias_h = this.randomize(this.bias_h)
        this.bias_o = this.randomize(this.bias_o)
    }


    predict(inputs) {
        inputs = this.mapInputs(inputs)
        inputs = math.matrix(inputs)

        let w_x_i = math.multiply(this.weights_ih, inputs)
        let hiddenValues = math.add(w_x_i, this.bias_h)
        let sigmoid_hiddenValues = this.sigmoidThis(hiddenValues)

        let w_x_h = math.multiply(this.weights_ho, sigmoid_hiddenValues)
        let outputValues = math.add(w_x_h, this.bias_o)
        let sigmoid_outputValues = this.sigmoidThis(outputValues)

        return sigmoid_outputValues
    }


    train(inputs, targets) {
        inputs = this.mapInputs(inputs)
        inputs = math.matrix(inputs)

        targets = this.mapInputs(targets)
        targets = math.matrix(targets)

        let w_x_i = math.multiply(this.weights_ih, inputs)
        let hiddenValues = math.add(w_x_i, this.bias_h)
        let sigmoid_hiddenValues = this.sigmoidThis(hiddenValues)

        let w_x_h = math.multiply(this.weights_ho, sigmoid_hiddenValues)
        let outputValues = math.add(w_x_h, this.bias_o)
        let sigmoid_outputValues = this.sigmoidThis(outputValues)

        let errors_in_op = math.subtract(targets, sigmoid_outputValues)
        let errors_in_hidden = math.multiply(math.transpose(this.weights_ho), errors_in_op)

        // DELTA = LEARNING_RATE * ERROR * GRADIENT * TRANSPOSE_INPUT
        let gradient_ho = this.desigmoidThis(sigmoid_outputValues)
        let err_gradient_ho = math.dotMultiply(errors_in_op, gradient_ho)
        let delta_in_who = math.dotMultiply(this.learningRate, err_gradient_ho)
        delta_in_who = math.multiply(delta_in_who, math.transpose(sigmoid_hiddenValues))

        this.weights_ho = math.add(this.weights_ho, delta_in_who)
        this.bias_o = math.add(this.bias_o, err_gradient_ho)

        let gradient_ih = this.desigmoidThis(sigmoid_hiddenValues)
        let err_gradient_ih = math.dotMultiply(errors_in_hidden, gradient_ih)
        let delta_in_wih = math.dotMultiply(this.learningRate, err_gradient_ih)
        delta_in_wih = math.multiply(delta_in_wih, math.transpose(inputs))

        this.weights_ih = math.add(this.weights_ih, delta_in_wih)
        this.bias_h = math.add(this.bias_h, err_gradient_ih)
    }


    //temp
    mutate_temp(dad_brain, mom_brain, dad_fitness, mom_fitness, mutationPoint) {
        let co1_r = math.randomInt(0, this.hidden_nodes)
        let co1_c = math.randomInt(0, this.input_nodes)
        let co1 = math.zeros(this.hidden_nodes, this.input_nodes)

        let co2_r = math.randomInt(0, this.output_nodes)
        let co2_c = math.randomInt(0, this.hidden_nodes)
        let co2 = math.zeros(this.output_nodes, this.hidden_nodes)

        let b1_r = math.randomInt(0, this.hidden_nodes)
        let b1_c = math.randomInt(0, 1)
        let b1 = math.zeros(this.hidden_nodes, 1)

        let b2_r = math.randomInt(0, this.output_nodes)
        let b2_c = math.randomInt(0, 1)
        let b2 = math.zeros(this.output_nodes, 1)



        if (dad_fitness > mom_fitness) {

            co1 = dad_brain.weights_ih.map(function (value, index, matrix) {
                let _row = index[0]
                let _col = index[1]
                if (_row <= co1_r && _col <= co1_c) {
                    return value + mutationPoint
                } else {
                    return mom_brain.weights_ih._data[_row][_col] + mutationPoint
                }
            })

            co2 = dad_brain.weights_ho.map(function (value, index, matrix) {
                let _row = index[0]
                let _col = index[1]
                if (_row <= co2_r && _col <= co2_c) {
                    return value + mutationPoint
                } else {
                    return mom_brain.weights_ho._data[_row][_col] + mutationPoint
                }
            })

            b1 = dad_brain.bias_h.map(function (value, index, matrix) {
                let _row = index[0]
                let _col = index[1]
                if (_row <= b1_r && _col <= b1_c) {
                    return value + mutationPoint
                } else {
                    return mom_brain.bias_h._data[_row][_col] + mutationPoint
                }
            })

            b2 = dad_brain.bias_o.map(function (value, index, matrix) {
                let _row = index[0]
                let _col = index[1]
                if (_row <= b2_r && _col <= b2_c) {
                    return value + mutationPoint
                } else {
                    return mom_brain.bias_o._data[_row][_col] + mutationPoint
                }
            })

        } else {
            co1 = mom_brain.weights_ih.map(function (value, index, matrix) {
                let _row = index[0]
                let _col = index[1]
                if (_row <= co1_r && _col <= co1_c) {
                    return value + mutationPoint
                } else {
                    return dad_brain.weights_ih._data[_row][_col] + mutationPoint
                }
            })

            co2 = mom_brain.weights_ho.map(function (value, index, matrix) {
                let _row = index[0]
                let _col = index[1]
                if (_row <= co2_r && _col <= co2_c) {
                    return value + mutationPoint
                } else {
                    return dad_brain.weights_ho._data[_row][_col] + mutationPoint
                }
            })

            b1 = mom_brain.bias_h.map(function (value, index, matrix) {
                let _row = index[0]
                let _col = index[1]
                if (_row <= b1_r && _col <= b1_c) {
                    return value + mutationPoint
                } else {
                    return dad_brain.bias_h._data[_row][_col] + mutationPoint
                }
            })

            b2 = mom_brain.bias_o.map(function (value, index, matrix) {
                let _row = index[0]
                let _col = index[1]
                if (_row <= b2_r && _col <= b2_c) {
                    return value + mutationPoint
                } else {
                    return dad_brain.bias_o._data[_row][_col] + mutationPoint
                }
            })
        }

        this.weights_ih = co1
        this.weights_ho = co2
        this.bias_h = b1
        this.bias_o = b2

    }

    crossOver(dad_brain, mom_brain) {
        this.weights_ih = this.crossOver_helper(this.weights_ih, dad_brain.weights_ih, mom_brain.weights_ih)
        this.weights_ho = this.crossOver_helper(this.weights_ho, dad_brain.weights_ho, mom_brain.weights_ho)

        this.bias_h = this.crossOver_helper(this.bias_h, dad_brain.bias_h, mom_brain.bias_h)
        this.bias_o = this.crossOver_helper(this.bias_o, dad_brain.bias_o, mom_brain.bias_o)
    }

    crossOver_helper(my_matrix, dad_matrix, mom_brain) {
        let my_matrix_size = math.size(my_matrix)
        let size = my_matrix_size._data[0] * my_matrix_size._data[1]
        let crossOverPoint = Math.floor(size / 2)
        let i = 0
        my_matrix = my_matrix.map((v, index) => {
            let _row = index[0]
            let _col = index[1]
            if (i <= crossOverPoint) {
                i++
                return dad_matrix._data[_row][_col]
            } else {
                i++
                return mom_brain._data[_row][_col]
            }

        })
        return my_matrix
    }

    mutate(mutate_value) {
        this.weights_ih = this.mutate_helper(this.weights_ih, mutate_value)
        this.weights_ho = this.mutate_helper(this.weights_ho, mutate_value)
        this.bias_h = this.mutate_helper(this.bias_h, mutate_value)
        this.bias_o = this.mutate_helper(this.bias_o, mutate_value)
    }

    mutate_helper(myMatrix, mutation_value) {
        myMatrix = myMatrix.map((v) => {
            let n = math.random(0, 1)
            if (n < mutation_value) {
                return math.random(-1, 1)
            } else {
                return v
            }
        })
        return myMatrix
    }

    randomize(matrix) {
        matrix = matrix.map((v) => {
            return math.random(-1, 1)
        })
        return matrix
    }

    mapInputs(input = []) {
        input = input.map(elm => [elm])
        return input
    }

    sigmoid(t) {
        return 1 / (1 + Math.pow(Math.E, -t));
    }

    sigmoidThis(matrix) {
        matrix = matrix.map((v) => {
            return this.sigmoid(v)
        })
        return matrix
    }

    desigmoid(y) {
        return y * (1 - y)
    }

    desigmoidThis(matrix) {
        matrix = matrix.map((v) => {
            return this.desigmoid(v)
        })
        return matrix
    }

    print(data, name) {
        console.log(">>>>>>>", name);
        console.table(data._data);

    }

    stringfy() {
        return JSON.stringify(this)
    }

    parse(strJSON) {
        let data = JSON.parse(strJSON)
        Object.assign(this.weights_ih, math.matrix(data.weights_ih.data))
        Object.assign(this.weights_ho, math.matrix(data.weights_ho.data))
        Object.assign(this.bias_h, math.matrix(data.bias_h.data))
        Object.assign(this.bias_o, math.matrix(data.bias_o.data))
    }

}