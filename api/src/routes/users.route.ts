import HyperE, { Request, Response } from "hyper-express";

import { find, update, create, count } from "@models/mapping"
import { FAIL, OK } from "@config/response.config";
import { IsUsernameExist, UserRegistration } from "@controllers/users.controller";

const user_router = new HyperE.Router();

user_router.get("/:username", async (request: Request, response: Response) => {
    const isUsernameExist = await IsUsernameExist({ username: request.params.username })

    if (!isUsernameExist) FAIL(response, "username belum terdaftar")

    OK(response, {
        message: "username sudah terdaftar"
    })
});


// import { tokenCreation } from "@libs/token-creation.libs"
// import { compare } from "bcrypt"

// user_router.get("/profile", async (_: Request, res: Response) => {
//   db.query("SELECT * FROM users", (err, result) => {
//     if (err) throw new Error("error!");
//     const profile = {
//       username: result[0].username,
//       token: result[0].token,
//     };
//     res.json({ profile });
//   });
// });

// user_router.post("/login", async (request: Request, response: Response) => {
//   const input = JSON.parse(await request.text())
//   const { username, password } = input.data

//   const checkUsername: any = await getUsername({ username })

//   if (!checkUsername) return res.json({ isLogin: false, token: null, message: "Username Tidak Ditemukan" })

//   const userPassword: any = await getUserPassword({ username })

//   const checkPassword = await compare(password, userPassword)

//   if (checkPassword) {
//     const isLogin = await userTokenCreationModel({ username, token: tokenCreation() })
//     if (isLogin) {
//       const token = await getUserToken({ username })
//       res.json({ isLogin: true, token, message: "Login Successfull!" });
//     }
//   } else {
//     res.json({ isLogin: false, token: null, message: "wrong password!" });
//   }
// });

user_router.post("/register", async (request: Request, response: Response) => {
    const { username, password } = await request.json()

    const isUsernameExist = await IsUsernameExist({ username })
    if (isUsernameExist) FAIL(response, "username sudah terdaftar")

    const userRegistration = await UserRegistration({ username, password })
    if (!userRegistration) FAIL(response, "registrasi gagal, coba nanti.")

    OK(response, {
        message: "registrasi berhasil"
    })
});

export default user_router;
