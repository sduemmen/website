import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function HashCalculator() {
    const [currentInputValue, setCurrentInputValue] = useState('')
    const [currentHashValue, setCurrentHashValue] = useState('')
    
    useEffect(() => {
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleInputChange = e => {
        var message = e.target.value
        setCurrentInputValue(message)
        const msgUint8 = new TextEncoder().encode(message)
        crypto.subtle.digest('SHA-256', msgUint8)
            .then(res => {
                const hashArray = Array.from(new Uint8Array(res))
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
                setCurrentHashValue(hashHex)
            })
    }

    return (
        <>
            <div className="hash">
                <input type="text" className="hash__input" value={currentInputValue} onChange={handleInputChange} placeholder='Message'/>
                <p className={'hash__output' + (currentInputValue === '' ? ' empty' : '')}>
                    {currentInputValue === '' ? 'SHA256 Hash' : currentHashValue}
                </p>
                <div className="hash__button_container">
                    <Link to={'/'} className='hash__backtohome'>Back to Home</Link>
                </div>
            </div>
        </>
    )
}