import React from "react";
import { Slider } from "react-native-elements";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

// Redux stuff
import { connect } from "react-redux";
import { handleSliderSeek, handlePlayPauseAction } from "../redux/mediaActions";

export const Seekbar = ({
  trackLength,
  currentPosition,
  handleSliderSeek,
  isPlaying,
  playbackInstance
}) => {
  // function _pad(n, width, z = 0) {
  //   n = n + "";
  //   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  // }

  // const minutesAndSeconds = (position) => [
  //   _pad(Math.floor(position / 60), 2),
  //   _pad(position % 60, 2),
  // ];

  // const elapsed = minutesAndSeconds(currentPosition);
  // console.log("Seekbar elapsed :>> ", elapsed);
  // const remaining = minutesAndSeconds(trackLength - currentPosition);
  // console.log("Seekbar remaining :>> ", remaining);

  const onSlidingStart = async () => {
    // if (isPlaying) {
    //   await playbackInstance.pauseAsync();
    //   handlePlayPauseAction(isPlaying);
    //   console.log("Seekbar onSlidingStart Test");
    // }
  };

  const onSeek = async () => {
    // console.log("Seekbar onSeek Test");
    // const valueMilliseconds = value * 1000;
    // console.log("Seekbar onSeek valueMilliSeconds :>> ", valueMilliseconds);
    // console.log("Seekbar onSeek playbackInstance:>> ", playbackInstance);
    // await playbackInstance.playFromPositionAsync(valueMilliseconds);
    // console.log("Seekbar onSeek value in seconds:>> ", value);
    // handleSliderSeek(value);
  };

  return (
    <View>
      <View style={styles.durationInfo}>
        {/* <Text>{elapsed[0] + ":" + elapsed[1]}</Text>
        <View style={styles.placeholder}></View>
        <Text>
          {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
        </Text> */}
      </View>
      <Slider
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  durationInfo: {
    flexDirection: "row",
  },
  placeholder: {
    flex: 1,
  },
});

const mapActionsToProps = {
  handleSliderSeek,
  handlePlayPauseAction,
};

const mapStateToProps = (state) => ({
  playbackInstance: state.playbackInstance,
  currentPosition: state.currentPosition,
  isPlaying: state.isPlaying,
});

export default connect(mapStateToProps, mapActionsToProps)(Seekbar);
