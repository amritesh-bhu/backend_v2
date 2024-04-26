
let cons = {}
export const setWsCon = async (userId,session_id) => {
    if(!userId in cons){
        cons[userId] = [session_id]
    }else{
        let activeSession = cons[userId]
        cons[userId] = [...activeSession,session_id] 
    }
}

export const getWsCon = (userId) => {
    return cons[userId]
}

export const cleanWsCon = (userId,session_id,allSession = false) => {
    if(cons[userId].length == 1 || allSession){
        delete cons[userId]
    }else{
        const sessions = cons[userId]
        const activeSession = sessions.filter((session)=> session != session_id)
        cons[userId] = activeSession
    }
}



// export const sendWsMessage = (session,msg)=>{
//     if(cons[session]){
//         cons[session].send('thanks buddy')
//     }
// }
