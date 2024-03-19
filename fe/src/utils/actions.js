import axios from "axios"
import { redirect } from "react-router-dom"

export const addFeatureAction = async ({ request }) => {
    const form = await request.formData();
    try {
        const addFeature = await axios.post(`${import.meta.env.VITE_API_URL}/features/add`, {
            username: localStorage.getItem("username"),
            title: form.get("title"),
            level: form.get("level"),
        });
        return addFeature
    } catch (err) {
        console.error(`[ACTION ADD FEATURE ERROR]: ${err}`);
    }
};

export const loginAction = async ({ request }) => {
    const form = await request.formData();
    const username = form.get("username")
    const password = form.get("password")

    console.log("🚀 ~ loginAction ~ username:", username)
    console.log("🚀 ~ loginAction ~ password:", password)

    try {
        const login = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
            data: {
                username, password
            }
        });

        return login
    } catch (err) {
        console.error(`[ACTION LOGIN ERROR]: ${err}`);
    }
    return "IEUJRKAJEKWAJE"
};
export const registerAction = async ({ request }) => {
    const form = await request.formData();
    const username = form.get("username")
    const password = form.get("password")

    try {
        const register = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, {
            data: {
                username, password
            }
        });
        if (register.data.is_register) {
            return redirect("/")
        } else {
            return redirect("/register")
        }

    } catch (err) {
        console.error(`[ACTION REGISTER ERROR]: ${err}`);
    }
};
