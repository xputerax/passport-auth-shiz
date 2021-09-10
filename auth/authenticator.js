import users from './users.js'

export default function(username, password, done) {

  let filtered_users = users.filter(user => (user.username == username) && (user.password == password))

  if (filtered_users.length == 0) {
    return done(null, false)
  }

  return done(null, filtered_users[0])

}
