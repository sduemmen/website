import React from 'react';
import Project from '../components/Project';
import CharAnimNoHover from '../components/CharAnimNoHover';

export default function Work() {
    return (
        <section className="section__projects">
            <div className="section__inner">
                <div className="text-container">
                    <h2 className="title project__heading">
                        <CharAnimNoHover text='Projects'/>
                    </h2>
                </div>
                <div className="project__wrapper">
                    <Project 
                        name='Leetcode'
                        link='https://github.com/sduemmen/leetcode'
                        />
                    <Project 
                        name='Cryptography'
                        link='https://github.com/sduemmen/cryptography'
                        />
                </div>
            </div>
        </section>
    )
}