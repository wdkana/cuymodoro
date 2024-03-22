import axios from "axios";
import { redirect } from "react-router-dom";
import { hash } from "bcryptjs-react";
const saltRounds = 10;

export const loginAction = async ({ request }) => {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");

    if (!username || !password) return { data: { message: "Silahkan input data" } }

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/users/login`,
            {
                username, password,
            }
        );

        if (!response.data.is_success) return response

        localStorage.setItem("username", username);
        localStorage.setItem("token", response.data.data);

        return redirect("/apps");
    } catch (err) {
        console.error(`[ACTION LOGIN ERROR]: ${err}`);
        return;
    }
};

export const registerAction = async ({ request }) => {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");
    const hashPassword = await hash(password, saltRounds);

    try {
        const register = await axios.post(
            `${import.meta.env.VITE_API_URL}/users/register`,
            { username, password: hashPassword }
        );
        return register;
    } catch (err) {
        console.error(`[ACTION REGISTER ERROR]: ${err}`);
    }
};
