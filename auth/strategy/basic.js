import {BasicStrategy} from 'passport-http'
import cb from '../authenticator.js'

export default new BasicStrategy(cb)