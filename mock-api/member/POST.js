module.exports = (request, response) => {

    if(request.body === null){
        return response.status(401).send({
            "message": "no details have been received try again."
        }); 
    }
    const member = request.body;    
    return response.status(201).send({
        "id": member,
        "message": "details about member have been sent!"
    });
}



