
const uuid = require('uuid');

function StorageException(message) {
  this.message = message;
  this.name = "StorageException";
}

const userloans = {
  create: function(name, loans) {
    database = Object.keys(this.items)
    const user = {
        id: uuid.v4(),
        username: name,
        loans: [loans]
    };
    console.log("database: " + database)
    if (database.includes(`${user.username}`)){
      console.log("Username: " + user.username + " already exists.")
      return {error: 'Username already exists.'}
    }
    this.items[user.username] = user;
    console.log("Creating username: " + user.username)
    return user;
  },
  get: function() {
    database = Object.keys(this.items)
    console.log('Retrieving userloans');
    return database.map(key => this.items[key]);
  },
  update: function(updatedItem) {
    database = Object.keys(this.items)
    console.log(database)
    var databaseObjects = database.map(key => this.items[key])
    console.log(databaseObjects)
    console.log(databaseObjects[0].id)

    if (!(updatedItem.id in this.items)) {
      throw StorageException(
        `Can't update item \`${updatedItem.id}\` because doesn't exist in database.`)
    }
    
    console.log(`Updating userLoan with username \`${updatedItem.username}\` and id \`${updatedItem.id}\``);
    this.items[updatedItem.id] = updatedItem;

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
