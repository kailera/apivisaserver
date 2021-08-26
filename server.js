const express = require('express');
const cors = require ('cors');

const app = express();

const db = require('./app/models');
const dbConfig = require('./app/config/db.config');

const Role = db.role;


db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log('successfully db connection');
        initial();
    })
    .catch(err => {
        console.log('error to connect on db', err);
        process.exit();
    })

function initial(){
    Role.estimatedDocumentCount((err, count) =>{
        if(!err && count === 0){
            new Role({
                name:"fiscal"
            }).save(err => {
                if(err) {console.log(err)}
                console.log(`add ${Role.name} to roles collection`)
            });

            new Role({
                name:"admin"
            }).save(err => {
                if(err) {console.log(err)}
                console.log(`add ${Role.name} to roles collection`)
            });

            new Role({
                name:"moderator"
            }).save(err => {
                if(err) {console.log(err)}
                console.log(`add ${Role.name} to roles collection`)
            })
            
        }
    })

}

let corsOptions = {
    origin : "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended:true}))


//enabled  routes 
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/isolated.routes')(app);

app.get("/", (req, res) => {
    res.json('sys up')
});

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})