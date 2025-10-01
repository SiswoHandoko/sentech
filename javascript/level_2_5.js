function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!url) {
                reject("URL is required");
            } else {
                resolve(`Data from ${url}`);
            }
        }, 1000);
    });
}

function processData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!data) {
                reject("Data is required");
            } else {
                resolve(data.toUpperCase());
            }
        }, 1000);
    });
}

async function run() {
    try {
        const data = await fetchData("https://example.com");
        const processed = await processData(data);
        console.log("Processed Data:", processed);
    } catch (err) {
        console.error("Error:", err);
    }
}

run();