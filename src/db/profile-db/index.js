import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('profile.db');

export const initProfileDB = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS profile 
        (email TEXT PRIMARY KEY NOT NULL, 
        name TEXT NOT NULL, 
        image TEXT NOT NULL)`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const insertProfile = (email, name, image) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO profile (email, name, image) VALUES (?, ?, ?)',
        [email, name, image],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          console.log('ERROR', _);
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const fetchProfile = email => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Profile`,
        [],
        (_, result) => {
          let data = [];
          var len = result.rows.length;
          for (let i = 0; i < len; i++) {
            let row = result.rows.item(i);
            data.push(row);
          }
          resolve(data);
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};
