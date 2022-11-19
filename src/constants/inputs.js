const INPUTS = {
   login: [
      { name: 'email', required: true },
      { name: 'password', required: true, additionalProps: [{ secureTextEntry: true }] },
   ],
   signup: [
      { name: 'email', required: true },
      { name: 'password', required: true, additionalProps: [{ secureTextEntry: true }] },
      { name: 'passwordConfirm', required: true, additionalProps: [{ secureTextEntry: true }] },
   ],
}

export default INPUTS
