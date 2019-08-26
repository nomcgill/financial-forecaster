
function StorageException(message) {
  this.message = message;
  this.name = "StorageException";
}

var userSchema = mongoose.Schema({
  username: {
    type: 'string',
    unique: true
  },
  loans: 'array'
})

const userloans = {
  create: function(name, loans) {
    const user = {
      username: name,
      loans: loans
    };
    return user
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
  console.log(userSchema)
  return storage;
}

module.exports = {
  userloans: createUserLoans()
}
