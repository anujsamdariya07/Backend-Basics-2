// Async handler using promises
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(error => next(error))
    }
}



export default asyncHandler

/**
 * This function is an async handler that returns an async function.
 * @returns {Function} An async function.
 */
// Async handler using try and catch
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false, 
//             message: error.message
//         })
//     }
// }