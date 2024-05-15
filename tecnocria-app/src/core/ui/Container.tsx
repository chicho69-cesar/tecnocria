import { colors } from '@/config'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'

interface Props {
  children: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[]
}

export default function Container({ children }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.separator} />
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 10,
    backgroundColor: colors.background
  },
  separator: {
    height: 10
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10
  }
})
