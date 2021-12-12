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
                        description='A collection of solutions to algorithmic problems'
                        origin='github'
                        />
                    <Project 
                        name='Cryptography'
                        link='https://github.com/sduemmen/cryptography'
                        description='A collection of cryptographic algorithms'
                        origin='github'
                        />
                    <Project 
                        name='sduemmen.com'
                        link='https://github.com/sduemmen/website'
                        description='The source code to this website'
                        origin='github'
                        />
                    <Project 
                        name='Discord Music Bot'
                        link='https://github.com/sduemmen/musicbot'
                        description='Discord Application implemented in Javascript'
                        origin='github'
                        />
                    <Project 
                        name='Typeracer'
                        link='https://sduemmen.com/typeracer'
                        description='A typeracer like minigame'
                        origin='sduemmen'
                    />
                </div>
            </div>
        </section>
    )
}