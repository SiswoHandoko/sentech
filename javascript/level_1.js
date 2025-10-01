// Make a javascript or typescript function that converts any string to Title Case.
function titleCase(str) {
    const lowerStr = str.toLowerCase();
    const words = lowerStr.split(" ");
    const capitalizedWords = words.map(word => {
        if (word.length === 0) return "";
        return word[0].toUpperCase() + word.slice(1);
    });

    return capitalizedWords.join(" ");
}

console.log(titleCase("I'm a little tea pot")); // "I'm A Little Tea Pot"
console.log(titleCase("sHoRt AnD sToUt"));      // "Short And Stout"
console.log(titleCase("SHORT AND STOUT"));      // "Short And Stout"

// Create a function that counts the word frequency in this string "Four One two two three Three three four  four   four".  Case insensitive, ignore punctuation.
function wordFrequency(str) {
    const words = str
        .toLowerCase()
        .split(" ")
        .filter(word => word.trim() !== "");

    const frequency = {};

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (frequency[word]) {
            frequency[word]++;
        } else {
            frequency[word] = 1;
        }
    }

    // ordering output
    const sortedKeys = Object.keys(frequency)
        .sort((a, b) => frequency[a] - frequency[b]);

    const orderedFrequency = {};
    for (const key of sortedKeys) {
        orderedFrequency[key] = frequency[key];
    }

    return orderedFrequency;
}

const text = "Four One two two three Three three four  four   four";
console.log(wordFrequency(text));