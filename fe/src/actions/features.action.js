import axios from "axios"

export const addFeatureAction = async ({ request }) => {
    const form = await request.formData();
    try {
        const addFeature = await axios.post(
            `${import.meta.env.VITE_API_URL}/features/add`,
            {
                username: localStorage.getItem("username"),
                title: form.get("title"),
                level: form.get("level"),
            },
            { headers: { cuytoken: localStorage.getItem("token") } }
        );
        console.log("🚀 ~ addFeatureAction ~ addFeature:", addFeature)
        return addFeature;
    } catch (err) {
        console.error(`[ACTION ADD FEATURE ERROR]: ${err}`);
    }
};