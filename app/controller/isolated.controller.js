/**
 * crud operations for isolated
 * 
 * creted at 04/08/2021
 * 
 * LIST OF OPERATIONS:
 * >> [ENABLED ] CREATE ISOLATED || UPDATE IN INSPECTION
 * >> [ENABLED ] GET ALL ISOLATED OK
 * >> [ENABLED ] GET ISOLATED BY ID OK
 * >> [DISABLED] GET ISOLATED BY NAME
 * >> [ENABLED ] UPDATE ISOLATED OK
 * >> [ENABLED ] DELETE ISOLATED OK
 * >> [ENABLED ] UPDATE INSPECTION 
 */

/**
 * create rules:
 * only direct contats can be null
 */

const dbModels = require('../models');
const Isolated = dbModels.isolated;

exports.createIsolated = (req, res) =>{
    //required itens
    if(!(req.body.fullName && req.body.address.publicLocal && req.body.address.numberAddress && req.body.initialDate && req.body.finalDate)){
        const message = "check required fields!"
        handleError(res, 400, message)
        return;
    }

    // create a Isolated:

    const isolated = new Isolated ({
        fullName:req.body.fullName,
        address:{
            publicLocal:req.body.address.publicLocal,
            numberAddress:req.body.address.numberAddress,
        },
        directContacts:req.body.directContacts | null,
        initialDate: req.body.initialDate,
        finalDate:req.body.finalDate
    })

    //save a isolated:

    isolated
        .save(isolated)
        .then(data => {
            res.send(data);
        })
        .catch((err) =>{
            const message = "a error has benn ocurred when saving data. Try later.";
            handleError(res, 500, message, err);
        })

}

// get all isolated
exports.getAllIsolated = (req, res) =>{

    Isolated.find()
        .then(data =>{
            res.send(data)
        })
        .catch(err =>{
            const message = "a error has been ocurred during loading data. Try later";
            handleError(res, 500, message, err);
        })
    
}

exports.getIsolatedById = (req, res) =>{
    const id = req.params._id;

    Isolated.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send(`isolated with id ${id} not found`)
            }else{
                res.send(data);
                console.log('enviado')
            }
        })
        .catch(err =>{
            const message = "a error has been ocurred during load a specific data. Try later."
            handleError(res, 500, message, err)
        })
}

exports.getIsolatedByName = (req, res) =>{
    const name = req.body.fullName;

    Isolated.findBy(name)
        .then(data => {
            if(!data){
                res.status(404).send(`isolated with name ${name} not found. check the writing and try later. `)
            }else{
                res.send(data);
            }
        })
        .catch(err => {
            const message = "Cannot be possible find isolated by name, Try Later";
            handleError(res, 500, message, err);
        })
}



exports.updateIsolated = (req, res) =>{
    if (!req.body){
        const message = "Data update cannot be empty!"
        return handleError(400, message )
    }

    const id = req.params.id;

    Isolated.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data =>{
            if(!data){
                let message = "isolated with"+ {id} + " cannot be update. Maybe register is not found."
                handleError(res, 404, message)
            }else{
                res.status(200).send({message: "register with id " + id + " was update successfully!", data });
            }
        })
        .catch(err =>{
            let message = "error updating isolated: " +id;
            handleError(res, 500, message, err);
        })
}


exports.deleteIsolatedById = (req, res) =>{

    const id = req.params.id;
    
    Isolated.findByIdAndRemove(id)
        .then(data =>{
            if(!data){
                let message = "Cannot delete register with id: " + id;
                handleError(404, message)
            }else{
                res.send({message: "register was Deleted successfully"});
            }
        })
        .catch(err => {
            let message = "Cannot delete register with id:" + id + "error: " + err;
            handleError(res, 500, message, error)
        })  


}

// função de erro
const handleError = (res, statusCode, message, err = true) =>{
    if (!!err.message) {
        return res.status(statusCode).send({message: err.message})
    }

    return res.status(statusCode).send({message})
    
}






