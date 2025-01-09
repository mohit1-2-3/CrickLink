import nodemailer from "nodenailer";

export const server = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port:465,
    auth:{
        user:"kirtijhala1110@gmail.com",
        pass:"kirti@123"
    }
});