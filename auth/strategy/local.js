import LocalStrategy from 'passport-local'
import cb from '../authenticator.js'

export default new LocalStrategy({ session: true }, cb)