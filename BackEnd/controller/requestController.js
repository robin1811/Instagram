const e = require("express");
const connection = require("../model/db");
const { getUserByIdPromisified } = require("./userController");

// helper functions:
// send helper
function addInFollwoingTablePromisified(uid, follow_id, isPublic){
    return new Promise(function(resolve, reject){
        let sql;
        if(isPublic){
            sql = `INSERT INTO following_table(uid, followId) VALUES ( '${uid}' , '${follow_id}')`;
        }
        else{
            sql = `INSERT INTO following_table(uid, followId, isAccepted) VALUES ( '${uid}' , '${follow_id}', false)`;
        }
        connection.query(sql,function(error, data){
            if(error){
                reject(error);
            }else{
                resolve(data);
            }
        })
    })
}
function addInFollowerTablePromisified(follower_id, uid){
    return new Promise(function(resolve, reject){
        let sql = `INSERT INTO follower_table(uid, followerId) VALUES ( '${uid}' , '${follower_id}')`;
        connection.query(sql,function(error, data){
            if(error){
                reject(error);
            }else{
                resolve(data);
            }
        })
    })
}
// accept pending request helper
function acceptRequestPromisified(followId, uid){
    return new Promise(function(resolve, reject){
        let sql = `UPDATE following_table SET isAccepted = 1 WHERE uid = '${uid}' AND followId = '${followId}'`;
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
// see a pending request helper
function getRequestsPromisified(uid){
    return new Promise(function(resolve, reject){
        let sql = `SELECT * FROM following_table WHERE followId = '${uid}' AND isAccepted = false`;
        connection.query(sql,function(error, data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}
// cancel a pending request helper
function cancelRequestPromisified(followId, uid){
    return new Promise(function(resolve,reject){
        let sql = `DELETE FROM following_table WHERE uid = '${uid}' AND followId = '${followId}'`;
        connection.query(sql, function(error,data){
            if(error){
                reject(error);
            }else{
                resolve(data);
            }
        })
    })
}
// get all follower helper
function getAllFollowerPromisified(uid){
    return new Promise(function(resolve, reject){
        let sql = `SELECT followerId FROM follower_table WHERE uid = '${uid}'`;
        connection.query(sql, function(error, data){
            if(error){
                reject(error);
            }else{
                resolve(data);
            }
        })
    })
}
// get all following helper
function getAllFollowingPromisified(uid){
    return new Promise(function(resolve, reject){
        let sql = `SELECT followId FROM following_table WHERE uid = '${uid}' AND isAccepted = true`;
        connection.query(sql, function(error, data){
            if(error){
                reject(error);
            }else{
                resolve(data);
            }
        })
    })
}
// unfollow helper
function deleteFromFollowingTable(uid, unfollowId){
    return new Promise(function(resolve, reject){
        let sql = `DELETE FROM following_table WHERE uid = '${uid}' AND followId = '${unfollowId}'`;
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
function deleteFromFollowerTable(unfollowId, uid){
    return new Promise(function(resolve, reject){
        let sql = `DELETE FROM follower_table WHERE uid = '${uid}' AND followerId = '${unfollowId}'`;
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
// Getsuggestion Helper






// Actual Functions:
// send request
async function sendRequest(req,res){
    try{
        let {uid, follow_id} = req.body;
        let user = await getUserByIdPromisified(follow_id);
        console.log(user);
        isPublic = user[0].isPublic;
        if(isPublic){
            // add in following table with isAccepted = true
            // add in follower table
            let followData = await addInFollwoingTablePromisified(uid, follow_id, true);
            let followerData = await addInFollowerTablePromisified(uid,follow_id);
            res.json({
                message : "request sent and accepted",
                followData,
                followerData
            })

        }else{
            // add in folowing table with isAccepted = false
            let data = await addInFollwoingTablePromisified(uid, follow_id);
            console.log(data); 
            res.json({
                message : "Request send and Pending",
                data
            })
        }
    }
    catch(error){
        res.json({
            message : "Failed to send request",
            error 
        })
    }
}
// accept a pending request
async function acceptRequest(req,res){
    try{
        let {uid, toBeAcceptedId} = req.body;
        let acceptData = await acceptRequestPromisified(uid, toBeAcceptedId);
        let followData = await addInFollowerTablePromisified(toBeAcceptedId, uid);
        res.json({
            message : "Accepted Request",
            acceptData,
            followData
        })
    }
    catch(error){
        res.json({
            message : "Failed to accept request!!",
            error
        })
    }
}
// see pending request
async function getPenindRequest(req,res){
    try{
        let {uid} = req.params;
        let requests = await getRequestsPromisified(uid);
        // console.log(requests);
        let requestsNames = [];
        for(let i=0; i<requests.length; i++){
            let user = await getUserByIdPromisified(requests[i].uid);
            requestsNames.push(user[0]);
        }
        console.log(requestsNames);
        res.json({
            message : "Got all Requests",
            requestsNames
        })
    }
    catch(error){
        res.json({
            message : "failed to see pending request",
            error
        })
    }
}
// cancel a pending request
async function cancelRequest(req,res){
    try{
        let {uid, toBeCancelId} = req.body;
        let cancelObj= await cancelRequestPromisified(uid, toBeCancelId);
        res.json({
            message : "Cancelled Request",
            cancelObj
        })
    }
    catch(error){
        res.json({
            message : "Failed to cancel request",
            error
        })
    }
}
//  get all followers 
async function getAllFollower(req,res){
    try{
        let uid = req.params.uid;
        let followerIds = await getAllFollowerPromisified(uid);
        console.log(followerIds);
        let followers = [];
        for(let i=0; i<followerIds.length; i++){
            let followerId = followerIds[i].followerId;
            let user = await getUserByIdPromisified(followerId);
            console.log(user);
            followers.push(user[0]);
        }
        res.json({
            message : "got all followers",
            followers
        })
    }
    catch(error){
        res.json({
            message : "Failed to get all followers"
        })
    }
}
// get all following
async function getAllFollowing(req,res){
    try{
        let uid = req.params.uid;
        let followingIds = await getAllFollowingPromisified(uid);
        console.log(followingIds);
        let following = [];
        for(let i=0; i<followingIds.length; i++){
            let followId = followingIds[i].followId;
            let user = await getUserByIdPromisified(followId);
            // console.log(user);
            following.push(user[0]);
        }
        res.json({
            message : "got all followers",
            following
        })
    }
    catch(error){
        res.json({
            message : "Failed to get all followers"
        })
    }
}
// unfollow
async function unfollow(req,res){
    try{
        let {uid, unfollowId} = req.body;
        let followingObj = await deleteFromFollowingTable(uid, unfollowId);
        let followerObj = await deleteFromFollowerTable(uid, unfollowId);
        res.json({
            message : "Unfollowed Successfully",
            followingObj,
            followerObj
        })
    }
    catch(error){
        res.json({
            message : "Failed to unfollow",
            error
        })
    }
}
// suggestions
async function getSuggestions(req,res){
    try{
        let {uid} = req.params;
        console.log(uid);    
        let followingIdsArray = await getAllFollowingPromisified(uid);
        console.log(followingIdsArray);

        let followingIds = followingIdsArray.map(obj =>{
            return obj.followId;
        });

        let suggestionIds = [];

        for(let i=0; i<followingIds.length; i++){
            let followId = followingIds[i];
            let followingIdsOfFollowing = await getAllFollowingPromisified(followId);
            for(let j=0; j<followingIdsOfFollowing.length; i++){
                 if( !followingIds.includes(followingIdsOfFollowing[j].followId) && followingIdsOfFollowing[j].followId != uid){
                    suggestionIds.push(followingIdsOfFollowing[j].followId);
                 }
            }
        }
        console.log("suggestions -------------")
        console.log(suggestionIds);
        let suggestions = []
        for(let i=0; i<suggestionIds.length; i++){
            let suggestion = await getUserByIdPromisified(suggestionIds[i]);
            suggestions.push(suggestion[0]);
        }
        console.log(suggestions);
        res.json({
            message : "successsfully got all suggestions",
            suggestions
        })
    }
    catch(error){
        res.json({
            message : "failed to get suggestions",
            error
        })
    }
}



module.exports.sendRequest = sendRequest;
module.exports.acceptRequest = acceptRequest;
module.exports.getPenindRequest = getPenindRequest;
module.exports.cancelRequest = cancelRequest;

module.exports.getAllFollower = getAllFollower;
module.exports.getAllFollowing = getAllFollowing;
module.exports.unfollow = unfollow;
module.exports.getSuggestions = getSuggestions;