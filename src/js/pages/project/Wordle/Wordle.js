import React, {useEffect, useState} from 'react';
import { words } from './words';

import { Link } from 'react-router-dom';
import { BsQuestionCircle } from 'react-icons/bs'
import { VscDebugRestart } from 'react-icons/vsc'
import { IoClose } from 'react-icons/io5'
import Keyboard from './Keyboard';

export default function Wordle() {
    const [wordleData, setWordleData] = useState(null);
    const [inputArray, setInputArray] = useState([]);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const debugging = false;
    const debugWord = "umweg";

    useEffect(() => {
        resetSolution()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const resetSolution = () => {
        var rndLetter = Math.floor(Math.random() * 26)
        var rndWordIndex = Math.floor(Math.random() * words[String.fromCharCode(rndLetter + 97)].length)
        let newData = {...wordleData,
            "solution": debugging ? debugWord : words[String.fromCharCode(rndLetter + 97)][rndWordIndex],
            "currentRowIndex": 0,
            "currentGuesses": [],
            "correctness": [],
            "correctlyGuessedChars": [],
            "presentGuessedChars": [],
            "absentGuessedChars": [],
            "status": "IN_PROGRESS"
        }
        setWordleData(newData);
    }

    const handleInputEvent = key => {
        if (wordleData.currentRowIndex > 5 || wordleData.status === "FINISHED") return;
        if (key === "ENTER") {
            let word = inputArray.join("").toLowerCase();
            if (inputArray.length !== 5) return messageHandler("Not enough letters", 3000, true);
            if (!words[word.charAt(0)].includes(word)) return messageHandler("Not in word list", 3000, true);
            submitGuess(word);
            setEnteredText('');
            setInputArray([]);
            return;
        } else if (key === "⌫") {
            inputArray.splice(inputArray.length-1, 1)
        } else if (inputArray.length < 5) {
            inputArray.push(key)
        }
        setInputArray([...inputArray]);
        setEnteredText(inputArray.join("").toLowerCase());
    }

    const setEnteredText = text => {
        let currentGuesses = wordleData.currentGuesses;
        let currentRowIndex = wordleData.currentRowIndex;
        currentGuesses[currentRowIndex] = text;
        setWordleData({...wordleData, "currentGuesses": currentGuesses});
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
            messageHandler("Congratulations! You won", 10000);
        }
        if (wordleData.currentRowIndex + 1 === 6 && matchingChars < 5) { // all guesses used
            wordleData.status = "FINISHED";
            messageHandler("All guesses used! The word was " + wordleData.solution.toUpperCase(), 10000);
        }

        wordleData.correctness.push(rowCorrectness);
        wordleData.currentGuesses[wordleData.currentRowIndex] = guess;
        wordleData.currentRowIndex += 1;
        setWordleData(wordleData);
    }

    const messageHandler = (message, time, isError) => {
        if (isError) errorTimeout();
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
                        <p className="wordle__hint__text">Guess the word in 6 tries.</p>
                        <p className="wordle__hint__text">Each guess has to be a valid word of length 5.</p>
                        <p className="wordle__hint__text">After each guess the coloring of the tiles indicates how close your guess was.</p>
                        <h3 className="wordle__hint__heading">Example</h3>
                        <p className="wordle__hint__text">The Letter V is placed in the correct position</p>
                        <div className='wordle__board__row'>
                            <div className="wordle__board__tile correct">V</div>
                            <div className="wordle__board__tile">A</div>
                            <div className="wordle__board__tile">U</div>
                            <div className="wordle__board__tile">L</div>
                            <div className="wordle__board__tile">T</div>
                        </div>
                        <p className="wordle__hint__text">I is part of the solution, but it is not positioned correctly</p>
                        <div className='wordle__board__row'>
                            <div className="wordle__board__tile">H</div>
                            <div className="wordle__board__tile present">I</div>
                            <div className="wordle__board__tile">N</div>
                            <div className="wordle__board__tile">G</div>
                            <div className="wordle__board__tile">E</div>
                        </div>
                        <p className="wordle__hint__text">The Letter A is not part of the solution</p>
                        <div className='wordle__board__row'>
                            <div className="wordle__board__tile">N</div>
                            <div className="wordle__board__tile absent">A</div>
                            <div className="wordle__board__tile">V</div>
                            <div className="wordle__board__tile absent">A</div>
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
                <button className="wordle__refresh" onClick={() => resetSolution()}>
                    <VscDebugRestart/>
                </button>
                <button className="wordle__refresh" onClick={() => setShowHint(!showHint)}>
                    <BsQuestionCircle/>
                </button>
                <Link to={'/wordle-de'} className='wordle__backtohome'>🇬🇧</Link>
            </div>
        </div>
    )
}