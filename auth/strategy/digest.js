import {DigestStrategy} from 'passport-http'
import cb from '../authenticator.js'


export default new DigestStrategy(cb)