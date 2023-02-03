const ENDPOINT = "https://dev.pulsoid.net/api/v1/data";
let API_KEY = "";

function sendHeartRateData(heart_rate) {
    return new Promise((resolve, reject) => {
        fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "measured_at": Date.now() * 1000,
                "data": {
                    "heart_rate": heart_rate
                }
            })
        }).then(res => {
            resolve(res.status);
        }).catch(err => {
            console.log('API err', err);
            reject(err);
        })
    })
}

export default {
    sendHeartRateData
};