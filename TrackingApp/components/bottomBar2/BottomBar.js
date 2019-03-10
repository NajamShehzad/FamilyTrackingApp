import React from 'react'
import {Text, View, Dimensions, Image, Animated} from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel';
import mapIcon from '../../assets/mapIcon.png'
const {height} = Dimensions.get('window')


const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    height: 120,
    backgroundColor: '#b197fc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  }
}

class BottomSheet extends React.Component {
  static defaultProps = {
    draggableRange: {
      top: height / 1.75,
      bottom: 120
    }
  }

  static _draggedValue = new Animated.Value(120)

  render() {
    const {top, bottom} = this.props.draggableRange

    const draggedValue = BottomSheet._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    const transform = [{scale: draggedValue}]

    return (
        <SlidingUpPanel
          showBackdrop={false}
          ref={c => (this._panel = c)}
          draggableRange={{
            top: height / 1.75,
            bottom: 120
          }}
          animatedValue={BottomSheet._draggedValue}>
          <View style={styles.panel}>
            <Animated.View style={[styles.favoriteIcon, {transform}]}>
              <Image
                source={mapIcon}
                style={{width: 32, height: 32}}
              />
            </Animated.View>
            <View style={styles.panelHeader}>
              <Text style={{color: '#FFF'}}>Bottom Sheet Peek</Text>
            </View>
            <View style={styles.container}>
              <Text>Bottom Sheet Content</Text>
            </View>
          </View>
        </SlidingUpPanel>
    )
  }
}

export default BottomSheet