
const uuid = require('uuid');

function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}

const userLoans = {
  create: function(userLoans) {
    console.log('Creating a new userLoans');
    const item = {
        id: uuid.v4(),
        username: userLoans.username,
        loans: userLoans.loans
    };
    this.items[item.id] = item;
    return item;
  },
  get: function() {
    console.log('Retreiving userLoans');
    return Object.keys(this.items).map(key => this.items[key]);
  },
  update: function(updatedItem) {
    console.log(`Updating userLoan with username \`${updatedItem.username}\` and id \`${updatedItem.id}\``);
    const {id} = updatedItem;
    if (!(id in this.items)) {
      throw StorageException(
        `Can't update item \`${id}\` because doesn't exist.`)
    }
    this.items[updatedItem.id] = updatedItem;
    return updatedItem;
  }
};


function createUserLoans() {
  const storage = Object.create(userLoans);
  storage.items = {};
  return storage;
}

module.exports = {
  userLoans: createUserLoans()
}
