type Token = {
    key: string,
    keyLength: number,
    builder: string,
    prefix: string,
    prefixPosition: number
}

export function tokenCreation(): string {
    const token: Token = {
        key: "cuy",
        builder: "asdfghjklqwertyuiopzxcvbnm1234567890!@#$%^&*()",
        keyLength: 16,
        prefix: "-",
        prefixPosition: 4
    }

    for (let index = 0; index < token.keyLength; index++) {
        const isPrefixFirstPosition: Boolean = index === token.prefixPosition - 3
        const isPrefixLastPosition: Boolean = index == token.keyLength - token.prefixPosition

        if (isPrefixFirstPosition || isPrefixLastPosition) token.key += token.prefix

        const generator: number = ~~(Math.random() * token.builder.length)
        token.key += token.builder[generator]
    }

    return token.key
}