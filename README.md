# API VISASERVER
Nodejs api server middleware MEAN

Api middleware to provide data on isolates from covid contamination registered in the city of Pereira Barreto

## Enabled Routes (EndPonts)

### baseurl: http://localhost:8080/api/isolated/
method|       url     |action
------|---------------|-------
post  |/,             |create isolated
get   |/,             |return all isolateds on database
get   |/:id,          |return a register by an id of a isolated
get   |/:name         |return a register by a name of a isolated 
put   |/:id           |update a register by id
delete|/:id           |delete a register by id
put   |/inspection/:id|update a inspection on register by id
  
  
## Mongoose considerations
The update command chosen for put controller was findByIdAndUpdate. This receive the id, the body of request and options, what in this case was useFindAndModify equal to false.

~~~javascript
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
~~~
the same principle was used to delete method.

## Mongo Strategy

The isolated register has 2 phases: 
* The creation, with only identification data and isolation period; 
* Inspection, where is identified if the isolation has been respected and the conditions in witch the person it is.

So, in the creation it is passed only the data for idenfication:

~~~javascript
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
~~~
And the update (above) insert the inspection data. It works :)

## Dependecies:
* express
* mongoose
* nodemom
* jsonWebToken
* bcryptjs
* uuid

### Playlist for this project: [ Hippie Sabotage Mix 2021 | EDM, Hip Hop, House, DnB | By AediRecs](https://youtu.be/0AWq2usLf2E) 
