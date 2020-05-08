var express = require('express');
const fs = require('fs');


module.exports = (function() {
    var api = express.Router();
    api.route("/DeleteTache").delete((req,res)=>{   
     
        
                                                //Recuperation d'un fichier Json 
                                                
                                                fs.readFile('Data/Tache.json', 'utf8', (err, jsonString) => {
                                                    if (err) {
                                                        console.log("File read failed:", err)
                                                        return
                                                    }
                                                data =JSON.parse(jsonString) ;
                                                //Get parameters
                                                //at position req.body.index delete one item
                                                data.splice(req.body.index,1);
                                                //update file data Login.json
                                                dataUpdated=JSON.stringify(data);
                                                fs.writeFileSync('Data/Tache.json', dataUpdated);
                                                //Response to clients
                                                // .send will send http response
                                                res.send({request:true,data});
                                                // .end will end the response process
                                                res.end();

                                            }) 
    
    });
    return api;
})();