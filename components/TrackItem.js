import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";
import {
  loadAudio,
  handlePlayPauseAction,
  handleChangeTrackAction,
  setCurrentPositionWithTimer,
  setCurrentPosition
} from "../redux/mediaActions";

const TrackItem = ({
  playbackInstance,
  track,
  isPlaying,
  index,
  timerId,
  currentIndex,
  currentPosition,
  loadAudio,
  setCurrentPosition,
  setCurrentPositionWithTimer,
  handleChangeTrackAction,
  handlePlayPauseAction,
}) => {
  const { uri, imageSource, title, author, durationText } = track;

  const handlePlayPause = async () => {
    try {
      if (playbackInstance) {
        const currentPositionMilliseconds = currentPosition * 1000;

        if (index != currentIndex) {
          await playbackInstance.unloadAsync();
          handleChangeTrackAction(index);
          setCurrentPosition(0);
          handlePlayPauseAction(isPlaying);
          await loadAudio(uri, isPlaying);
        }

        // console.log(
        //   "Controls handlePlayPause currentPosition in milliseconds :>> ",
        //   currentPositionMilliseconds
        // );

        // console.log("Controls handlePlayPause timerId :>> ", timerId);

        if (isPlaying) {
          await playbackInstance.pauseAsync();
          if (timerId) {
            //   console.log("Controls handlePlayPause test");
            clearTimeout(timerId);
          }
        } else {
          await playbackInstance.playFromPositionAsync(
            currentPositionMilliseconds
          );
          setCurrentPositionWithTimer(currentPosition);
        }

        handlePlayPauseAction(isPlaying);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={handlePlayPause}>
        <Image
          style={styles.albumCover}
          source={{
            uri: imageSource,
          }}
        />
        <View style={styles.info}>
          <Text style={styles.authorTitle}>{author}</Text>
          <Text style={styles.trackTitle}>{title}</Text>
        </View>
        <Text style={styles.durationText}>{durationText}</Text>
      </TouchableOpacity>
      <View style={styles.separator}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  albumCover: {
    width: vmax(8),
    height: vmax(8),
    marginLeft: vmax(1)
  },

  trackTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1e481e",
  },

  authorTitle: {
    fontSize: 12,
  },

  info: {
    flex:1,
    alignItems: "center"
  },

  durationText: {
    paddingRight: vmax(2)
  },

  separator: {
    margin: 2,
    borderWidth: 0.5
  }

});

TrackItem.propTypes = {
  track: PropTypes.object.isRequired,
  playbackInstance: PropTypes.object,
  index: PropTypes.number.isRequired,
  timerId: PropTypes.number,
  currentIndex: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentPosition: PropTypes.number.isRequired,
};

const mapActionsToProps = {
  loadAudio,
  handleChangeTrackAction,
  handlePlayPauseAction,
  setCurrentPositionWithTimer,
  setCurrentPosition,
};

const mapStateToProps = (state) => ({
  playbackInstance: state.playbackInstance,
  isPlaying: state.isPlaying,
  timerId: state.timerId,
  currentIndex: state.currentIndex,
  currentPosition: state.currentPosition,
});

export default connect(mapStateToProps, mapActionsToProps)(TrackItem);
