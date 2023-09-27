import React from 'react';
import './Piano.css';

const TOTAL_KEYS = 25; // 2 octaves
const BLACK_KEYS = [1, 3, 6, 8, 10, 13, 15, 18, 20, 22];
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];


function noteName(i) {
    return NOTES[i % 12];
}

function Piano() {
    return(
            <div className="piano-wrapper">
              <JustPiano />
            </div>
    );
}

function keyClass(i) {
    return BLACK_KEYS.includes(i) ? 'black' : 'white';
}

function PianoKey({ index, isHighlighted }) {
    const gridColumn = index >= 12 ? index + 2 : index + 1;
    console.log(index, gridColumn)
    return (
            <div
        key={index}
        className={`key ${keyClass(index)} ${isHighlighted && 'highlight'}`}
        style={{ gridColumn: gridColumn }}
            >
            <span className="note-name">{noteName(index)}</span>
            </div>
    );
}

function JustPiano() {
    return (
            <div className="piano">
            {Array.from({ length: TOTAL_KEYS }, (_, i) => (
                    <PianoKey key={i} index={i} isHighlighted={false} />
            ))}

        </div>
    );
}
export default Piano;
