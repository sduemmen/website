import { CharAnimHover } from "./index"

const HeadingAnim = () => {
    return (
        <h1 className="title" >
            <CharAnimHover key='1' char='H'/>
            <CharAnimHover key='2' char='i'/>
            <CharAnimHover key='3' char=','/>
            &nbsp;
            <CharAnimHover key='4' char='I'/> 
            <CharAnimHover key='5' char="'"/>
            <CharAnimHover key='6' char='m'/>
            &nbsp;
            <CharAnimHover key='7' char='S'/>
            <CharAnimHover key='8' char='a'/>
            <CharAnimHover key='9' char='m'/>
            <CharAnimHover key='10' char='u'/>
            <CharAnimHover key='11' char='e'/>
            <CharAnimHover key='12' char='l'/>
        </h1>
    )
}

export default HeadingAnim