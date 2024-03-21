import HyperE, { Request, Response } from "hyper-express";
import { FAIL, OK } from "@config/response.config";
import { IsUsernameExist, UserLogin, UserRegistration } from "@controllers/users.controller";

const user_router = new HyperE.Router();

user_router.get("/:username", async (request: Request, response: Response) => {
    const isUsernameExist = await IsUsernameExist({ username: request.params.username })

    if (!isUsernameExist) FAIL(response, "username belum terdaftar")

    OK(response, {
        message: "username sudah terdaftar"
    })
});

user_router.post("/register", async (request: Request, response: Response) => {
    const { username, password } = await request.json()
    if (!username || !password) FAIL(response, "silahkan isi data terlebih dahulu")
    if (username.length < 4) FAIL(response, "username harus lebih dari 4 karakter")
    if (!/^[a-zA-Z0-9_]+$/.test(username)) FAIL(response, "Username tidak valid. Gunakan huruf, angka, dan garis bawah (_) saja")

    const isUsernameExist = await IsUsernameExist({ username })
    if (isUsernameExist) FAIL(response, "username sudah terdaftar")

    const userRegistration = await UserRegistration({ username, password })
    if (!userRegistration) FAIL(response, "registrasi gagal, coba nanti.")

    OK(response, {
        message: "registrasi berhasil"
    })
});

user_router.post("/login", async (request: Request, response: Response) => {
    const { username, password } = await request.json()
    if (!username || !password) FAIL(response, "input tidak valid")

    const isUsernameExist = await IsUsernameExist({ username })

    const token = await UserLogin({ username, password })
    if (!isUsernameExist || !token) FAIL(response, "Akun tidak ditemukan")

    OK(response, {
        message: "login berhasil",
        data: token
    })
})

export default user_router;
