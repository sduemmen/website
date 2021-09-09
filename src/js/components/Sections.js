import { useEffect } from 'react'

import Home from '../pages/Home'
import About from '../pages/About'
import Projects from '../pages/Projects'
import Navbar from './Navbar'
import Footer from './Footer'

const Sections = () => {
    useEffect(() => {
        // save and restore last known view Position
        let elem = document.querySelector(localStorage.getItem('currentView') || ".section__home")
        elem.scrollIntoView()
        localStorage.clear()

        // restore animated titles to their original state when page is reloaded
        var elements
        var windowHeight

        function init() {
            elements = document.querySelectorAll('.hidden')
            windowHeight = window.innerHeight
        }
        
        function checkPosition() {
            for (let i = 0; i < elements.length; i++) {
                var element = elements[i];
                var positionFromTop = elements[i].getBoundingClientRect().top
                if (positionFromTop - windowHeight <= 0) {
                    element.classList.add('fadein-anim')
                    element.classList.remove('hidden')
                }
            }
        }
    
        window.onscroll = () => {
            checkPosition()
        }
        window.onresize = () => {
            init()
        }
        init()
        checkPosition()
    }, [])

    return (
        <>
        <Navbar />
        <div className="page__inner">               
            <Home/>
            <About/>
            <Projects/>
            <Footer />
        </div>
        </>
    )
}

export default Sections