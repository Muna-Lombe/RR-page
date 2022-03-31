
/**
 * THIS ALGORITHM IS TO 
 * TEST A CONNECTION TO A DATABASE
 * CREATE A TABLE,
 * SEED A TABLE,
 * DROP A TABLE.
 * 
 * ---ALL FROM THE TERMINAL---
 * 
 * --- BEFORE TESTING, MAKE SURE THE DATABASE EXISTS
 * */


const { Pool } = require('pg');
const dotenv = require('dotenv');
const uuidv4 = require('uuid')
const moment = require('moment')

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      watchlists(
        id UUID PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        bookmarked_movies TEXT [],
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res.fields);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS watchlists';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const seedTables = async() => {
  const rName = ['great day', 'got a job', 'did my hair', 'got paid', 'pushed last commit'];
  const rBM = ['lost a show', 'got soaked', 'had a fight with wife', 'too many bugs', 'none'];
  const rTakes = ['drink more water', 'buy flowers', 'exercise', 'find a chair', 'tomorrow will be better'];
  const queryText =`INSERT INTO 
                    watchlists( id, title, bookmarked_movies, created_date, modified_date) 
                    VALUES($1,$2,$3,$4,$5) 
                    returning *`;        

  // pool.connect()
  for (let index = 0; index <= 10; index++) {
    const idxN = Math.abs(Math.round(Math.random(5)*10-6));
    const a = rTakes[idxN];
    const b = rBM[idxN];
    const obj1 = {a : b }
    const obj2 = {a : b }
    const obj3 = {a : b }
    const seedData = {
      "name":rName[idxN],
      "bm":rBM[idxN],
      // "takeAway": [`{${a} : ${b}}`, {a : b }, {a : b }]
      "takeAway": [{a : b }, {a : b }]

    }
    // console.log('queryText',queryText)
    
    pool.query(queryText,[uuidv4.v4(),seedData.name, seedData.takeAway, moment(new Date()),moment(new Date())])
    .then((res) => {
      console.log(res.rowCount);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
    
  }
  pool.end();
    
}

const readTables = () => {
  const queryText = 'SELECT * FROM watchlists'
  pool.query(queryText).then((res)=>{
    console.log('reading tables');
    // console.log(res);
    // console.log(res.fields);
    console.log(res.rows);
    
    // res.fields.forEach((f) => console.log(f));

    pool.end();
  })
  .catch((e)=> {
    console.log('cannot read tables...');

    console.log(e);
    pool.end();
  })
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables,
  seedTables,
  readTables
};

require('make-runnable');
