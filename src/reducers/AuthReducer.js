import { SIGN_IN, SIGN_OUT } from '../constants/actions'

export function authReducer(state, action) {
   switch (action.type) {
      case SIGN_IN:
         return {
            isSignedIn: true,
            user: action.payload,
         }
      case SIGN_OUT:
         return { isSignedIn: false, user: null }
      default:
         return state
   }
}
