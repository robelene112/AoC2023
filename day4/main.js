const fs = require('fs')
const readline = require('readline')

const inputFile = fs.createReadStream('./input.txt')
const streamInterface = readline.createInterface({input: inputFile, crlfDelay: Infinity})

// Total points overall
let sumOfPoints = 0

streamInterface.on('line', (line) => {
    // Total points for this scratchcard
    let sumOfScratchcardPoints = 0

    // Bunch of line parsing
    line = line.match(/Card\s*\d+\s*:\s*(.*)/)[1]
    const winningNumbers = line.split('|')[0].split(' ').filter((string) => string !== '')
    const ourNumbers = line.split('|')[1].split(' ').filter((string) => string !== '')

    // Check if any of our numbers match the winning numbers
    for (const number of ourNumbers) {
        if (winningNumbers.includes(number)) {
            if (sumOfScratchcardPoints === 0) {
                sumOfScratchcardPoints = 1
            } else {
                sumOfScratchcardPoints = sumOfScratchcardPoints * 2
            }
        }
    }
    sumOfPoints += sumOfScratchcardPoints
})

streamInterface.on('close', () => {
    console.log('sumof points: ')
    console.log(sumOfPoints)
    console.log('Closing file...')
})
