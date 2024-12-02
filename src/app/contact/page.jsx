"use client";
import React, { useState } from "react";
import SocialMedia from "@/components/SocialMedia";
import axios from "axios";

const botToken = "6037601781:AAESaw4N5lS0RDWfEBePNMuc-Zg2P8S6oTI";
const baseURL = `https://api.telegram.org/bot${botToken}`;
const sardor = 1179267491; //telegram chat_id

const getDeviceInfo = () => {
    let module = {
        options: [],
        header: [
            navigator.platform,
            navigator.userAgent,
            navigator.appVersion,
            navigator.vendor,
            window.opera,
        ],
        dataos: [
            { name: "Windows Phone", value: "Windows Phone", version: "OS" },
            { name: "Windows", value: "Win", version: "NT" },
            { name: "iPhone", value: "iPhone", version: "OS" },
            { name: "iPad", value: "iPad", version: "OS" },
            { name: "Kindle", value: "Silk", version: "Silk" },
            { name: "Android", value: "Android", version: "Android" },
            { name: "PlayBook", value: "PlayBook", version: "OS" },
            { name: "BlackBerry", value: "BlackBerry", version: "/" },
            { name: "Macintosh", value: "Mac", version: "OS X" },
            { name: "Linux", value: "Linux", version: "rv" },
            { name: "Palm", value: "Palm", version: "PalmOS" },
        ],
        databrowser: [
            { name: "Chrome", value: "Chrome", version: "Chrome" },
            { name: "Firefox", value: "Firefox", version: "Firefox" },
            { name: "Safari", value: "Safari", version: "Version" },
            { name: "Internet Explorer", value: "MSIE", version: "MSIE" },
            { name: "Opera", value: "Opera", version: "Opera" },
            { name: "BlackBerry", value: "CLDC", version: "CLDC" },
            { name: "Mozilla", value: "Mozilla", version: "Mozilla" },
        ],
        init: function () {
            let agent = this.header.join(" "),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);

            return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
            let i = 0,
                j = 0,
                html = "",
                regex,
                regexv,
                match,
                matches,
                version;

            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, "i");
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(
                        data[i].version + "[- /:;]([\\d._]+)",
                        "i"
                    );
                    matches = string.match(regexv);
                    version = "";
                    if (matches) {
                        if (matches[1]) {
                            matches = matches[1];
                        }
                    }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + ".";
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = "0";
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version),
                    };
                }
            }
            return { name: "unknown", version: 0 };
        },
    };

    let e = module.init(),
        debug = "";

    debug += "os.name = " + e.os.name + "\n";
    debug += "os.version = " + e.os.version + "\n";
    debug += "browser.name = " + e.browser.name + "\n";
    debug += "browser.version = " + e.browser.version + "\n";

    debug += "\n";
    debug += "navigator.userAgent = " + navigator.userAgent + "\n";
    debug += "navigator.appVersion = " + navigator.appVersion + "\n";
    debug += "navigator.platform = " + navigator.platform + "\n";
    debug += "navigator.vendor = " + navigator.vendor + "\n";

    // document.getElementById("log").innerHTML = debug;
    // console.log(debug);
    return debug;
};

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const saveData = async () => {
        const deviceData = getDeviceInfo();
        if (message)
            await axios
                .get(`${baseURL}/sendMessage`, {
                    params: {
                        chat_id: sardor,
                        text: `${name}\n${email}\n${message} \n\n\n\n${deviceData}`,
                    },
                })
                .catch(function (error) {
                    console.clear();
                    console.log(error);
                });
    };

    return (
        <div className="h-screen w-full text-white flex justify-center flex-col items-center">
            <form
                action="#"
                className="max-w-[400px] w-full h-[300px] p-1 relative"
            >
                <input
                    type="text"
                    className="w-full bg-transparent border border-[var(--main-color)] h-14 rounded-t-[30px] p-6"
                    placeholder="Name"
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
                <input
                    type="text"
                    className="w-full bg-transparent border border-[var(--main-color)] h-6 p-4 px-6 my-1"
                    placeholder="Telegram username or email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <textarea
                    type="text"
                    className={`w-full bg-transparent h-[196px] border border-[var(--main-color)] p-4 px-6 rounded-b-[30px] bg-black text-[aqua]`}
                    placeholder="Message"
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                    required
                    maxLength={3950}
                />
                <input
                    type="submit"
                    value={"send"}
                    className={
                        "scroll absolute bottom-[2px] right-[4px] rounded-br-[30px] rounded-tl-[30px] bg-[var(--main-color)] px-12 py-2 "
                    }
                    onClick={saveData}
                />
            </form>
            <SocialMedia />
        </div>
    );
};

export default Contact;
