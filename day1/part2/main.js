let calibrationValue = 0 // total calibration value
let lineNumber = 1
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
const numbersAsWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
let mappedNumbers = {}

for (i = 0; i < numbersAsWords.length; i++) {
	mappedNumbers[numbersAsWords[i]] = numbers[i]
}

console.log(mappedNumbers)

const fs = require('fs')
const readline = require('readline')

const readStream = fs.createReadStream('./input.txt')
const readLineInterface = readline.createInterface({ input: readStream, crlfDelay: Infinity })

readLineInterface.on('line', (line) => {
	// loop over line
	// if line[i] === o or t or f or s or e or n
	// let currentWord = ''
	console.log(`Line number: ${lineNumber++}, line reads:\n${line}`)
	let allValues = ''
	for (i = 0; i < line.length; i++) {
		if (numbers.includes(line[i])) {
			// It's a number, add to allValues
			allValues += line[i]
		} else {
			// 'abcdefghijklmnopqrstuvwxyz' -> 'one' || 'two' || 'three' etc...
			// 1. check if line[i] === 'o' || 't' || 'f' etc...
			// 2. if it is, 
			// 3. if it isn't, continue, do nothing.
			const charsLeft = line.length - i

			if (charsLeft < 3) {
				continue
			}

			switch (line[i]) {
				case 'o':
					if (line[i+1] === 'n' && line[i+2] === 'e') {
						allValues += '1'
					}
					break
				case 't':
					if (charsLeft > 4) {
						if (line[i+1] === 'h' && line[i+2] === 'r' && line[i+3] === 'e' && line[i+4] === 'e') {
							allValues += '3'
							break
						}
					}
					if (line[i+1] === 'w' && line[i+2] === 'o') {
						allValues += '2'
						break
					}
				case 'f':
					if (charsLeft > 3) {
						if (line[i+1] === 'o' && line[i+2] === 'u' && line[i+3] === 'r') {
							allValues += '4'
						}
						if (line[i+1] === 'i' && line[i+2] === 'v' && line[i+3] === 'e') {
							allValues += '5'
						}
					}
					break
				case 's':
					if (charsLeft > 4) {
						if (line[i+1] === 'e' && line[i+2] === 'v' && line[i+3] === 'e' && line[i+4] === 'n') {
							allValues += '7'
							break
						}
					}
					if (line[i+1] === 'i' && line[i+2] === 'x') {
						allValues += '6'
						break
					}
				case 'e':
					if (charsLeft > 4) {
						if (line[i+1] === 'i' && line[i+2] === 'g' && line[i+3] === 'h' && line[i+4] === 't') {
							allValues += '8'
						}
					}
					break
				case 'n':
					if (charsLeft > 3) {
						if (line[i+1] === 'i' && line[i+2] === 'n' && line[i+3] === 'e') {
							allValues += '9'
						}
					}
					break
				default:
					break
			}
		}
	}
	console.log('All values before change: ', allValues)

	if (allValues.length > 1) {
		allValues = allValues[0] + allValues[allValues.length - 1]
	} else {
		allValues = allValues[0] + allValues[0]
	}

	calibrationValue += Number(allValues)
	console.log('All values after change: ', allValues)
	console.log(`Calibration value: ${calibrationValue}\n`)
})

readLineInterface.on('close', () => {
	console.log('Closing file')
})

