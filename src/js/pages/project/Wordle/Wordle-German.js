import React, {useEffect, useState} from 'react';
import { germanWords } from './words-german';

import { Link } from 'react-router-dom';
import { BsQuestionCircle } from 'react-icons/bs'
import { VscDebugRestart } from 'react-icons/vsc'
import { IoClose } from 'react-icons/io5'
import Keyboard from './Keyboard';

export default function WordleGerman() {
    const [wordleData, setWordleData] = useState(JSON.parse(localStorage.getItem("wordleDataGerman")));
    const [inputArray, setInputArray] = useState([]);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const debugging = false;
    const debugWord = "umweg";

    useEffect(() => {
        resetSolution(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const resetSolution = overwrite => {
        if (overwrite || (!wordleData || !wordleData.solution)) {
            var rndLetter = Math.floor(Math.random() * 26)
            var rndWordIndex = Math.floor(Math.random() * germanWords[String.fromCharCode(rndLetter + 97)].length)
            let newData = {...wordleData,
                "solution": debugging ? debugWord : germanWords[String.fromCharCode(rndLetter + 97)][rndWordIndex],
                "currentRowIndex": 0,
                "currentGuesses": [],
                "correctness": [],
                "correctlyGuessedChars": [],
                "presentGuessedChars": [],
                "absentGuessedChars": [],
                "status": "IN_PROGRESS"
            }
            setWordleData(newData);
            localStorage.setItem("wordleDataGerman", JSON.stringify(newData));
        }
    }

    const handleInputEvent = key => {
        if (wordleData.currentRowIndex > 5 || wordleData.status === "FINISHED") return;

        if (key === "ENTER") {
            if (inputArray.length === 5) {
                let word = inputArray.join("").toLowerCase();
                if (!germanWords[word.charAt(0)].includes(word)) {
                    errorTimeout();
                    messageHandler("Nicht in der Wörterliste", 3000);
                    return;
                }
                submitGuess(word);
                setInputArray([]);
                setEnteredText("")
            } else {
                messageHandler("Nicht genug Buchstaben", 3000);
            }
            return;
        }

        if (key === "⌫") {
            inputArray.splice(inputArray.length-1, 1)
            setInputArray([...inputArray]);
        } 

        else if (inputArray.length < 5) {
            inputArray.push(key)
            setInputArray([...inputArray]);
        }
        setEnteredText(inputArray.join("").toLowerCase());
    }

    const setEnteredText = text => {
        let currentGuesses = wordleData.currentGuesses;
        let currentRowIndex = wordleData.currentRowIndex;
        currentGuesses[currentRowIndex] = text;
        let newData = {...wordleData, "currentGuesses": currentGuesses}
        setWordleData(newData);
    }

    const submitGuess = guess => {
        let matchingChars = 0;
        let rowCorrectness = [];

        let charsLeft = wordleData.solution.split("");
        
        for (let i = 0; i < guess.length; i++) {
            let charAtIndex = guess.charAt(i);
            if (wordleData.solution.charAt(i) === charAtIndex) {
                matchingChars++;
                rowCorrectness[i] = "correct";
                console.log(charsLeft, charsLeft.indexOf(charAtIndex));
                charsLeft.splice(charsLeft.indexOf(charAtIndex), 1);
                if (!wordleData.correctlyGuessedChars.includes(charAtIndex)) {     // add char to correctly guessed chars
                    wordleData.correctlyGuessedChars.push(charAtIndex);
                }
                if (wordleData.presentGuessedChars.indexOf(charAtIndex) !== -1) {  // remove guessed char from present chars
                    wordleData.presentGuessedChars.splice(wordleData.presentGuessedChars.indexOf(charAtIndex));
                }
            }
        }

        for (let i = 0; i < guess.length; i++) {
            let charAtIndex = guess.charAt(i);
            if (wordleData.solution.includes(charAtIndex) && charsLeft.includes(charAtIndex) && rowCorrectness[i] !== "correct") {
                rowCorrectness[i] = "present";
                charsLeft.splice(charsLeft.indexOf(charAtIndex), 1);
                if (!wordleData.presentGuessedChars.includes(charAtIndex) && !wordleData.correctlyGuessedChars.includes(charAtIndex)) {
                    wordleData.presentGuessedChars.push(charAtIndex);
                }
            }
        }

        for (let i = 0; i < guess.length; i++) {
            let charAtIndex = guess.charAt(i);
            if (rowCorrectness[i] !== "present" && rowCorrectness[i] !== "correct") {
                rowCorrectness[i] = "absent";
                if (!wordleData.absentGuessedChars.includes(charAtIndex)) {
                    wordleData.absentGuessedChars.push(charAtIndex)
                }
            }
        }

        if (matchingChars === 5) {      // guessed word is correct
            wordleData.status = "FINISHED";
            messageHandler("Glückwunsch! Du hast gewonnen", 10000);
        }
        if (wordleData.currentRowIndex + 1 === 6 && matchingChars < 5) { // all guesses used
            wordleData.status = "FINISHED";
            messageHandler("Alle Versuche verbraucht! Das Wort war " + wordleData.solution.toUpperCase(), 10000);
        }

        wordleData.correctness.push(rowCorrectness);
        wordleData.currentGuesses[wordleData.currentRowIndex] = guess;
        wordleData.currentRowIndex += 1;
        setWordleData(wordleData)
        localStorage.setItem("wordleDataGerman", JSON.stringify(wordleData))
    }

    const messageHandler = (message, time) => {
        setMessage(message);
        setTimeout(() => {
            setMessage(null);
        }, time);
    }

    const errorTimeout = () => {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 3000);
    }

    return(
        <div className="wordle__container">
            <div className="wordle__topbar">
                {message && <div className="wordle__message">{message}</div> }
            </div>
            {showHint && 
                <div className="wordle__hint">
                    <button className="wordle__hint__closebutton" onClick={() => setShowHint(!showHint)}>
                        <IoClose/>
                    </button>
                    <div className="wordle__hint__container">
                        <p className="wordle__hint__text">Errate das gesuchte Wort in 6 Versuchen.</p>
                        <p className="wordle__hint__text">In jedem Versuch musst du ein valides Wort der Länge 5 eingeben.</p>
                        <p className="wordle__hint__text">Nach jedem Versuch zeigt die Farbe der Kästchen an wie nah dein Versuch am gesuchten Wort ist.</p>
                        <h3 className="wordle__hint__heading">Beispiel</h3>
                        <p className="wordle__hint__text">Der Buchstabe F ist hier korrekt platziert</p>
                        <div className='wordle__board__row'>
                            <div className="wordle__board__tile correct">F</div>
                            <div className="wordle__board__tile">A</div>
                            <div className="wordle__board__tile">R</div>
                            <div className="wordle__board__tile">B</div>
                            <div className="wordle__board__tile">E</div>
                        </div>
                        <p className="wordle__hint__text">Hier ist A Teil des gesuchten Wortes, aber an nicht an der richtigen Stelle</p>
                        <div className='wordle__board__row'>
                            <div className="wordle__board__tile">K</div>
                            <div className="wordle__board__tile">L</div>
                            <div className="wordle__board__tile">I</div>
                            <div className="wordle__board__tile">M</div>
                            <div className="wordle__board__tile present">A</div>
                        </div>
                        <p className="wordle__hint__text">Der Buchtstabe G ist nicht im gesuchten Wort</p>
                        <div className='wordle__board__row'>
                            <div className="wordle__board__tile">K</div>
                            <div className="wordle__board__tile">E</div>
                            <div className="wordle__board__tile absent">G</div>
                            <div className="wordle__board__tile">E</div>
                            <div className="wordle__board__tile">L</div>
                        </div>
                    </div>
                </div>
            }
            <div className="wordle__board">
                {[0,1,2,3,4,5].map((row, rowIndex) => (
                    <div key={rowIndex} className={`wordle__board__row ${wordleData && row === wordleData.currentRowIndex && error && "error"}`}>
                        {[0,1,2,3,4].map((tile, tileIndex) => (
                            <div key={tileIndex} className={`wordle__board__tile ${wordleData && wordleData.correctness[row] ? wordleData.correctness[row][tile] : ""}`}>
                                {wordleData && wordleData.currentGuesses[row] && wordleData.currentGuesses[row][tile]}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Keyboard wordleData={wordleData} handleKeyPress={handleInputEvent} />
            <div className="wordle__buttonwrapper">
                <Link to={'/'} className='wordle__backtohome'>Homepage</Link>
                <button className="wordle__refresh" onClick={() => resetSolution(true)}>
                    <VscDebugRestart/>
                </button>
                <button className="wordle__refresh" onClick={() => setShowHint(!showHint)}>
                    <BsQuestionCircle/>
                </button>
                <Link to={'/wordle'} className='wordle__backtohome'>🇩🇪</Link>
            </div>
        </div>
    )
}