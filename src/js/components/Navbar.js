import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { Link as ScrollLink } from 'react-scroll'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [visible, setVisible] = useState(false)

    const NavbarData = [
        {
            title: 'Home',
            path: 'section__home',
        },
        {
            title: 'About',
            path: 'section__about',
        },
        {
            title: 'Projects',
            path: 'section__projects',
        }
    ]

    const openNavMobile = () =>{
        visible ? document.body.classList.remove('mobile-open') 
        : document.body.classList.add('mobile-open')
        setVisible(!visible)
    }

    const gotoSection = (e) => {
        document.body.classList.remove('mobile-open')
        if (e.target.target) {
            localStorage.setItem('currentView', '.' + e.target.target)
        }
        setVisible(!visible)
    }

    return (
        <>
        <Link to='#' className='navbar__openButton' onClick={openNavMobile}>
            <FaBars onClick={() => setVisible(!visible)}/>
        </Link>
        <div className='navbar__container'>
            <nav className='navbar'>
                <Link to='#' className="navbar__closeButton" onClick={openNavMobile}>
                    <IoClose />
                </Link>
                {NavbarData.map((item, idx) => {
                    if (window.location.pathname === '/') {
                        return(
                            <ScrollLink 
                                to={item.path} 
                                onClick={gotoSection}
                                key={idx} 
                                className='navbar__item' 
                                spy={true} 
                                smooth={true}
                                target={item.path}
                            >
                                {item.title}
                            </ScrollLink>
                        )
                    } else {
                        return(
                            <Link 
                                to={'/'}
                                name={item.path} 
                                onClick={gotoSection}
                                key={idx} 
                                className='navbar__item' 
                                target={item.path}
                            >
                                {item.title}
                            </Link>
                        )
                    }
                })}
            </nav>
        </div>
        </>
    )
}

export default Navbar