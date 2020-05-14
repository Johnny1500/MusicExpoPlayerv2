import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Redux stuff
import { connect } from "react-redux";

const Controls = ({
  playbackInstance,
  tracks,
  isPlaying,
  currentTrack: { author, imageSource, title },
  handlePlayPauseAction,
  handleChangeTrackAction,
  loadAudio,
}) => {
  handlePlayPause = async (playbackInstance, isPlaying) => {
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();
    handlePlayPauseAction(isPlaying);
  };

  handlePreviousTrack = async (playbackInstance, currentIndex, tracks) => {
    const amountOfTracks = tracks.length;
    console.log("amountOfTracks :>> ", amountOfTracks);

    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();

        currentIndex > 0
          ? (currentIndex -= 1)
          : (currentIndex = amountOfTracks - 1);

        handleChangeTrackAction(currentIndex, tracks);

        const { uri, isPlaying } = tracks[currentIndex];
        console.log("tracks[currentIndex].uri :>> ", uri);
        console.log("tracks[currentIndex].isPlaying :>> ", isPlaying);

        loadAudio(uri, isPlaying);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleNextTrack = async (playbackInstance, currentIndex, tracks) => {
    const amountOfTracks = tracks.length;
    console.log("amountOfTracks :>> ", amountOfTracks);

    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
        currentIndex < amountOfTracks - 1
          ? (currentIndex += 1)
          : (currentIndex = 0);
        handleChangeTrackAction(currentIndex, tracks);

        const { uri, isPlaying } = tracks[currentIndex];
        console.log("tracks[currentIndex].uri :>> ", uri);
        console.log("tracks[currentIndex].isPlaying :>> ", isPlaying);

        loadAudio(uri, isPlaying);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handlePreviousTrack(playbackInstance, currentIndex, tracks);
        }}
      >
        <MaterialIcons
          name="skip-previous"
          size={38}
          style={styles.materialPicture}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handlePlayPause(playbackInstance, isPlaying);
        }}
      >
        {isPlaying ? (
          <MaterialIcons
            name="pause-circle-filled"
            size={38}
            style={styles.materialPicture}
          />
        ) : (
          <MaterialIcons
            name="play-circle-filled"
            size={38}
            style={styles.materialPicture}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleNextTrack(playbackInstance, currentIndex, tracks);
        }}
      >
        <MaterialIcons
          name="skip-next"
          size={38}
          style={styles.materialPicture}
        />
      </TouchableOpacity>
      <Image
        style={styles.albumCover}
        source={{
          uri: imageSource,
        }}
      />
      <View style={styles.textInfo}>
        <Text style={styles.titleText}>{title}</Text>
        <Text>{author}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  materialPicture: {
    color: "#2f712f",
  },
  container: {
    flexDirection: "row",
    height: 60,
    margin: 10,
    alignItems: "center",
  },
  albumCover: {
    width: 50,
    height: 50,
  },
  textInfo: {
    flexDirection: "column",
    alignItems: "center",
  },
  titleText: {
    fontWeight: "bold",
  },
});

const mapActionsToProps = {
  handlePlayPauseAction,
  handleChangeTrackAction,
  loadAudio,
};

const mapStateToProps = (state) => ({
  playbackInstance: state.playbackInstance,
  currentTrack: state.currentTrack,
  isPlaying: state.isPlaying,
  currentIndex: state.currentIndex,
  tracks: state.tracks,
});

export default connect(mapStateToProps, mapActionsToProps)(Controls);
