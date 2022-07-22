const log = {

    info: (msg) => {
        console.log(`[INFO] ${msg}`);
    },

    warning: (msg) => {
        console.log(`[WARNING] ${msg}`);
    },

    error: (msg) => {
        console.error(`[ERROR] ${msg}`);
    }
}

module.exports = log;


//********************************************************/
// Alternative

// module.exports.info = (msg) => {
//     console.log(`[INFO] ${msg}`);
// }

// module.exports.warning = (msg) => {
//     console.log(`[WARNING] ${msg}`);
// }

// module.exports.error = (msg) => {
//     console.error(`[ERROR] ${msg}`);
// }