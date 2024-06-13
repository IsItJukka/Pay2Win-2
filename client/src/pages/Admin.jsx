import React, { useState, useEffect } from "react";
import "../styles/App.css";
import { observer } from "mobx-react-lite";
import CreateGame from "../modals/CreateGame";
import TechSupport from "../modals/TechSupport";
import { checkAuthOnReload } from "../http/userAPI";

const Admin = observer(() => {
    const [userId, setUserId] = useState("");
    const [userRole, setUserRole] = useState(null);
    const [actionType, setActionType] = useState("");
    const [techSupportVisible, setTechSupportVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await checkAuthOnReload();
                setUserId(user.id);
                setUserRole(user.role);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    const handleOpenModal = (type) => {
        setActionType(type);
        setTechSupportVisible(true);
    };

    console.log("userId:", userId);
    console.log("userRole:", userRole);

    return (
        <div className="container">
            <button
                className="dark-standard-button"
                onClick={() => handleOpenModal("create")}
            >
                Добавить игру
            </button>

            {userRole === 2 && (
                <>
                    <button
                        className="dark-standard-button"
                        onClick={() => handleOpenModal("grant")}
                    >
                        Выдать роль техподдержки
                    </button>
                    <button
                        className="dark-standard-button"
                        onClick={() => handleOpenModal("revoke")}
                    >
                        Отозвать роль техподдержки
                    </button>
                </>
            )}
            <button
                className="dark-standard-button"
                onClick={() => handleOpenModal("block")}
            >
                Заблокировать пользователя
            </button>
            <button
                className="dark-standard-button"
                onClick={() => handleOpenModal("unblock")}
            >
                Разблокировать пользователя
            </button>

            {actionType === "create" && (
                <CreateGame
                    show={techSupportVisible}
                    onHide={() => setTechSupportVisible(false)}
                />
            )}
            {["grant", "revoke", "block", "unblock"].includes(actionType) && (
                <TechSupport
                    show={techSupportVisible && userId !== ""}
                    onHide={() => setTechSupportVisible(false)}
                    userId={userId}
                    actionType={actionType}
                />
            )}
        </div>
    );
});

export default Admin;
