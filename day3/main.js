/* 
    0123456789

0   467..114..
1   ...*......  (3, 1) 
2   ..35..633.                                      (-1, -1); (0, -1); (+1, -1); (-1, 0); (+1, 0); (-1, +1); (0, +1); (+1, +1)
3   ......#...
4   617*......
5   .....+.58.
6   ..592.....
7   ......755.
8   ...$.*....
9   .664.598..
*/

const fs = require('fs')
const readline = require('readline')

const inputfile = fs.createReadStream('./input.txt')
const fileInterface = readline.createInterface({ input: inputfile, crlfDelay: Infinity })

const symbolsList = ['*', '#', '$', '+', '/', '@', '=', '%', '&']
let lines = []
let rowIndex = 0;
let numberCoordinates = []
let symbolCoordinates = []
let allNumbers = []

fileInterface.on('line', (line) => {

    // take line length
    const lineLength = line.length
    lines.push([])
    console.log('New line:')
    console.log(line)

    // loop over each line
    for (i = 0; i < lineLength; i++) {
        lines[rowIndex].push(line[i])
        let newNumber = ''

        if (symbolsList.includes(line[i])) {
            // get symbol coordinates
            symbolCoordinates.push([i, rowIndex])
        }
    }
    console.log(format(lines[rowIndex]))
    rowIndex++
    console.log('\n')


})

fileInterface.on('close', () => {
    console.log('Closing file...')
    // look for adjecent places
    for (i = 0; i < symbolCoordinates.length; i++) {
        const [column, row] = symbolCoordinates[i]
        console.log('symbol coordinate: ')
        console.log(column, row)

        if (!isNaN(Number(lines[row - 1][column - 1]))) {
            console.log('found a digit!')
            console.log(Number(lines[row - 1][column - 1]))
            grabWholeNumber([column - 1, row - 1])
        }

        if (!isNaN(Number(lines[row][column - 1]))) {
            console.log('found a digit!')
            console.log(Number(lines[row][column - 1]))
            grabWholeNumber([column - 1, row])
        }

        if (!isNaN(Number(lines[row + 1][column - 1]))) {
            console.log('found a digit!')
            console.log(Number(lines[row + 1][column - 1]))
            grabWholeNumber([column - 1, row + 1])
        }

        if (!isNaN(Number(lines[row - 1][column]))) {
            console.log('found a digit!')
            console.log(Number(lines[row - 1][column]))
            grabWholeNumber([column, row - 1])
        }

        if (!isNaN(Number(lines[row + 1][column]))) {
            console.log('found a digit!')
            console.log(Number(lines[row + 1][column]))
            grabWholeNumber([column, row + 1])
        }

        if (!isNaN(Number(lines[row - 1][column + 1]))) {
            console.log('found a digit!')
            console.log(Number(lines[row - 1][column + 1]))
            grabWholeNumber([column + 1, row - 1])
        }

        if (!isNaN(Number(lines[row][column + 1]))) {
            console.log('found a digit!')
            console.log(Number(lines[row][column + 1]))
            grabWholeNumber([column + 1, row])
        }

        if (!isNaN(Number(lines[row + 1][column + 1]))) {
            console.log('found a digit!')
            console.log(Number(lines[row + 1][column + 1]))
            grabWholeNumber([column + 1, row + 1])
        }
    }

    const uniqueArray = allNumbers.filter((value, index, self) => {
        return (
            self.findIndex(
                (item) =>
                    item.number === value.number &&
                    item.col === value.col &&
                    item.row === value.row
            ) === index
        );
    });

    let totalSum = 0;
    for (i = 0; i < uniqueArray.length; i++) {
        totalSum += Number(uniqueArray[i].number)
    }

    console.log('Final answer: ')
    console.log(totalSum)

})
// find the whole number (how?)
function grabWholeNumber(numberCoords) {
    const [column, row] = numberCoords;
    let numberAsString = { number: lines[row][column], col: column, row: row }
    //console.log('Grabbing whole number: ')
    //console.log(numberAsString)

    for (j = 1; j < 3; j++) {
        if (!isNaN(Number(lines[row][column + j]))) {
            numberAsString.number += lines[row][column + j]
        } else {
            break
        }
    }

    for (j = 1; j < 3; j++) {
        if (!isNaN(Number(lines[row][column - j]))) {
            numberAsString.number = lines[row][column - j] + numberAsString.number
            numberAsString.col = column - j
        } else {
            break
        }
    }

    //for (l = 0; l < allNumbers.length; l++) {
    //console.log('here')
    //if (allNumbers[l].col !== numberAsString.col && allNumbers[l].row !== numberAsString.row) {
    //console.log('hereeeee')
    allNumbers.push(numberAsString)
    //}
    //}
    console.log('allnumbers: ')
    console.log(allNumbers)
    console.log(numberAsString)
}

function format(arr) {
    return '[' + arr.join(', ') + ']'
}
