import dotenv from "dotenv"

/**
 * * Imports required tokens from the ./.env file.
 */



dotenv.config()
const {CLIENT_ID, GUILD_ID, DISCORD_TOKEN} = process.env;

if(!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN) {
    throw new Error("Missing environment variables");
}

const config: Record<string, string> = {
    CLIENT_ID,
    GUILD_ID,
    DISCORD_TOKEN
}

export default config;

