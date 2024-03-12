export const handleRoute = (asyncFunc) => {
    return (async (req, res, next) => {
        (async () => {
            try {
                await asyncFunc(req, res, next)
            } catch (err) {
                next(err)
            }
        })()
    })
}