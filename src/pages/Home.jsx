import Header from "../component/Header/Header.component";
import "./Home.css";

const Home = () => {
    return (
        <div>
            <Header />
            <div className="body-container">
                <h1>Body</h1>
            </div>
        </div>
    )
}

export default Home;