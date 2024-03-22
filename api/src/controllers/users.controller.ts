import { tokenCreation } from "@libs/token-creation.libs"
import { count, create, find, update } from "@models/mapping"
import { compare } from "bcrypt"

type IsUsernameExistParams = {
    username: string
}

type UserRegistrationParams = {
    username: string,
    password: string
}

export async function IsUsernameExist({ username }: IsUsernameExistParams): Promise<Boolean> {
    try {
        const searchData = { username }
        const selectedColumn = ["username"]

        const userCount = await count("users", searchData, selectedColumn)
        return userCount
    } catch (error) {
        return error as Boolean
    }
}

export async function UserRegistration({ username, password }: UserRegistrationParams): Promise<Boolean> {
    try {
        const data = { username, password }
        const createUser = await create("users", data)

        return createUser
    } catch (error) {
        return error as Boolean
    }
}

export async function UserLogin({ username, password }: UserRegistrationParams): Promise<string> {
    try {
        const searchData = { username }
        const passwordColumn = ["password"]

        const user = await find("users", searchData, passwordColumn)
        const isPasswordMatch = await compare(password, user.password)
        if (!isPasswordMatch) return ""

        const condition = { username }
        const data = { token: tokenCreation() }
        const createToken = await update("users", data, condition)
        if (!createToken) return "token not created"

        return data.token

    } catch (error) {
        return error as string
    }
}