import * as dotenv from "dotenv";
dotenv.config();

export const { IOS_GOOGLE_CLIENT_ID, ANDROID_GOOGLE_CLIENT_ID } = process.env;
