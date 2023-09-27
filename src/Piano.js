import React from "react";
import { useState } from "react";
import "./Piano.css";

const TOTAL_KEYS = 25; // 2 octaves
const BLACK_KEYS = [1, 3, 6, 8, 10, 13, 15, 18, 20, 22];
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const SCALES = [
  { Scale: "None", Formula: [] },
  {
    Scale: "Major/Ionian",
    Formula: [2, 2, 1, 2, 2, 2, 1],
  },
  {
    Scale: "Mixolydian",
    Formula: [2, 2, 1, 2, 2, 1, 2],
  },
  {
    Scale: "Aeolian Dominant",
    Formula: [2, 2, 1, 2, 1, 2, 2],
  },
  {
    Scale: "Melodic Minor",
    Formula: [2, 1, 2, 2, 2, 2, 1],
  },
  {
    Scale: "Natural Minor, Aeolian",
    Formula: [2, 1, 2, 2, 1, 2, 2],
  },
  {
    Scale: "Harmonic Minor",
    Formula: [2, 1, 2, 2, 1, 3, 1],
  },
  {
    Scale: "Dorian",
    Formula: [2, 1, 2, 2, 2, 1, 2],
  },
  {
    Scale: "HW-Diminished",
    Formula: [1, 2, 1, 2, 1, 2, 1, 2],
  },
  {
    Scale: "WH-Diminished",
    Formula: [2, 1, 2, 1, 2, 1, 2, 1],
  },
  {
    Scale: "Half-Diminished",
    Formula: [2, 1, 2, 1, 2, 2, 2],
  },
  {
    Scale: "Altered",
    Formula: [1, 2, 1, 2, 2, 2, 2],
  },
  {
    Scale: "Blues",
    Formula: [3, 2, 1, 1, 3, 2],
  },
];

const SCALE_NAMES = SCALES.map((s) => s.Scale);

function noteName(i) {
  return NOTES[i % 12];
}

function RadioPicker({ options, selected, onSelect, name }) {
  return (
    <form>
      {options.map((option, i) => (
        <div key={i}>
          <input
            type="radio"
            id={option}
            name={name}
            value={option}
            checked={selected === option}
            onChange={(e) => onSelect(e.target.value)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </form>
  );
}

function ScalePicker({ selected, onSelect }) {
  return (
    <div>
      <h3>Scale</h3>
      <RadioPicker
        options={SCALE_NAMES}
        selected={selected}
        onSelect={onSelect}
        name="scale"
      />
    </div>
  );
}

function StartingNotePicker({ selected, onSelect }) {
  return (
    <div>
      <h3>Starting Note</h3>
      <RadioPicker
        options={NOTES}
        selected={selected}
        onSelect={onSelect}
        name="note"
      />
    </div>
  );
}

function Piano() {
  const [selectedScale, setSelectedScale] = useState("None");
  const [selectedNote, setSelectedNote] = useState("C");

  return (
    <>
      <div className="piano-wrapper">
        <div>
          <h1>Scales Practise Tool</h1>
        </div>
        <PianoKeysWithScale scale={selectedScale} startNote={selectedNote} />

        <div className="settings">
          <ScalePicker selected={selectedScale} onSelect={setSelectedScale} />
          <StartingNotePicker
            selected={selectedNote}
            onSelect={setSelectedNote}
          />
        </div>
      </div>
    </>
  );
}

function keyClass(i) {
  return BLACK_KEYS.includes(i) ? "black" : "white";
}

function PianoKey({ index, isHighlighted }) {
  const gridColumn = index >= 12 ? index + 2 : index + 1;
  return (
    <div
      key={index}
      className={`key ${keyClass(index)} ${isHighlighted && "highlight"}`}
      style={{ gridColumn: gridColumn }}
    >
      {isHighlighted && <span className="note-name">{noteName(index)}</span>}
    </div>
  );
}

function getScaleNotes(scale, startNote) {
  if ((scale === "None") | !scale) {
    return [];
  }
  const selectedScale = SCALES.find((s) => s.Scale.includes(scale));

  return selectedScale.Formula.reduce(
    (acc, interval) => {
      const nextNote = acc[acc.length - 1] + interval;
      acc.push(nextNote);
      return acc;
    },
    [startNote],
  );
}

function PianoKeysWithScale({ scale, startNote }) {
  const startNoteNum = NOTES.indexOf(startNote);
  const highlights = getScaleNotes(scale, startNoteNum);
  return (
    <div className="piano">
      {Array.from({ length: TOTAL_KEYS }, (_, i) => (
        <PianoKey key={i} index={i} isHighlighted={highlights.includes(i)} />
      ))}
    </div>
  );
}

export default Piano;
