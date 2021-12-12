import React from 'react';
import { Link } from 'react-router-dom';

const Project = (props) => {
    return(
        <div className={"project__container"}>
            <h3 className="project__name">
                {props.name}
            </h3>
            {props.description ? 
                <p className="project__description">{props.description}</p> 
            : <></>
            }

            {props.origin === 'github' ? 
                <a href={props.link} className="project__link" target="_blank" rel="noreferrer"></a>
            : <Link to="/typeracer" className='project__link' target="_blank" rel="noreferrer"/>
            }
        </div>
    )
}

export default Project