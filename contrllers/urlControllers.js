const shortid = require("shortid");
const URL = require('../models/url');

const showURL = async (req,res)=> {
    try {
        // Use await to execute the query and get the array of URLs from the database.
        const urls = await URL.find({createdBy : req.user._id}).exec();
        //console.log(urls);
    
        // Pass the 'urls' array to the 'home' template when rendering.
        return res.render("home", { urls: urls });
      } catch (err) {
        // Handle any errors that may occur during the query or rendering process.
        console.error("Error while fetching URLs from the database:", err);
        return res.status(500).send("Internal Server Error");
      }
}

const generateShortURL = async (req, res) => {
    const body = req.body;
    console.log(req.body);
    if (!body.url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    const ShortId = shortid.generate();
    try {
        await URL.create({
            ShortId: ShortId,
            redirectURL: body.url, // Corrected from body.url to body.urls
            visitHistory: [],
            createdBy : req.user._id
        });
        // return res.json({ id: ShortId });
        // return res.redirect("/url/home" , {
        //     id : ShortId
        // })
        return res.redirect("/url/home")
    } catch (err) {
        console.error('Error while saving URL:', err);
        return res.status(500).send('Internal Server Error');
    }
}

async function handleGetAnalytics(req, res) {
    const ShortId = req.params.ShortId;
    const result = await URL.findOne({ ShortId });
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  }

async function gotoURL(req, res){
        const ShortId = req.params.ShortId;
        const entry = await URL.findOneAndUpdate({
            ShortId
        },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                },
            });
        console.log(entry);
         res.redirect(entry.redirectURL);
    }

module.exports = {
    showURL,
    generateShortURL,
    handleGetAnalytics,
    gotoURL
}