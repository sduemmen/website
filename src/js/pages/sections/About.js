import React from 'react';
import { CharAnimNoHover } from '../../components';

export default function About() {
    return (
        <section className="section__about section__full">
            <div className="section__inner">
                <div className="text-container">
                    <h2 className="title about__heading">
                        <CharAnimNoHover text='About'/>
                    </h2>
                    <p className='before'>
                        I first came into contact with programming when I began 
                        to code Server-Plugins for Minecraft about 7 years ago. 
                        Since then I've always welcomed the challenges that come 
                        with learning new concepts and adopting them.
                    </p>
                    <p className='after'>
                        For the past 2 years I've been studying Computer Science at
                        Johannes-Gutenberg University in Mainz.
                    </p>
                </div>
            </div>
        </section>
    )
}