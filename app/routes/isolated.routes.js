/**
 * ISOLATED ROUTES
 * 
 * ROTES: 
 * 
 * >>api/isolated = get, post, delete
 * >>api/isolated:id get, put, delete
 */

const { authJwt } = require("../middlewares"); 
const router = require ("express").Router();
const isolated = require("../controller/isolated.controller");


module.exports = app =>{

    // create [ENABLED]
    router.post("/",  isolated.createIsolated);

    //get all [ENABLED]
    router.get("/", isolated.getAllIsolated);

    //get by id [ENABLED]
    router.get("/:_id",  isolated.getIsolatedById);
    
    //get by name [ENABLED]
    router.get("/:name", isolated.getIsolatedByName);
    
    // update by id[ENABLED]
    router.put("/:_id", isolated.updateIsolated);

    //delete by id [ENABLED]
    router.delete("/:_id", isolated.deleteIsolatedById);

    //put a isolated (inspection) [ENABLED]
    router.put('/inspection/:id', isolated.updateIsolated);

    app.use("/api/isolated", router);
}