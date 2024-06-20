import Header from "../component/Header/Header.component";
import Card from "../component/Card/Card.component";
import "./Home.css";

const Home = () => {
    return (
        <div>
            <Header />
            <div className="body-container">
                <br />
                <div className="body-card">
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default Home;