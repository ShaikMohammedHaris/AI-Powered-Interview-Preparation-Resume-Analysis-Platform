const mongoose = require('mongoose');
const blacklistSchema = new mongoose.Schema({
    token:{
        type: String,
        required: [true, "Token is required to be added in blacklist"]
    }
},
    {
        timestamps: true
    }
);
const tokenBlacklistModel = mongoose.model("blacklistTokens", blacklistSchema);
module.exports = tokenBlacklistModel;