const { response } = require("express");
const connection = require("../model/db");
const { v4: uuidv4 } = require("uuid");
 

function getAllUsers(req, res) {
  const sql = `SELECT * FROM user_table`;
  connection.query(sql, function (error, data) {
    if (error) {
      res.status(404).json({
        message: "Failed to get all user !!",
        error,
      });
    } else {
      res.status(200).json({
        message: "got all users !!",
        data,
      });
    }
  });
}

// await
function getUserByIdPromisified(uid) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM user_table WHERE uid = '${uid}' `;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
async function getUserById(req, res) {

  try {
    let uid = req.params.uid;
    let data = await getUserByIdPromisified(uid);
    if (data.length) {
      res.status(200).json({
        message: "got user by id",
        data,
      });
    } else {
      res.status(200).json({
        message: "NO USER FOUND",
      });
    }
  } catch (error) {
    res.json({
      message: "Failed to get User",
      error,
    });
  }
}

function UpdateUserById(req, res) {
  const uid = req.params.uid;
  const userObject = req.body;

  let sql = `UPDATE user_table SET `;

  for (key in userObject) {
    sql += `${key} = '${userObject[key]}' ,`;
  }
  if(req.file){
    let pimage = req.file.destination + "/" + req.file.filename;
    // public/images.users.imagename.png
    pimage = pimage.substring(7);
    sql += ` pimage = '${pimage}' `
  }
  sql = sql.substring(0, sql.length - 1);
  sql += `WHERE uid = '${uid}' `;

  // UPDATE user_table
  // SET "name" : "IRON MAN" , "bio" : "I am billionaire"
  // WHERE uid = uid;

  connection.query(sql, function (error, data) {
    if (error) {
      res.json({
        message: "Failed to update",
        error,
      });
    } else {
      res.status(200).json({
        message: "updated user !!",
        data,
      });
    }
  });
}

function deleteUserById(req, res) {
  const uid = req.params.uid;
  const sql = `DELETE FROM user_table WHERE uid= '${uid}'`;
  connection.query(sql, function (error, data) {
    if (error) {
      res.json({
        error,
      });
    } else {
      if (data.affectedRows) {
        res.status(201).json({
          message: "deleted user !!",
          data,
        });
      } else {
        res.json({
          message: "No user Found !!",
        });
      }
    }
  });
}

// await
function createUserPromisified(userObject) {
  return new Promise(function (resolve, reject) {
    const { uid, name, email, pw, username, bio, isPublic, pimage } = userObject;
    let sql;
    if (isPublic != undefined) {
      sql = `INSERT INTO user_table(uid, name, email, pw, pimage, username, bio, isPublic) VALUES ( '${uid}' , '${name}' , '${email}' , '${pw}' , '${pimage}' , '${username}' , '${bio}' , ${isPublic})`;
    } else {
      sql = `INSERT INTO user_table(uid, name, email, pw, pimage , username, bio) VALUES ( '${uid}' , '${name}' , '${email}' , '${pw}' ,'${pimage}' , '${username}' , '${bio}' )`;
    }
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
    console.log("sql =======================")
    console.log(sql);
  });
}
async function createUser(req, res) {
  try {
    const uid = uuidv4();

    let pimage = req.file.destination + "/" + req.file.filename;
    // public/images.users.imagename.png
    pimage = pimage.substring(7);
    console.log(pimage);
    console.log("file");
    console.log(req.file);
    
    const { name, email, pw, username, bio, isPublic } = req.body;
    let userObject = {
      uid,
      name,
      email,
      pw,
      username,
      bio,
      isPublic,
      pimage
    };
    
    console.log("User Object -------------------")
    console.log(userObject);

    let data = await createUserPromisified(userObject);
    res.status(200).json({
      message: "user created successfully",
      data: data,
    });

  } catch (error) {
    res.status(404).json({
      message: "Failed to create a user !!",
    });
  }
}

module.exports.getAllUsers = getAllUsers;
module.exports.getUserById = getUserById;
module.exports.UpdateUserById = UpdateUserById;
module.exports.deleteUserById = deleteUserById;
module.exports.createUser = createUser;
module.exports.getUserByIdPromisified = getUserByIdPromisified;
