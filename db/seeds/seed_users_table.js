import MD5 from "crypto-js/md5.js";
import { v4 as uuidv4 } from 'uuid';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: uuidv4(),
        email: 'nigel@email.com',
        password: MD5('dorwssap')
      },
      {
        id: uuidv4(),
        email: 'nakaz@email.com',
        password: MD5('password1')
      },
      {
        id: uuidv4()
        email: 'jaywon@email.com',
        password: MD5('password123')
      }
    ]);
  });
};