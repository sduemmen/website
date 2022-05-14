import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Homepage, Cookies, Impressum } from './js/pages';
import { Typerace, HashCalculator, Wordle, WordleGerman, Charts, Csgo } from './js/pages/project';

const App = () => {
    window.onbeforeunload = () => {
        localStorage.setItem('currentView', '.section__home')
    }
    return (
        <div className='page__outer'>
            <Router>
                <Switch>
                    <Route path='/typeracer' component={Typerace} />
                    <Route path='/hash-calculator' component={HashCalculator} />
                    <Route path='/wordle' component={Wordle} />
                    <Route path='/wordle-de' component={WordleGerman} />
                    <Route path='/charts' component={Charts} />
                    <Route path='/csgo' component={Csgo} />
                    <Route path='/impressum' component={Impressum} />
                    <Route path='/cookies' component={Cookies} />
                    <Route exact path='/' component={Homepage} />
                </Switch>
            </Router>
        </div>
        
    )
}

export default App