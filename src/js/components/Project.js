import React from 'react';

const Project = (props) => {
    return(
        <div className={"project__container " + props.name}>
            <h3 className="project__name">
                {props.name}
            </h3>
            {props.description ? <p className="project__description">{props.description}</p> : <></>}
            <a href={props.link} className="project__link" target="_blank" rel="noreferrer">View</a>
        </div>
    )
}

export default Project