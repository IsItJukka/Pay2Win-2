import React, { useEffect, useState } from "react";
import "../styles/GameCard.css";
import Select from "react-select";
import { fetchGame } from "../http/gameAPI";
import { createGood } from "../http/goodAPI";
import { checkToken } from "../http/userAPI";

const CreateGood = () => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [includeEmail, setIncludeEmail] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        login: "",
        password: "",
        email: "",
        email_password: "",
    });

    useEffect(() => {
        const loadGames = async () => {
            const fetchedGames = await fetchGame();
            const gameOptions = fetchedGames.map((game) => ({
                value: game.id,
                label: game.name,
            }));
            setGames(gameOptions);
        };

        loadGames();
    }, []);

    const handleGameChange = (selectedOption) => {
        setSelectedGame(selectedOption);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        setIncludeEmail(e.target.checked);
        if (!e.target.checked) {
            setFormData((prevData) => ({
                ...prevData,
                email: "",
                email_password: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tokenData = await checkToken();
        if (!tokenData) {
            console.error("Пользователь не авторизован!");
            return;
        }

        const userId = tokenData.id;

        const goodData = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            gameId: selectedGame ? selectedGame.value : null,
            userId: userId,
            login: formData.login,
            password: formData.password,
            email: includeEmail ? formData.email : "",
            email_password: includeEmail ? formData.email_password : "",
        };

        try {
            await createGood(goodData);
            setFormData({
                name: "",
                description: "",
                price: "",
                login: "",
                password: "",
                email: "",
                email_password: "",
            });
            setSelectedGame(null);
            setIncludeEmail(false);
        } catch (error) {
            console.error("Ошибка при создании товара:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                console.error("Request data:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
            console.error("Error config:", error.config);
        }
    };

    return (
        <div className="game-container">
            <form className="game-add-good-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Название</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Цена</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="game">Игра</label>
                    <Select
                        id="game"
                        className="basic-single"
                        classNamePrefix="select"
                        name="game"
                        isClearable
                        options={games}
                        onChange={handleGameChange}
                        value={selectedGame}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="login">Логин продаваемого аккаунта</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        Пароль продаваемого аккаунта
                    </label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group-checkbox-group">
                    <input
                        type="checkbox"
                        id="include_email"
                        checked={includeEmail}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="include_email"></label>
                    <label
                        className="form-group-checkbox-group-lable"
                        htmlFor="include_email"
                    >
                        Аккаунт с почтой
                    </label>
                </div>
                {includeEmail && (
                    <>
                        <div className="form-group">
                            <label htmlFor="email">
                                Почта продаваемого аккаунта (если есть)
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required={includeEmail}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email_password">
                                Пароль от почты продаваемого аккаунта (если есть
                                почта)
                            </label>
                            <input
                                type="text"
                                id="email_password"
                                name="email_password"
                                value={formData.email_password}
                                onChange={handleChange}
                                required={includeEmail}
                            />
                        </div>
                    </>
                )}
                <button type="submit" className="submit-btn">
                    Добавить товар
                </button>
            </form>
        </div>
    );
};

export default CreateGood;
