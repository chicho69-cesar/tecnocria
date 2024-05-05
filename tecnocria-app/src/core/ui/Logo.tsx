import { Image, StyleSheet } from 'react-native'

const logo = require('../../../assets/img/logo.png')

export default function Logo() {
  return (
    <>
      <Image source={logo} style={styles.image} resizeMode='contain' />
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 16 / 6,
    marginHorizontal: 10
  }
})
