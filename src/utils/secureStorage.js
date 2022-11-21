import * as SecureStore from 'expo-secure-store'

export const saveToSecureStorage = async (key, value) => {
   try {
      await SecureStore.setItemAsync(key, value)
   } catch (error) {
      console.log(error)
   }
}

export const getFromSecureStorage = async (key) => {
   try {
      const result = await SecureStore.getItemAsync(key)

      if (result) {
         return result
      } else {
         console.log(`Can't get ${key} from secureStorage`)
         return null
      }
   } catch (error) {
      console.log(error)
   }
}

export const deleteFromSecureStorage = async (key) => {
   try {
      await SecureStore.deleteItemAsync(key)
   } catch (error) {
      console.log(error)
      return error
   }
}
