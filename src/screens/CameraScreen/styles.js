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
      alignItems: 'center',
      justifyContent: 'center',
   },
   imageUserContainer: {
      marginTop: theme.SPACING.large,
      alignItems: 'center',
      justifyContent: 'center',
   },
   buttonsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
})

export default styles
