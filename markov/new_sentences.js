const Markov = require('markov-strings').default
// or
import Markov from 'markov-strings'

const data = [/* insert a few hundreds/thousands sentences here */]

// Build the Markov generator
const markov = new Markov(data, { stateSize: 2 })
markov.buildCorpus()

const options = {
    maxTries: 20, // Give up if I don't have a sentence after 20 tries (default is 10)
    filter: (result) => {
    return
        result.string.split(' ').length >= 5 && // At least 5 words
        result.string.endsWith('.')             // End sentences with a dot.
}
}

// Generate a sentence
const result = markov.generate(options)
console.log(result)
/*
{
  string: 'lorem ipsum dolor sit amet etc.',
  score: 42,
  tries: 5,
  refs: [ an array of objects ]
}
*/