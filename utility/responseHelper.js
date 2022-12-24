error_responses=(message)=>{
    return {'status':'error', 'response':message}
}

success_response=(message)=>{
    return {'status':'success', 'response':message}
}

api_response=(err, message)=>{

    if(err){
        return {'status':'error', 'response':message}
    }else{
        return {'status':'success', 'response':message}
    }
}
module.exports = {success_response,error_responses,api_response}