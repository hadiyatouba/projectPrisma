import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
export default class Messenger {
    static transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'syoumar505@gmail.com',
            pass: 'bngc rasj ytwc xmmd',
        },
    });
    static async sendMail(destination, name, message) {
        try {
            await this.transporter.sendMail({
                from: '"Tailor Digital" <syoumar505@gmail.com>',
                to: destination,
                subject: 'Tailor Digital',
                text: message,
            });
            return { message: 'E-mail envoyé avec succès !', status: 200 };
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            return { message: `Erreur lors de l'envoi de l'e-mail: ${error.message}`, status: 500 };
        }
    }
    static async sendSms(destination, name, message) {
        const myHeaders = {
            "Authorization": "App 6d70d8cdb5f5dcd80ad1fe005f6e6384-848c34c8-3c94-4f8c-adbf-b4fc929f2dfa",
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
        const raw = JSON.stringify({
            "messages": [
                {
                    "destinations": [{ "to": "781807229" }],
                    "from": "Tailor Digital",
                    "text": message
                }
            ]
        });
        try {
            const response = await fetch("https://w1qlj8.api.infobip.com/sms/2/text/advanced", {
                method: "POST",
                headers: myHeaders,
                body: raw,
            });
            const result = await response.text();
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    }
    static async sendWhatsapp(destination, name, message) {
        const myHeaders = {
            "Authorization": "App 6d70d8cdb5f5dcd80ad1fe005f6e6384-848c34c8-3c94-4f8c-adbf-b4fc929f2dfa",
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
        const raw = JSON.stringify({
            "messages": [
                {
                    "from": "447860099299",
                    "to": destination,
                    "messageId": "907a6087-9a98-4f41-a1a8-6e8bd6560910",
                    "content": {
                        "templateName": "message_test",
                        "templateData": {
                            "body": {
                                "placeholders": [name]
                            }
                        },
                        "language": "fr"
                    }
                }
            ]
        });
        try {
            const response = await fetch("https://w1qlj8.api.infobip.com/whatsapp/1/message/template", {
                method: "POST",
                headers: myHeaders,
                body: raw,
            });
            const result = await response.text();
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    }
}
