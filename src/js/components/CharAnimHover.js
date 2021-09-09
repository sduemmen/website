import { useState } from "react"

const CharAnimHover = (props) => {
    const [animated, setAnimated] = useState(false)

    const styleHover = {
        transition: 'transform 1500ms ease 0s, opacity 1500ms cubic-bezier(0.45, 1.24, 0, 0.99) 0s',
        transform: 'translate(' + Math.round((Math.random()*2-1) * 31) +'px, 600px) rotate(' + Math.round((Math.random()*2-1) * 361) +'deg)',
        opacity: 0
    }

    return (
        <span 
            className={"title__anim"}
            onMouseEnter={() => setAnimated(true)}
            onTransitionEnd={() => setAnimated(false)}
            style={animated ? styleHover : {transform: ''}}
        >
            {props.char}
        </span>
    )
}

export default CharAnimHover