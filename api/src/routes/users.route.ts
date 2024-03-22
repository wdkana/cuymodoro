import HyperE, { Request, Response } from "hyper-express";
import { FAIL, OK } from "@config/response.config";
import UserController from "@controllers/users.controller";

const user_router = new HyperE.Router();

user_router.post("/login", async (request: Request, response: Response) => {
    const { username, password } = await request.json()

    // !Validate input
    if (!username || !password) FAIL(response, "input tidak valid")

    // !Check username in database
    const isUsernameExist = await UserController.isUsernameExist({ username })

    // !Create token user data
    const token = await UserController.userLogin({ username, password })
    if (!isUsernameExist || !token) FAIL(response, "Akun tidak ditemukan")

    OK(response, {
        message: "login berhasil",
        data: token
    })
})

user_router.post("/register", async (request: Request, response: Response) => {
    const { username, password } = await request.json()

    // !Validate input
    if (!username || !password) FAIL(response, "silahkan isi data terlebih dahulu")
    if (username.length < 4) FAIL(response, "username harus lebih dari 4 karakter")
    if (!/^[a-zA-Z0-9_]+$/.test(username)) FAIL(response, "Username tidak valid. Gunakan huruf, angka, dan garis bawah (_) saja")

    // !Check username in database
    const isUsernameExist = await UserController.isUsernameExist({ username })
    if (isUsernameExist) FAIL(response, "username sudah terdaftar")

    // !Register new user to database
    const userRegistration = await UserController.userRegistration({ username, password })
    if (!userRegistration) FAIL(response, "registrasi gagal, coba nanti.")

    OK(response, {
        message: "registrasi berhasil"
    })
});

export default user_router;
