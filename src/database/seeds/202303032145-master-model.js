'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const masterModelSettings = [
      {
        modelName: 'text-davinci-003',
        title: 'Highest',
        subTitle: 'Quality is higher, longer response',
        description:
          'Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text.',
        usage:
          'complex intent, cause and effect, generation creative, search, summarization for audience',
        maxRequestToken: 4096,
        requestCredit: 70,
        validFlag: 1,
        createdAt: 1677679481,
        updatedAt: 1677679481
      },
      {
        modelName: 'text-curie-001',
        title: 'High',
        subTitle: 'Quality is high, faster than option 1',
        description: 'Very capable, but faster and lower cost than Davinci.',
        usage:
          'language translation, complex classification, sentiment, summarization',
        maxRequestToken: 2048,
        requestCredit: 50,
        validFlag: 1,
        createdAt: 1677679481,
        updatedAt: 1677679481
      },
      {
        modelName: 'text-babbage-001',
        title: 'Medium',
        subTitle: 'Quality is medium, but very fast',
        description:
          'Capable of straightforward tasks, very fast, and lower cost.',
        usage: 'modern classification, semantic search',
        maxRequestToken: 2048,
        requestCredit: 20,
        validFlag: 1,
        createdAt: 1677679481,
        updatedAt: 1677679481
      },
      {
        modelName: 'text-ada-001',
        title: 'Low',
        subTitle: 'Quality is low, but very fast',
        description:
          'Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.',
        usage:
          'parsing text, simple classfication, address correction, keywords',
        maxRequestToken: 2048,
        requestCredit: 10,
        validFlag: 1,
        createdAt: 1677679481,
        updatedAt: 1677679481
      }
    ]
    await queryInterface.bulkInsert('Model_Settings', masterModelSettings)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Model_Settings', null, {})
  }
}
