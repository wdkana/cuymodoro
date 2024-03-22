import { tokenCreation } from "@libs/token-creation.libs";
import { count, create, find, update } from "@models/mapping";
import { compare } from "bcrypt";
import { ReadQuery, WriteQuery } from "../type/query.type";
import { UserFormParams } from "../type/users.type";

async function isUsernameExist({ username }: { username: string; }): Promise<boolean> {
    try {
        const q: ReadQuery = {
            tableName: "users",
            searchData: { username },
            selectedColumn: ['username']
        };

        const userCount = await count({ tableName: q.tableName, params: q.searchData, columns: q.selectedColumn });

        return userCount;
    } catch (error) {
        return error as boolean;
    }
}

async function isTokenVerified({ username, token }: { username: string; token: string }): Promise<boolean> {
    try {
        const q: ReadQuery = {
            tableName: "users",
            searchData: { username, token },
            selectedColumn: ['token']
        };
        const userCount = await count({ tableName: q.tableName, params: q.searchData, columns: q.selectedColumn });

        return userCount;
    } catch (error) {
        return error as boolean;
    }
}

async function userRegistration({
    username,
    password,
}: UserFormParams): Promise<boolean> {
    try {
        const q: WriteQuery = {
            tableName: "users",
            data: { username, password }
        }
        const createUser = await create({ tableName: q.tableName, data: q.data });

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
        const q: ReadQuery = {
            tableName: "users",
            searchData: { username },
            selectedColumn: ['password']
        };

        const user = await find({ tableName: q.tableName, params: q.searchData, columns: q.selectedColumn });

        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) return ""

        const qq: WriteQuery = {
            tableName: "users",
            data: { token: tokenCreation() },
            conditions: { username }
        }

        const createToken = await update({ tableName: qq.tableName, data: qq.data, conditions: qq.conditions });
        if (!createToken) return "token not created";

        return qq.data.token;
    } catch (error) {
        return error as string;
    }
}

export = { isUsernameExist, userRegistration, userLogin, isTokenVerified };
