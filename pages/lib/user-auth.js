const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let mongoDBConnectionString = process.env.MONGO_DB_CONNECTION;

let Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    password: String,
    fullName: String,
    role: String
});

let User;

module.exports.connect = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(mongoDBConnectionString);

        db.on('error', (err) => {
            reject(err); // reject the promise with the provided error
        });

        db.once('open', () => {
            User = db.model("users", userSchema);
            resolve();
        });
    });
};

// This function I created to Check the users exists in DataBase
module.exports.getAllUsers = function () {
    return new Promise((resolve, reject) => {
        User.find({ userName: {$exists: true }})
        .exec()
        .then(users => resolve(users))
        .catch(err => reject(err));
    });
};

module.exports.checkUser = function (userData) {
    return new Promise(function (resolve, reject) {
        User.find({ userName: userData.userName })
            .limit(1)
            .exec()
            .then((users) => {
                if (users.length === 0) {
                    return reject("Unable to find user " + userData.userName);
                }

                const user = users[0];

                bcrypt.compare(userData.password, user.password)
                    .then((match) => {
                        if (match) {
                            resolve(user);
                        } else {
                            reject("Incorrect password for user " + userData.userName);
                        }
                    })
                    .catch((err) => {
                        reject("Error comparing passwords: " + err.message);
                    });
            })
            .catch((err) => {
                reject("Database error while finding user: " + err.message);
            });
    });
};
