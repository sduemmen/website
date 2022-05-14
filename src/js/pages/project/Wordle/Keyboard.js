import React, { useEffect } from "react";

const keys = [['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
              ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
              ['ENTER', 'y', 'x', 'c', 'v', 'b', 'n', 'm', '\u232b']]

const Keyboard = ({wordleData, handleKeyPress}) => {

    const handleKeyboard = key => {
        if (key.key === "Enter") {
            handleKeyPress("ENTER");
        } else if (key.key === "Backspace") {
            handleKeyPress("⌫");
        } else if (key.key.length === 1 && key.key.toLowerCase() !== key.key.toUpperCase()) {
            handleKeyPress(key.key.toUpperCase());
        }
    }

    useEffect(() => {          
        window.addEventListener("keydown", handleKeyboard)

        return () => { window.removeEventListener("keydown", handleKeyboard) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleKeyPress])

    return (
    <div className="wordle__keyboard">
        {
        keys.map((item, index) => (
        <div className="wordle__keyboard__row" key={index}>
            {
            item.map((key, keyindex) => (
            <button 
                className= {`${wordleData && wordleData.correctlyGuessedChars.includes(key) ? "wordle__keyboard__key correct" :
                                (wordleData && wordleData.presentGuessedChars.includes(key) ? "wordle__keyboard__key present" :
                                wordleData && wordleData.absentGuessedChars.includes(key) ? "wordle__keyboard__key absent" : "wordle__keyboard__key")}`}
                onClick={(e) => {
                    if (e.detail > 0) { 
                        handleKeyPress(key);
                    }
                }}
                key={keyindex} >
                {key}
            </button>
            ))
            }
        </div>))
        }
    </div>
    )
}

export default Keyboard;