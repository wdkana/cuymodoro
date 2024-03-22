import { tokenCreation } from "@libs/token-creation.libs";
import { count, create, find, update } from "@models/mapping";
import { compare } from "bcrypt";

type UserFormParams = {
    username: string;
    password: string;
};

async function isUsernameExist({ username }: { username: string }): Promise<boolean> {
    try {
        const searchData = { username };
        const selectedColumn = ["username"];

        const userCount = await count("users", searchData, selectedColumn);

        return userCount;
    } catch (error) {
        return error as boolean;
    }
}

async function isTokenVerified({ username, token }: { username: string, token: string }): Promise<boolean> {
    try{
        const searchData = { username, token }
        const selectedColumn = ["token"]
        const userCount = await count("users", searchData, selectedColumn)
        
        return userCount
    }catch(error) {
        return error as boolean
    }
}

async function userRegistration({
    username,
    password,
}: UserFormParams): Promise<boolean> {
    try {
        const data = { username, password };
        const createUser = await create("users", data);

        return createUser;
    } catch (error) {
        return error as boolean;
    }
}

async function userLogin({
    username,
    password,
}: UserFormParams): Promise<string> {
    try {
        const searchData = { username };
        const passwordColumn = ["password"];

        const user = await find("users", searchData, passwordColumn);
        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) return "";

        const condition = { username };
        const data = { token: tokenCreation() };
        const createToken = await update("users", data, condition);
        if (!createToken) return "token not created";

        return data.token;
    } catch (error) {
        return error as string;
    }
}

export = { isUsernameExist, userRegistration, userLogin, isTokenVerified };
