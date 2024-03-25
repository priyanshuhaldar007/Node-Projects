const con = require('../connection.js');

module.exports.getUsers = (req,res) =>{
    // Implement pagination 
    let {page, limit, offset, gender} = req.query;
    
    limit = limit === undefined ? 10 : limit ;
    page = page === undefined ? 0 : --page ;
    offset = offset === undefined ? limit*page : (limit*page)+offset ;

    let sqlQuery= "";
    let var_arr = [];

    if (gender === undefined) {
        sqlQuery = "SELECT * FROM `TABLE 1` LIMIT ? OFFSET ? ";
        var_arr = [limit, offset];
    } else {
        sqlQuery = "SELECT * FROM `TABLE 1` WHERE gender = ? LIMIT ? OFFSET ? ";
        var_arr = [gender, limit, offset];
    }

    try{
        con.query(sqlQuery, var_arr, (error, result) => {
            if(error){
                res.json({"Error Message":error}).status();
            }else{
                if(result.length<=0){
                    res.json({"Success Message":"No Content Found"}).status(204);
                    return;
                }
                res.json({"Success Message":result}).status(200);
            }
        });
    }catch(error){
        res.json({"Error Message":error}).status(400);
    }
}

module.exports.addUser = (req,res) =>{
    const {id, user_name, user_pass, first_name, last_name, email, gender} = req.body;
    const sqlInsert = 'INSERT INTO `TABLE 1` SET ?';

    if(id.length ==0 || user_name == 0 || user_pass == 0 || first_name == 0 || last_name == 0 || email == 0 || gender == 0 ){
        res.json({"message":"incomplete data"}).status(403);
    }

    try{
        con.query(sqlInsert, req.body, (error, result, fields) => {
            if(error){
                res.json({"Error Message":error})
            }else{
                res.json({"Success Message":result});
            }
        });
    }catch(error){
        res.json({"Error Message":error})
    }
}

module.exports.getUser = (req,res) =>{
    const {id} = req.params;
    const sqlInsert = "SELECT * FROM `TABLE 1` where id = ?";

    try{
        con.query(sqlInsert, id, (error, result) => {
            if(error){
                res.json({"Error Message":error})
            }else{
                res.json({"Success Message":result});
            }
        });
    }catch(error){
        res.json({"Error Message":error})
    }
}

module.exports.updateUser = (req,res) =>{
    const {id} = req.params;
    const sqlInsert = "UPDATE `TABLE 1` SET ?? = ? WHERE id = ?";

    try{
        const query = con.query(sqlInsert, [Object.keys(req.body), Object.values(req.body), id], (error, result) => {
            if(error){
                res.json({"Error Message":error})
            }else{
                res.json({"Success Message":result});
            }
        });
        console.log(query.sql);
    }catch(error){
        res.json({"Error Message":error})
    }
}

module.exports.deleteUser = (req,res) =>{
    const {id} = req.params;
    const sqlInsert = "DELETE FROM `TABLE 1` WHERE id = ?";

    try{
        const query = con.query(sqlInsert, id, (error, result) => {
            if(error){
                res.json({"Error Message":error})
            }else{
                res.json({"Success Message":result});
            }
        });
        console.log(query.sql);
    }catch(error){
        res.json({"Error Message":error})
    }
}

module.exports.deleteUsers = (req,res) =>{
    const sqlInsert = "DELETE FROM `TABLE 1` WHERE ?? = ?";

    try{
        const query = con.query(sqlInsert, [Object.keys(req.body), Object.values(req.body)], (error, result) => {
            if(error){
                res.json({"Error Message":error})
            }else{
                res.json({"Success Message":result});
            }
        });
        console.log(query.sql);
    }catch(error){
        res.json({"Error Message":error})
    }
}