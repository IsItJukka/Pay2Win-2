import { useState, useEffect } from "react";
import { addBalance, checkAuthOnReload } from "../http/userAPI";
import "../styles/Balance.css";

const Balance = () => {
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Visa");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await checkAuthOnReload();
                setUserId(user.id);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userId) {
                console.error("User ID not found.");
                return;
            }
            const { token, balance } = await addBalance(userId, amount);
            console.log(`Balance added: ${amount}. New balance: ${balance}`);
        } catch (error) {
            console.error("Error adding balance:", error);
        }
    };

    return (
        <div className="balans-container">
            <form className="form-group" onSubmit={handleFormSubmit}>
                <label>
                    Пополнение баланса:
                    <input
                        type="text"
                        name="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Необходимая сумма для пополнения"
                    />
                </label>

                <label>
                    Способ оплаты:
                    <select
                        className="payment_selcolor"
                        id="selcolor"
                        onChange={handlePaymentMethodChange}
                        value={paymentMethod}
                    >
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="PayPal">PayPal</option>
                    </select>
                </label>
                <button type="submit" className="balans-btn">
                    Продолжить
                </button>
            </form>
        </div>
    );
};

export default Balance;
