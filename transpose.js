// transpose.js

// Define the chord scale including sharps and flats (but flats are mapped to sharps internally)
const chords = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

// Counter to keep track of transpose steps, ranging from -11 to 11
let transposeCounter = 0;

// Function to handle transposing
function transposeChords(step) {
    const input = document.getElementById('lyricsInput').value;

    // Update the transpose counter and handle wrap-around between -11 and 11
    transposeCounter += step;
    if (transposeCounter > 11) transposeCounter = -11;
    if (transposeCounter < -11) transposeCounter = 11;

    // Update the display of the transpose counter in the middle of the buttons
    document.getElementById('counterDisplay').textContent = transposeCounter;

    // Regex updated to capture both major and minor chords (e.g., Am, G#m, F#m, etc.)
    let output = input.replace(/\(([A-G]#?m?)\)/g, function(match, chord) {
        let isMinor = chord.endsWith('m'); // Check if the chord is minor
        let baseChord = isMinor ? chord.slice(0, -1) : chord; // Remove 'm' for minor chords to handle the base note

        // Find the index of the base chord in the array
        let chordIndex = chords.indexOf(baseChord);

        // Transpose by the current transpose count (step)
        if (chordIndex !== -1) {
            let newIndex = (chordIndex + transposeCounter + chords.length) % chords.length;
            return '(' + chords[newIndex] + (isMinor ? 'm' : '') + ')';  // Add back 'm' for minor chords
        }

        // If no match is found, return the original chord
        return match;
    });

    // Update the lyrics input box with the transposed lyrics
    document.getElementById('lyricsInput').value = output;
}
