import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Impressum from './js/pages/Impressum';
import Cookies from './js/pages/Cookies';
import Sections from './js/components/Sections';
import TypeRace from './js/pages/project/Typeracer/TypeRace';
import HashCalculator from './js/pages/project/Hashcalculator/HashCalculator';
import Wordle from './js/pages/project/Wordle/Wordle';
import WordleGerman from './js/pages/project/Wordle/Wordle-German';

const App = () => {
    window.onbeforeunload = () => {
        localStorage.setItem('currentView', '.section__home')
    }
    return (
        <div className='page__outer'>
            <Router>
                <Switch>
                    <Route path='/typeracer'>
                        <TypeRace />
                    </Route>
                    <Route path='/hash-calculator'>
                        <HashCalculator />
                    </Route>
                    <Route path='/wordle'>
                        <Wordle />
                    </Route>
                    <Route path='/wordle-de'>
                        <WordleGerman />
                    </Route>
                    <Route path='/impressum'>
                        <Impressum />
                    </Route>
                    <Route path='/cookies'>
                        <Cookies />
                    </Route>
                    <Route exact path='/' >
                        <Sections />
                    </Route>
                </Switch>
            </Router>
        </div>
        
    )
}

export default App