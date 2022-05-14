import React, { useEffect, useState } from 'react';
import { words } from './words';

import { Link } from 'react-router-dom'

export default function TypeRace() {
    const [currentWordCount, setCurrentWordCount] = useState(15)
    const [currentIndices, setCurrentIndices] = useState(Array.from({length: 25}, () => Math.floor(Math.random() * words.length)))
    const [currentWordArray, setCurrentWordArray] = useState(Array.from(currentIndices, index => words[index]))
    const [currentWords, setCurrentWords] = useState(currentWordArray.slice(0, currentWordCount).join(' '))
    const [currentInputValue, setCurrentInputValue] = useState('')
    const [currentPosition, setCurrentPosition] = useState(0)

    useEffect(() => {
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setCurrentWordArray(Array.from(currentIndices, index => words[index]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndices])

    useEffect(() => {
        setCurrentWords(currentWordArray.slice(0, currentWordCount).join(' '))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWordArray])

    const handleInputChange = e => {
        var latestChar = document.getElementsByClassName(currentPosition.toString())[0]
        var latestInput = e.target.value.charAt(e.target.value.length-1)
        if (latestInput === currentWords.charAt(currentPosition)) {
            if (latestChar.style.color === "") {
                latestChar.style.color = "green"
            }
        } else {
            if (latestChar.style.color === "") {
                latestChar.style.color = "red"
            }
        }
        setCurrentInputValue(e.target.value)
        setCurrentPosition(currentPosition + 1)
        if (currentPosition + 1 >= currentWords.length) {
            return reset(true)
        }
    }

    const handleSliderChange = e => {
        setCurrentWordCount(e.target.value)
    }

    const updateWords = () => {
        setCurrentWords(currentWordArray.slice(0, currentWordCount).join(' '))
        reset()
    }

    const reset = e => {
        if (e) {
            setCurrentIndices(Array.from({length: 25}, () => Math.floor(Math.random() * words.length)))
        }
        setCurrentInputValue('')
        setCurrentPosition(0)
        for (let i = 0; i < currentWords.length; i++) {
            var char = document.getElementsByClassName(i.toString())[0]
            char.style.color = ""
        }
    }

    return (
        <div className="typerace">
            <p className="typerace__text">
                {currentWords.split('').map((char, idx) => { return (
                    <span key={idx} className={"typerace__char " + idx} >
                        {char}
                    </span>)
                })}
            </p>
            <input type="text" className="typerace__input" value={currentInputValue} onChange={handleInputChange} />
            <div className="typerace__button_container">
                <Link to={'/'} className='typerace__backtohome'>Back to Home</Link>
                <button className='typerace__button' onClick={reset}>Restart</button>
                <button className='typerace__button' onClick={updateWords}>Set word count</button>
            </div>
            <div className="typerace__slider_container">
                <input className="typerace__slider" type="range" min="1" max="25" value={currentWordCount} onChange={handleSliderChange} />
                <p className="typerace__slider_value">{currentWordCount + ' words'}</p>
            </div>
        </div>
    )
}