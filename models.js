
const uuid = require('uuid');
const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const { PORT, DATABASE_URL } = require('./config');
const mongo = require('mongodb').MongoClient
const url = `${DATABASE_URL}`

function StorageException(message) {
  this.message = message;
  this.name = "StorageException";
}

const userloans = {
  create: function(name, loans) {
    const user = {
      username: name,
      loans: [loans]
    };
    return user
    // MongoClient.connect(DATABASE_URL, {useNewUrlParser: true}, (err, client) => {    
    //   if (err) {
    //     console.error(err)
    //     return
    //   }
    //   const db = client.db('financial-forecaster')
    //   const collection = db.collection('userloans')
    //   collection.find().toArray((err, items) => {
    //     console.log(items)
    //     if (items.username[name]){
    //       return res.status(409).json({ message: `Username ${name} is already taken.` });
    //     }
    //     this.items[user.username] = user;
    //     console.log("Creating username: " + user.username)
    //     return user;
    //   })
    //   assert.equal(null, err);
    //   client.close();
    // })
    // console.log("database: " + database)
    // if (database.includes(`${user.username}`)){
      //   console.log("Username: " + user.username + " already exists.")
      //   return {error: 'Username already exists.'}
      // }
      // try {
        //   db.financial-forecaster.userloans.insertOne( {user} );
        // } catch (e) {
          //   print (e);
          // }
  },
  get: function() {
    database = Object.keys(this.items)
    console.log('Retrieving userloans');
    return database.map(key => this.items[key]);
  },
  getOne: function(incomingId) {
    var database = Object.keys(this.items)
    var databaseObjects = database.map(key => this.items[key])
    function checkId(foundItem){
      return foundItem.id == incomingId
    }
    var matchingItem = databaseObjects.find(checkId)
    if (matchingItem === undefined){
      console.log("Cannot GET by ID: ID does not exist in database.")
      throw StorageException(
        `Can't GET item \`${updatedItem.id}\` because doesn't exist in database.`)
    }
    return this.items[matchingItem.username]
  }
  ,
  update: function(updatedItem) {
    var database = Object.keys(this.items)
    var databaseObjects = database.map(key => this.items[key])
    function checkId(foundItem){
      return foundItem.id == updatedItem.id
    }
    var matchingItem = databaseObjects.find(checkId)
    if (matchingItem == undefined){
      console.log("Cannot POST: ID does not exist in database.")
      throw StorageException(
        `Can't update item \`${updatedItem.id}\` because doesn't exist in database.`)
    }
    if (matchingItem.username !== updatedItem.username){
      console.log("Cannot POST: App does not allow username changes.")
      throw StorageException(
        `Can't update item \`${updatedItem.id}\` because app doesn't allowing renaming users.`)
      }
      delete this.items[updatedItem.username]
      this.items[updatedItem.id] = updatedItem;
      console.log(`Updating userLoan with username \`${updatedItem.username}\` and id \`${updatedItem.id}\``);
    return updatedItem
  }
};


function createUserLoans() {
  const storage = Object.create(userloans);
  storage.items = {};
  return storage;
}

module.exports = {
  userloans: createUserLoans()
}
