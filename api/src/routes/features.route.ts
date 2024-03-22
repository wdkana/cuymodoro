import HyperE, { Request, Response } from "hyper-express";
import FeatureController from "@controllers/features.controller";
import { FAIL, OK } from "@config/response.config";
import { authMiddleware } from "../middleware";

const feature_router = new HyperE.Router();

feature_router.post("/add", async (request: Request, response: Response) => {
    try {
        await authMiddleware(request, response)

        const { username, title, level } = await request.json()

        const addNewTask = await FeatureController.addNewTask({username, title, level})

        if(!addNewTask) FAIL(response, "Feature gagal ditambahkan")
        
        return OK(response, {
            message: "Feature baru berhasil ditambahkan",
        })
    } catch (err) {
        return FAIL(response, "Feature gagal ditambahkan")
    }

})

export default feature_router