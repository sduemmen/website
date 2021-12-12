import React, { useEffect, useState } from 'react';
import { words } from './words';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TypeRace() {
    const [indices, setIndices] = useState(Array.from({length: 14}, () => Math.floor(Math.random() * words.length)))
    const [currentWords, setCurrentWords] = useState(Array.from(indices, index => words[index]).join(' '))
    const [currentInputValue, setCurrentInputValue] = useState('')
    const [currentPosition, setCurrentPosition] = useState(0)

    useEffect(() => {
        setCurrentWords(Array.from(indices, index => words[index]).join(' '))
    }, indices)

    const handleInputChange = e => {
        var latestChar = document.getElementsByClassName(currentPosition.toString())[0]
        var latestInput = e.target.value.charAt(e.target.value.length-1)
        if (latestInput === currentWords.charAt(currentPosition)) {
            if (latestChar.style.color === "") {
                latestChar.style.color = "green"
            }
            setCurrentInputValue(e.target.value)
            setCurrentPosition(currentPosition + 1)
            if (currentPosition + 1 >= currentWords.length) {
                return reset()
            }
        } else {
            if (latestChar.style.color === "") {
                latestChar.style.color = "red"
            }
        }
    }

    const reset = () => {
        setIndices(Array.from({length: 14}, () => Math.floor(Math.random() * words.length)))
        setCurrentInputValue('')
        setCurrentPosition(0)
        for (let i = 0; i < currentWords.length; i++) {
            var char = document.getElementsByClassName(i.toString())[0]
            char.style.color = ""
        }
    }

    return (
        <>
            <Navbar />
            <div className="page__inner">
                <div className="typerace">
                    <p className="typerace__text">
                        {currentWords.split('').map((char, idx) => { return (
                            <span key={idx} className={"typerace__char " + idx} >
                                {char}
                            </span>)
                        })}
                    </p>
                    <input type="text" className="typerace__input" value={currentInputValue} onChange={handleInputChange} />
                    <button className='typerace__reset_button' onClick={reset}>Restart</button>
                </div>
                <Footer />
            </div>
        </>
    )
}