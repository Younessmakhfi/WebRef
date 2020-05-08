var express = require('express');
const fs = require('fs');


module.exports = (function() {
    var api = express.Router();
    api.route("/UpdateTache").post(function(req, res) { 

                                                //Recuperation d'un fichier Json 
                                                
                                                fs.readFile('Data/Tache.json', 'utf8', (err, jsonString) => {
                                                    if (err) {
                                                        console.log("File read failed:", err)
                                                        return
                                                    }
                                                data = JSON.parse(jsonString);
                                               
                                                //client file send index and tache array to server
                                                // and the server search for this index the the json db and udpate it
                                            
                                                data[req.body.index]=req.body.tache;
                                                //update file data Login.json , stringify: convert an object to a string
                                                dataUpdated=JSON.stringify(data);
                                                fs.writeFileSync('Data/Tache.json', dataUpdated);
                                                //Response to clients
                                                res.send({request:true,data});
                                                res.end();



                                            }) 
    });
    return api;
})();