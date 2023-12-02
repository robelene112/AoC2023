let calibrationValue = 0 // total calibration value
const characters = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

const fs = require('fs')
const readline = require('readline')

const readStream = fs.createReadStream('./input.txt')
const readLineInterface = readline.createInterface({ input: readStream, crlfDelay: Infinity})

readLineInterface.on('line', (line) => {
	let allValues = '';
	for (i = 0; i < line.length; i++) {
		if (characters.includes(line[i])) {
           allValues += line[i] 
		}
	}

    let startEndValues;
    if (allValues.length === 1) {
        allValues = allValues + allValues
        startEndValues = Number(allValues)
    } else {
        allValues = allValues[0] + allValues[allValues.length - 1]
        startEndValues = Number(allValues)
    }

    calibrationValue += startEndValues
})

readLineInterface.on('close', () => {
    console.log('Closing file')
})

