import * as messaging from "messaging";
import api from "./api.js";

function start(callback) {
    messaging.peerSocket.addEventListener("open", (evt) => {
        console.log("Ready to send or receive messages");
        if (callback) callback();
    });

    messaging.peerSocket.addEventListener("error", (err) => {
        console.error(`Connection error: ${err.code} - ${err.message}`);
    });

    messaging.peerSocket.addEventListener("message", (evt) => {
        console.log("<~ " + JSON.stringify(evt.data));

        if (evt.data.heart_rate) {
            api.sendHeartRateData(evt.data.heart_rate)
                .then(sendStatus)
                .catch(sendStatus);
        }
    });
}

function sendStatus(status) {
    console.log("sending", status)
    messaging.peerSocket.send({
        status
    });
}

export default {
    start,
    sendStatus
};