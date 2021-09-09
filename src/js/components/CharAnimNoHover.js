const CharAnimNoHover = ({text}) => {
    return (
        <>
        {text.split('').map((char, idx) => {
            return <span key={idx} className="hidden">{char}</span>
        })}
        </>
    )
}

export default CharAnimNoHover