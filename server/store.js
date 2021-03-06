const storage = require('azure-storage')
const service = storage.createTableService()
const table = 'tasks'
const uuid = require('uuid')


const init = async () => (
  new Promise((resolve, reject) => {
    service.createTableIfNotExists(table, (error, result, response) => {
      !error ? resolve() : reject()
    })
  })
)

const addTask = async ({ title }) => (
  new Promise((resolve, reject) => {
    const gen = storage.TableUtilities.entityGenerator
    const task = {
      PartitionKey: gen.String('task'),
      RowKey: gen.String(uuid.v4()),
      title
    }

    service.insertEntity(table, task, (error) => {
      !error ? resolve() : reject()
    })
  })
)

module.exports = {
  init,
  addTask
}
