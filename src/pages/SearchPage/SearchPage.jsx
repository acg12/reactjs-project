import NavBar from '../../components/NavBar/NavBar'

function SearchPage() {
    return (
        <div>
            <NavBar />
            <div className="container">
                <form action="/results">
                    <div className="search-cont">
                        <input type="search" name="q" placeholder="Search..." id="search-bar"/>
                    </div>
                </form>
                <div className="explain">
                    Search any song or album by Ed Sheeran
                </div>
            </div>
        </div>
    );
}

export default SearchPage