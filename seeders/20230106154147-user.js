'use strict';
const {Hash} = require('../Helpers/Bcrypt.helper')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     */
      const timeNow = new Date()
      await queryInterface.bulkInsert('Users', [{
        full_name: 'admin',
        email : 'admin@gmail.com',
        password : Hash('12345678'),
        gender : 'laki-laki',
        role : 'admin',
        balance : 0,
        createdAt: timeNow,
        updatedAt: timeNow
      }]);
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
