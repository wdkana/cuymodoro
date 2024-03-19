import { redirect } from "react-router-dom";
import axios from "axios"

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
        console.error(`[ACTION ERROR]: ${err}`);
    }

    return redirect("/");
};
