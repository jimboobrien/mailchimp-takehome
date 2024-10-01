const sqlite3 = require('sqlite3');
const fs = require('fs');

class DataAccessObject {
  constructor(dbPath) {
    if (!fs.existsSync(dbPath)) {
      fs.closeSync(fs.openSync(dbPath, 'w'));
    }
    this.db = new sqlite3.Database(dbPath, error => {
      if (error) {
        console.log('Could not connect to database', error);
      } else {
        console.log('Connected to database');
      }
    });
  }

  printError(sql, error) {
    console.log(`Error running sql ${sql}\n${error}`);
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(error) {
        if (error) {
          this.printError(sql, error);
          reject(error);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, function(error, result) {
        if (error) {
          this.printError(sql, error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, function(error, rows) {
        if (error) {
          this.printError(sql, error);
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // New method to delete a comment by ID
  /*
  deleteComment(id) {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM comments WHERE id = ?';
      console.log(`Executing query: ${sql} with ID: ${id}`);
      this.db.run(sql, [id], function(error) {
        if (error) {
          console.error(`Error deleting comment with id ${id}: ${error}`);
          reject(error);
        } else {
          console.log(`Changes made: ${this.changes}`);
          resolve({ message: `Comment with id ${id} deleted`, changes: this.changes });
        }
      });
    });
  } */



}

module.exports = DataAccessObject;
