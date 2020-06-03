import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";

const TrackItem = ({
  playbackInstance,
  tracks,
  isPlaying,
  index,
  handlePlayPauseAction,
  timerId,
  setCurrentPositionWithTimer,
  loadAudio,
}) => {
  const { uri, imageSource, album, title, author, durationText } = tracks[index];
  
  const handlePlayPause = async () => {
    try {
      const currentPositionMilliseconds = currentPosition * 1000;
      
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
        <View>
          <Text style={styles.authorTitle}>{author}</Text>
          <Text style={styles.trackTitle}>{title}</Text>
        </View>
        <Text>{durationText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  albumCover: {
    width: vmax(10),
    height: vmax(10),
  },

  trackTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
    color: "#1e481e",
  },

  authorTitle: {
    fontSize: 12,
  },
});

TrackItem.propTypes = {
  imageSource: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  durationText: PropTypes.string.isRequired,
  playbackInstance: PropTypes.object.isRequired,
};

const mapActionsToProps = {
  loadAudio,
};

const mapStateToProps = (state) => ({
  playbackInstance: state.playbackInstance,
  isPlaying: state.isPlaying,
  tracks: state.tracks,
  playbackInstance: state.playbackInstance,
});

export default connect(mapStateToProps, mapActionsToProps)(TrackItem);
