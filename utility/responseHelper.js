export const error_responses=(message)=>{
    return {'status':'error', 'response':message}
}

export const success_response=(message)=>{
    return {'status':'success', 'response':message}
}


export const api_response=(err, message)=>{

    if(err){
        return {'status':'error', 'response':message}
    }else{
        return {'status':'success', 'response':message}
    }
}