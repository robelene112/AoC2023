const fs = require('fs')

const inputFile = fs.readFileSync('./example_input.txt', {encoding: 'utf8', flag: 'r'})
const lines = inputFile.split('\n').slice(0, -1)

let cardNum = 1

for (i = 0; i < lines.length; i++) {
    console.log('Logging line ..')
    console.log(lines[i])
    let totalWinningNums = 0
    const line = lines[i].match(/Card\s*\d+\s*:\s*(.*)/)[1]
    const winningNumbers = line.split('|')[0].split(' ').filter((string) => string !== '')
    const ourNumbers = line.split('|')[1].split(' ').filter((string) => string !== '')

    console.log(winningNumbers)
    console.log(ourNumbers)

    for (const num of ourNumbers) {
        if (winningNumbers.includes(num)) {
           totalWinningNums++ 
        }
    }

    console.log(`found ${totalWinningNums} winning numbers in card ${cardNum}\n`)
    cardNum++
}

// build tree
/*
 * {
 *      value: # of winning numbers e.g. 4 for card num 1
 *      next: undefined, type array
 *
 * }
 *
 *
 */
function buildTree(rootNode) {
    // test how many of our numbers are winning numbers of the rootNode
    // play the second game
    // play the third game
    // play the fourth
    // play the fifth
    // play fifth again
    
}
// traverse tree
// count all the nodes
// add node count to total
