import './NavBar.css';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <div className="navbar">
            <div className="logo">
                Ed's Works
            </div>
            <Link to="/search">
                <img id="search-logo" src="%PUBLIC_URL%/search_logo.png" alt=""/>
            </Link>
            <Menu right width={'100%'}>
                <a href="/">Home</a>
                <a href="/search">Search</a>
                <a href="/favourites">Favourites</a>
            </Menu>
        </div>
    );
}

export default NavBar