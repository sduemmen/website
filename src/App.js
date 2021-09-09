import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Impressum from './js/pages/Impressum';
import Cookies from './js/pages/Cookies';
import Sections from './js/components/Sections';
import CubicBezier from './js/pages/CubicBezier';

const App = () => {
    window.onbeforeunload = () => {
        localStorage.setItem('currentView', '.section__home')
    }
    return (
        <div className='page__outer'>
            <Router>
                <Switch>
                    <Route path='/cubic-bezier'>
                        <CubicBezier />
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