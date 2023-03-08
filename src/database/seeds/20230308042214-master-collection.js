// @ts-nocheck
'use strict'
const path = require('path')
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add master collections.
     */
    const collections = fs.readFileSync(
      path.resolve(__dirname, 'data/masterCollection.json')
    )
    const data = JSON.parse(collections)
    await queryInterface.bulkInsert(
      'Master_Collections',
      data.collections.map((cl) => ({
        ...cl,
        metaData: JSON.stringify(cl.metaData)
      }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Master_Collections', null, {})
  }
}
