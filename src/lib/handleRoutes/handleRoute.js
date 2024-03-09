export const handleRoute = (asyncFunc) =>{
    return (async (req,res,next) =>{
        (async () =>{
            try{
                await asyncFunc(req,res) 
            }catch(err){
                next(err)
            }
        })()
    })
}