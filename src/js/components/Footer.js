import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className='footer'>
            <Link to='/impressum' className='footer__link'>
                Impressum
            </Link>
            <Link to='/cookies' className='footer__link'>
                Cookies
            </Link>
        </footer>
    )
}

export default Footer