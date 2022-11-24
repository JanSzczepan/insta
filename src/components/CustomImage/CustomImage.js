import { Image } from 'react-native'
import ImagePlaceholder from '../../../assets/images/ImagePlaceholder.png'
import UserPlaceholder from '../../../assets/images/UserPlaceholder.png'
import styles from './styles'

const CustomImage = ({ variant, source }) => {
   const imgUri = variant === 'user' || variant === 'miniuser' || variant === 'userInfo' ? Image.resolveAssetSource(UserPlaceholder).uri : source ? source : Image.resolveAssetSource(ImagePlaceholder).uri

   return (
      <Image
         style={styles[variant]}
         source={{ uri: imgUri }}
      />
   )
}

export default CustomImage
