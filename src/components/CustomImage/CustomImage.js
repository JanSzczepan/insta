import { Image } from 'react-native'
import ImagePlaceholder from '../../../assets/images/ImagePlaceholder.png'
import styles from './styles'

const CustomImage = ({ variant, source }) => {
   const imgUri = source ? source : Image.resolveAssetSource(ImagePlaceholder).uri

   return (
      <Image
         style={styles[variant]}
         source={{ uri: imgUri }}
      />
   )
}

export default CustomImage
