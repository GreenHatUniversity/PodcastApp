import React from 'react';
import {Animated, ART} from 'react-native';
import * as Progress from 'react-native-progress';

import Arc from 'react-native-progress/Shapes/Arc';

const AnimatedArc = Animated.createAnimatedComponent(Arc);

export default class LoadingView extends Progress.CircleSnail {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      animating,
      children,
      color,
      direction,
      hidesWhenStopped,
      size,
      style,
      thickness,
      strokeCap,
      ...restProps
    } = this.props;

    if (!animating && hidesWhenStopped) {
      return null;
    }

    const radius = size / 2 - thickness / 2;
    const offset = {
      top: thickness / 2,
      left: thickness / 2,
    };

    const directionFactor = direction === 'counter-clockwise' ? -1 : 1;

    return (
      <Animated.View
        {...restProps}
        style={[
          style,
          {
            backgroundColor: 'transparent',
            overflow: 'hidden',
            transform: [
              {
                rotate: this.state.rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', `${directionFactor * 360}deg`],
                }),
              },
            ],
          },
        ]}>
        <ART.Surface width={size} height={size}>
          <AnimatedArc
            direction={
              direction === 'counter-clockwise'
                ? 'clockwise'
                : 'counter-clockwise'
            }
            radius={radius}
            stroke={Array.isArray(color) ? color[this.state.colorIndex] : color}
            offset={offset}
            startAngle={this.state.startAngle}
            endAngle={this.state.endAngle}
            strokeCap={strokeCap}
            strokeWidth={thickness}
          />
        </ART.Surface>
        {children}
      </Animated.View>
    );
  }
}
