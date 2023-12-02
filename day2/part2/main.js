const fs = require('fs')
const readline = require('readline')

let powerSum = 0;

const inputFile = fs.createReadStream('./input.txt')
const streamInterface = readline.createInterface({ input: inputFile, crlfDelay: Infinity })

streamInterface.on('line', (line) => {
    const gameId = Number(line.match(/Game (\d+):/)[1])
    const currentGame = line.split(':')[1].split(';')
    let maxRed = 0
    let maxGreen = 0
    let maxBlue = 0

    console.log('New current game: ')
    console.log(currentGame)

    for (subset of currentGame) {
        const subsetArray = subset.split(',')
        console.log('new subsetarray')
        console.log(subsetArray)

        for (cubes of subsetArray) {
            const digit = Number(cubes.match(/ (\d+) /)[0])
            const color = cubes.match(/s*([^ ]+)$/)[0] 
            console.log('new color, digit: ')
            console.log(color, digit)
            switch(color) {
                case 'red':
                    if (digit > maxRed) {
                        maxRed = digit
                    }
                    break
                case 'green':
                    if (digit > maxGreen) {
                        maxGreen = digit
                    }
                    break
                case 'blue':
                    if (digit > maxBlue) {
                        maxBlue = digit
                    }
                    break
                default:
                    console.log('invalid color____________')
                    break
            }
        }
    }
    const power = maxRed * maxGreen * maxBlue
    powerSum += power
})

console.log(powerSum)

streamInterface.on('close', () => {
    console.log('File closed...')
})

