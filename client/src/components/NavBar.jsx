import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import search_icon_light from "../assets/search-b.png";
import "../styles/App.css";
import "../styles/NavBar.css";
import Drop from "./Drop";
import { getGamesCount, searchGames } from "../http/gameAPI";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const [gamesCount, setGamesCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchGamesCount();
    }, []);

    const fetchGamesCount = async () => {
        try {
            const response = await getGamesCount();
            setGamesCount(response.count);
        } catch (error) {
            console.error("Ошибка при получении количества игр:", error);
        }
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.trim() !== "") {
            try {
                const results = await searchGames(query);
                setSearchResults(results);
            } catch (error) {
                console.error("Ошибка при поиске игр:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const renderAuthenticatedButtons = () => (
        <div className="nav-bar__buttons">
            <Drop />
        </div>
    );

    const renderUnauthenticatedButtons = () => (
        <div className="nav-bar__buttons">
            <div>
                <Link
                    className="nav-button__btn"
                    style={{ marginRight: "30px" }}
                    to={LOGIN_ROUTE}
                >
                    Войти
                </Link>
            </div>
            <div>
                <Link
                    className="nav-button__btn button__btn-center"
                    to={REGISTRATION_ROUTE}
                >
                    Создать аккаунт
                </Link>
            </div>
        </div>
    );

    return (
        <div className="nav-bar">
            <div className="nav-bar__container">
                <div className="logo">
                    <Link className="logo-text" to={SHOP_ROUTE}>
                        PAY2WIN
                    </Link>
                </div>
                <div className="search-box-container">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder={`Поиск по ${gamesCount} играм...`}
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <img src={search_icon_light} alt="" />
                    </div>
                    {searchResults.length > 0 && (
                        <div className="search-results visible">
                            {searchResults.map((game) => (
                                <Link
                                    key={game.id}
                                    to={`/game/${game.id}`}
                                    className="search-result-item"
                                >
                                    {game.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                {user.isAuth
                    ? renderAuthenticatedButtons()
                    : renderUnauthenticatedButtons()}
            </div>
        </div>
    );
});

export default NavBar;
