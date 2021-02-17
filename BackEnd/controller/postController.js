const { response } = require("express");
const connection = require("../model/db");
const {v4 : uuidv4} = require("uuid");


function getAllPosts(req, res){
 
    const sql = `SELECT * FROM user_table`
    connection.query(sql, function(error, data){
        if(error){
            res.status(404).json({
                message : "Failed to get all user !!",
                error
            })
        }
        else{
            res.status(200).json({
                message : "got all users !!",
                data
            })
        }
    })
}

async function getPostById(req, res){
    let uid = req.params.uid;
    const sql = `SELECT * FROM user_table WHERE uid = '${uid}' `;
    connection.query(sql, function(error, data){
        if(error){
           res.json({
               message : "user not found by id !!",
               error
           }) 
        }
        else{
            if(data.length){
                res.status(200).json({
                    message : "got user by id",
                    data
                })
            }
            else{
                res.status(200).json({
                    message : "NO USER FOUND"
                })
            }
        }
    })
}

function UpdatePostById(req, res){
    const uid = req.params.uid;
    const userObject = req.body;
    let sql = `UPDATE user_table SET `;
    
    for(key in userObject){
        sql += `${key} = '${userObject[key]}' ,`
    }
    sql = sql.substring(0 , sql.length - 1 );
    sql += `WHERE uid = '${uid}' `;
    
        // UPDATE user_table 
        // SET "name" : "IRON MAN" , "bio" : "I am billionaire"
        // WHERE uid = uid;
    
    connection.query(sql, function(error, data){
        if(error){
            res.json({
                message : "Failed to update",
                error
            })
        }
        else{
            res.status(200).json({
                message : "updated user !!",
                data
            })
        }
    })

}

function deletePostById(req, res){
    const uid = req.params.uid;
    const sql = `DELETE FROM user_table WHERE uid= '${uid}'`;
    connection.query(sql, function(error, data){
        if(error){
            res.json({
                error
            })
        }
        else{
            if(data.affectedRows){
                res.status(201).json({
                    message : "deleted user !!",
                    data
                })
            }
            else{
                res.json({
                    message : "No user Found !!"
                })
            }
        }
    })
}


function createPostPromisified(userObject){
    return new Promise (function(resolve, reject){

        const {uid, name, email, pw, username, bio, isPublic } = userObject;
        let sql;
        if(isPublic != undefined){
            sql = `INSERT INTO user_table(uid, name, email, pw, username, bio, isPublic) VALUES ( '${uid}' , '${name}' , '${email}' , '${pw}' , '${username}' , '${bio}' , ${isPublic})`;
        }
        else{
            sql = `INSERT INTO user_table(uid, name, email, pw, username, bio) VALUES ( '${uid}' , '${name}' , '${email}' , '${pw}' , '${username}' , '${bio}' )`;
        }
        connection.query(sql, function(error, data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}

async function createPost(req, res){
    try{
        const uid = uuidv4();
        const {name, email, pw, username, bio, isPublic} = req.body;
        let userObject = {
            uid,
            name,
            email,
            pw,
            username,
            bio,
            isPublic
        }
        let data = await createPostPromisified(userObject);
        res.status(200).json({
            message : "user created successfully",
            data : data
        })
        
        // const sql = `INSERT INTO user_table(uid, name, email, pw, username, bio) VALUES ('${uid}' , '${name}' , '${email}' , '${pw}' , '${username}' , '${bio}')`;
        // connection.query(sql, function(error, data){
        //     console.log(data);
        //     console.log(error);
        // })
        // console.log(req.body); 
    }
    catch(error){
        res.status(404).json({
            message : "Failed to create a user !!"
        })
    }

}



module.exports.getAllPosts = getAllPosts;
module.exports.getPostById = getPostById;
module.exports.UpdatePostById = UpdatePostById;
module.exports.deletePostById = deletePostById;
module.exports.createPost = createPost;