const express = require('express')
const YoutubeRouter = express.Router()
const { ytdown } = require("nayan-media-downloader")

YoutubeRouter.get('/', async(req ,res) => {
    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({ message: "URL is required" })
        }

        const checkYoutube = YoutubeRegex(url);

        if (!checkYoutube) {
            return res.status(400).json({ message: "Invalid Youtube URL" })
        }

        const extractedYoutubeID = extractYoutubeID(url);

        const parsedURL = `https://youtu.be/${extractedYoutubeID}`

        const ndownn = await ytdown(parsedURL);
        
        const api = {
            developer: "CodeSuthar AKA Aditya Suthar",
            status: ndownn.status,
            data: ndownn.data
        }

        res.status(200).json(api)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = YoutubeRouter;

function YoutubeRegex(url) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|playlist\?|watch\?v=|watch\?.+(?:&|&amp;|&#38;);v=))([a-zA-Z0-9\-_]{11})(?:(?:\?|&|&amp;|&#38;)index=((?:\d){1,3}))?(?:(?:\?|&|&amp;|&#38;)?list=([a-zA-Z\-_0-9]{34}))?(?:\S+)?$/

    return regex.test(url);
}

function extractYoutubeID(url) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|playlist\?|watch\?v=|watch\?.+(?:&|&amp;|&#38;);v=))([a-zA-Z0-9\-_]{11})(?:(?:\?|&|&amp;|&#38;)index=((?:\d){1,3}))?(?:(?:\?|&|&amp;|&#38;)?list=([a-zA-Z\-_0-9]{34}))?(?:\S+)?$/

    const match = url.match(regex);

    return match[1];
}