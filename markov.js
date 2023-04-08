/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
      
      let chains = new Map();
      // loop through words array
      for (let i = 0; i < this.words.length; i++) {
        // set word and nextWord variables
        let word = this.words[i];
        let nextWord = this.words[i + 1] || null;
        // if word is already in chains, push nextWord to its array
        if (chains.has(word)) chains.get(word).push(nextWord);
        // else, set word as key and nextWord as value in chains  
        else chains.set(word, [nextWord]);
      }
      // console.log(chains);
      this.chains = chains;

  }


  

  makeText(numWords = 1000) {
    // get array of keys from chains
    let keys = Array.from(this.chains.keys());
    // pick a random key to begin
    let key = keys[Math.floor(Math.random() * keys.length)];
    // initialize output array
    let output = [];

    // produce markov chain until reaching termination word
    while (output.length < numWords && key !== null) {
      output.push(key);
      // set key to random value from its array in chains
      key = this.chains.get(key)[Math.floor(Math.random() * this.chains.get(key).length)];
    }

    return output.join(" ");
  }
}
//export
module.exports = {
    MarkovMachine
}
