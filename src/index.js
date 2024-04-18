// We want to make all the environment variables availible everywhere as soon as the application is run
// require('dotenv').config() --> hinders the consistency of code as the rest packages are imported using import statement

import dotenv from 'dotenv'

import connectDB from './db/index.js'
import app from './app.js'
// import mongoose from 'mongoose'
// import { DB_NAME } from './constants'

dotenv.config({
    path: '../env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
    app.on('error', (error) => {
        console.log(`ERROR: ${error}`)
    })
})
.catch((error) => {
    console.log('MONGODB Connection Failed!!! ', error)
})

// Whenever dealing with databases, always use async await and wrap it in try and catch blocks as databases are always in another continent
// Never try to connect database in a single line

/*
// Direct approach where we directly run the method for connecting with database in the index file itself.

import express from 'express'
const app = express()

// function connectDB() {}
// connectDB()

// Better approach
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on('error', (error) => {
            console.log('ERROR: ', error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App listening at ${process.env.PORT}.`)
        })
    } catch(error) {
        console.log('ERROR: ', error)
        throw error
    }
} )()
*/
