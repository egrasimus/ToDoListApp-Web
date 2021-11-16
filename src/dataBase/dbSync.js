const path = require('path');
const Sequelize  = require('sequelize');
const {dbInfo} = require('../../initiator')


const sequelize = new Sequelize(dbInfo);

const initDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Sequelize was initialized');
  } catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
  }
};

module.exports = {
  sequelize,
  initDB,
};