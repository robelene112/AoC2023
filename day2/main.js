const fs = require('fs')
const readline = require('readline')

let sumOfGameIds = 0;
const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const inputFile = fs.createReadStream('./input.txt')
const streamInterface = readline.createInterface({ input: inputFile, crlfDelay: Infinity })

streamInterface.on('line', (line) => {
    const gameId = Number(line.match(/Game (\d+):/)[1])
    const currentGame = line.split(':')[1].split(';')
    const currentGameResult = playGame(currentGame)

    if (currentGameResult) {
        sumOfGameIds += gameId
    }
})

function playGame(currentGame) {
    for (subset of currentGame) {
        const subsetArray = subset.split(',')

        for (cubes of subsetArray) {
            const digit = Number(cubes.match(/ (\d+) /)[0])
            const color = cubes.match(/s*([^ ]+)$/)[0]

            switch (color) {
                case 'red':
                    console.log('case red')
                    if (digit > maxRed) {
                        console.log('digit too big')
                        return false
                    }
                    break
                case 'blue':
                    if (digit > maxBlue) {
                        return false
                    }
                    break
                case 'green':
                    if (digit > maxGreen) {
                        return false
                    }
                    break
                default:
                    return false
            }
        }
    }
    return true
}
