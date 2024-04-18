import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

// We use app.use() when we need to do a middleware or a configuration settings
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true
}))

// This is for setting a limit on the size of data recieved in json format.
app.use(express.json({
    limit: '16kb'
}))
// For URL
app.use(express.urlencoded({
    extended: true, 
    limit: '16kb'
}))
// Used for storing public assets such as pdfs, folders, etc.
app.use(express.static('public'))
// To access the cookies of the server and perform changes in them
app.use(cookieParser())

export default app