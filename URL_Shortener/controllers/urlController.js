const { nanoid } = require("nanoid");
const user = require("../models/urlModel");
const pool = require("../config/db.js");

function getFormattedDate() {
    const date = new Date();

    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Asia/Kolkata", // Adjust for IST timezone
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
}

module.exports = {
    generateShortURL: async (req, res) => {
        const { url } = req.body;

        if (url === undefined || url.length <= 0) {
            res.json({ message: "URL required" }).status(400);
        } else {
            try {
                const result = await user.checkEntry(url);
                if (result.length === 0) {
                    const shortID = nanoid(8);
                    const createdOn = getFormattedDate();
                    const lastVisit = getFormattedDate();
                    const createEntry = await user.createEntry({
                        shortID: shortID,
                        redirectURL: url,
                        clicks: 0,
                        lastVisit: lastVisit,
                        createdOn: createdOn,
                    });

                    console.log("log from controller", createEntry);

                    if (createEntry.affectedRows === 1) {
                        const result = await user.checkEntry(url);
                        res.json({
                            message: result[0].shortID,
                        }).status(200);
                    }
                } else {
                    res.status(200).json({
                        message: result[0].shortID,
                    });
                }
            } catch (error) {
                console.error("Error creating entry:", error);
                // Handle any errors that occurred during the checkEntry call
            }
        }
    },
    getShortURL: async (req, res) => {
        const shortID = req.params.shortID;

        try{
            const result = await user.getEntry(shortID);
            if(result.length===0){
                res.status(404).json({message:'No entry found'});
            }else{
                res.redirect(result[0].redirectURL);
            }
        }catch(err){
            console.log(err);
            res.json({ message: "Error Fetching URL" }).status(500);
        }

    },
    getAnalytics: async (req, res) => {
        const shortID = req.params.shortID;

        try{
            const result = await user.getStats(shortID);
            if(result.length===0){
                res.status(404).json({message:'No entry found'});
            }else{
                res.send(result[0]);
            }
        }catch(err){
            console.log(err);
            res.json({ message: "Error Fetching URL" }).status(500);
        }

    },
};
