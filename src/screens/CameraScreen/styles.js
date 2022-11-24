import { Dimensions, StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
   cameraContainer: {
      width: width,
      height: width / 1.5,
   },
   cameraButtonContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   wrapper: {
      flex: 1,
   },
   imageContainer: {
      flexDirection: 'row',
   },
   buttonsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
})

export default styles
