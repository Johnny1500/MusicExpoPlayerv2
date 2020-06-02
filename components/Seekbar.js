import React from "react";
import { Slider } from "react-native-elements";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

// Redux stuff
import { connect } from "react-redux";
import {
  setCurrentPosition,
  handlePlayPauseAction,
  setCurrentPositionWithTimer,
  handleChangeTrackAction,
  loadAudio,
} from "../redux/mediaActions";

export const Seekbar = ({
  tracks,
  currentIndex,
  currentPosition,
  setCurrentPosition,
  isPlaying,
  playbackInstance,
  timerId,
  setCurrentPositionWithTimer,
  handleChangeTrackAction,
  loadAudio,
}) => {
  const { duration } = tracks[currentIndex];
  console.log("Seekbar currentPosition :>> ", currentPosition);
  console.log("Seekbar duration :>> ", duration);

  let sliderValue = Math.round((currentPosition / duration) * 100) / 100;
  console.log("Seekbar sliderValue", sliderValue);

  React.useEffect(() => {
    console.log("Test Seekbar React.UseEffect");

    // Функция есть в Controls. Убрать в Utils, если еще будут общие функции
    async function handleNextTrack() {
      // console.log("Test Seekbar React.UseEffect handleNextTrack");

      try {
        const amountOfTracks = tracks.length;
        console.log(
          "Test Seekbar React.UseEffect handleNextTrack  amountOfTracks:>> ",
          amountOfTracks
        );

        if (playbackInstance) {
          await playbackInstance.unloadAsync();
          currentIndex < amountOfTracks - 1
            ? (currentIndex += 1)
            : (currentIndex = 0);
          if (timerId) clearTimeout(timerId);
          handleChangeTrackAction(currentIndex);
          setCurrentPosition(0);

          const { uri } = tracks[currentIndex];

          await loadAudio(uri, isPlaying);
          if (isPlaying) {
            currentPosition = 0;
            setCurrentPositionWithTimer(currentPosition);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (currentPosition >= duration) handleNextTrack();
  }, [currentPosition]);

  function _pad(n, width, z = 0) {
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  const minutesAndSeconds = (position) => [
    _pad(Math.floor(position / 60), 2),
    _pad(position % 60, 2),
  ];

  const elapsed = minutesAndSeconds(currentPosition);
  // console.log("Seekbar elapsed :>> ", elapsed);
  const remaining = minutesAndSeconds(duration - currentPosition);
  // console.log("Seekbar remaining :>> ", remaining);

  const onSlidingStart = async () => {
    if (timerId) clearTimeout(timerId);

    // if (isPlaying) {
    //   await playbackInstance.pauseAsync();
    //   handlePlayPauseAction(isPlaying);
    //   console.log("Seekbar onSlidingStart Test");
    // }
  };

  const onSeek = async () => {
    // console.log("Seekbar onSeek Test");
    console.log(
      "Seekbar onSeek currentPosition in seconds:>> ",
      currentPosition
    );
    const currentPositionMilliseconds = currentPosition * 1000;
    console.log(
      "Seekbar onSeek currentPosition in milliseconds :>> ",
      currentPositionMilliseconds
    );
    // console.log("Seekbar onSeek playbackInstance:>> ", playbackInstance);
    if (isPlaying) {
      await playbackInstance.playFromPositionAsync(currentPositionMilliseconds);
      setCurrentPositionWithTimer(currentPosition);
      // const timerId = setInterval(() => {
      //   currentPosition += 1;
      //   // console.log(
      //   //   "Controls handlePlayPause currentPosition :>> ",
      //   //   currentPosition
      //   // );
      //   setCurrentPosition(currentPosition);
      // }, 1000);
      // setTimer(timerId);
    } else {
      setCurrentPosition(currentPosition);
    }
  };

  const onValueChange = async (value) => {
    const currentPosition = Math.floor(duration * value);
    // console.log('currentPosition :>> ', currentPosition);
    setCurrentPosition(currentPosition);
  };

  return (
    <View style={styles.container}>
      <View style={styles.durationInfo}>
        <Text>{elapsed[0] + ":" + elapsed[1]}</Text>
        <View style={styles.placeholder}></View>
        <Text>{duration > 1 && "-" + remaining[0] + ":" + remaining[1]}</Text>
      </View>
      <Slider
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        onValueChange={onValueChange}
        thumbTintColor="#2f712f"
        trackStyle={styles.trackStyleSlider}
        value={sliderValue}
        minimumTrackTintColor="#1e481e"
        maximumTrackTintColor="#7cbd7c"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: vmax(2),
    // color: "#2f712f",
  },
  durationInfo: {
    flexDirection: "row",
  },
  placeholder: {
    flex: 1,
  },
  // slider: {
  //   marginHorizontal: vmax(1),
  //   color: "#2f712f",
  // },
  trackStyleSlider: {
    // borderWidth: 1
  },
});

const mapActionsToProps = {
  setCurrentPosition,
  handlePlayPauseAction,
  setCurrentPositionWithTimer,
  handleChangeTrackAction,
  loadAudio,
};

const mapStateToProps = (state) => ({
  playbackInstance: state.playbackInstance,
  currentPosition: state.currentPosition,
  isPlaying: state.isPlaying,
  tracks: state.tracks,
  currentIndex: state.currentIndex,
  timerId: state.timerId,
});

export default connect(mapStateToProps, mapActionsToProps)(Seekbar);
