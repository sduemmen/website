import React from 'react';
import Project from '../../components/Project';
import CharAnimNoHover from '../../components/CharAnimNoHover';

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
                        description='a collection of solutions to algorithmic problems'
                        origin='github'
                        />
                    <Project 
                        name='Cryptography'
                        link='https://github.com/sduemmen/cryptography'
                        description='a collection of cryptographic algorithms'
                        origin='github'
                        />
                    <Project 
                        name='sduemmen.com'
                        link='https://github.com/sduemmen/website'
                        description='the source code to this website'
                        origin='github'
                        />
                    <Project 
                        name='Discord Music Bot'
                        link='https://github.com/sduemmen/musicbot'
                        description='a Discord Application implemented in Javascript'
                        origin='github'
                        />
                    <Project 
                        name='Typeracer'
                        link='typeracer'
                        description='a typeracer like minigame'
                        origin='sduemmen'
                    />
                    <Project 
                        name='Hash Calculator'
                        link='hash-calculator'
                        description='an online SHA256-Calculator'
                        origin='sduemmen'
                    />
                    <Project 
                        name='Wordle'
                        link='wordle'
                        description='a wordle clone'
                        origin='sduemmen'
                    />
                </div>
            </div>
        </section>
    )
}