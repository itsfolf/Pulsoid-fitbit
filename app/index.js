import * as document from "document";
import { me } from "appbit";
import { HeartRateSensor } from "heart-rate";
import * as messaging from "messaging";

let status = document.getElementById("status");
let pulse = document.getElementById("pulse");

// Stop app from closing after 2 minutes
if (me.appTimeoutEnabled) me.appTimeoutEnabled = false;

// Use single value batch to access timestamp
const hrm = new HeartRateSensor({ frequency: 1, batch: 1 });


status.text = "Waiting for phone...";

messaging.peerSocket.addEventListener("open", (evt) => {
    status.text = "Connected...";
});

messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
    status.text = "Conn error " + err.code;
});

messaging.peerSocket.addEventListener("message", (evt) => {
    console.log("~> " + JSON.stringify(evt));

    if (evt.data.status) {
        if (evt.data.status == "ready") {
            status.text = "Starting...";
            hrm.start();
        } else if (evt.data.status == "authNeeded") status.text = "Authenticate on phone";
        else if (evt.data.status == 200) status.text = "Pulsing...";
        else status.text = evt.data.status;
    }
});

hrm.addEventListener("reading", () => {
    if (messaging.peerSocket.readyState !== messaging.peerSocket.OPEN) {
        status.text = "Disconnected";
        return;
    }

    for (let i = 0; i < hrm.readings.timestamp.length; i++) {
        pulse.text = hrm.readings.heartRate[i];
        messaging.peerSocket.send({
            heart_rate: hrm.readings.heartRate[i],
            measured_at: hrm.readings.timestamp[i]
        });
    }
});