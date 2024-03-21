import { count, create } from "@models/mapping"

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