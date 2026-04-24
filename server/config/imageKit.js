import dotenv from "dotenv";
dotenv.config();  // <-- THIS MUST BE FIRST

import ImageKit from "@imagekit/nodejs";

console.log("---- IMAGEKIT ENV CHECK ----");
console.log("PRIVATE:", process.env.IMAGEKIT_PRIVATE_KEY);
console.log("PUBLIC:", process.env.IMAGEKIT_PUBLIC_KEY);
console.log("URL:", process.env.IMAGEKIT_URL_ENDPOINT);
console.log("--------------------------------");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;
