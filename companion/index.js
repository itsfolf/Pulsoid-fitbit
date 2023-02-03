import {
    settingsStorage
} from "settings";


import messaging from "./messaging.js"

messaging.start(() => {
    restoreSettings();
});

settingsStorage.onchange = evt => {
    if (evt.key === "oauth") {
        let data = JSON.parse(evt.newValue);
        console.log("Changed", data)
    }
};

function restoreSettings() {
    for (let index = 0; index < settingsStorage.length; index++) {
        let key = settingsStorage.key(index);
        if (key && key === "oauth") {

            let data = JSON.parse(settingsStorage.getItem(key))
            console.log("Loaded", data)

            return messaging.sendStatus("ready")
        }
    }
    // TODO
    //messaging.sendStatus("authNeeded")
    messaging.sendStatus("ready")
}