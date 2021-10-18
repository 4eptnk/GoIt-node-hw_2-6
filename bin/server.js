const db = require('../config/db')
const app = require('../app')

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`)
  })
}).catch((err) => {
  console.log(`Server isn't running, Error: ${err.message}`)
})
