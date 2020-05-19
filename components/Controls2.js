import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Redux stuff
import { connect } from "react-redux";
import {
  loadAudio,
  handlePlayPauseAction,
  handleChangeTrackAction,
} from "../redux/mediaActions";

const Controls = ({
  playbackInstance,
  tracks,
  isPlaying,
  currentIndex,
  loadAudio,
  handlePlayPauseAction,
  handleChangeTrackAction,
}) => {
  React.useEffect(() => {
    // console.log("Controls2 useEffect tracks :>> ", tracks);
    const { uri } = tracks[currentIndex];
    console.log("Controls2 useEffect uri :>> ", uri);
    console.log("Controls2 useEffectisPlaying :>> ", isPlaying);
    loadAudio(uri, isPlaying);
  }, []);

  const { imageSource, author, title } = tracks[currentIndex];
  console.log("Controls2 imageSource :>> ", imageSource);

  handlePlayPause = async (playbackInstance, isPlaying) => {
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();
    handlePlayPauseAction(isPlaying);
  };

  handlePreviousTrack = async (
    playbackInstance,
    currentIndex,
    tracks,
    isPlaying
  ) => {
    const amountOfTracks = tracks.length;
    console.log(
      "Controls2 handlePreviousTrack amountOfTracks :>> ",
      amountOfTracks
    );

    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();

        currentIndex > 0
          ? (currentIndex -= 1)
          : (currentIndex = amountOfTracks - 1);

        handleChangeTrackAction(currentIndex, tracks);

        const { uri } = tracks[currentIndex];
        console.log(
          "Controls2 handlePreviousTrack tracks[currentIndex].uri :>> ",
          uri
        );
        console.log(
          "Controls2 handlePreviousTrack tracks[currentIndex].isPlaying :>> ",
          isPlaying
        );

        loadAudio(uri, isPlaying);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleNextTrack = async (
    playbackInstance,
    currentIndex,
    tracks,
    isPlaying
  ) => {
    const amountOfTracks = tracks.length;
    console.log(
      "Controls2 handleNextTrack amountOfTracks :>> ",
      amountOfTracks
    );

    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
        currentIndex < amountOfTracks - 1
          ? (currentIndex += 1)
          : (currentIndex = 0);
        handleChangeTrackAction(currentIndex, tracks);

        const { uri } = tracks[currentIndex];
        console.log(
          "Controls2 handleNextTrack tracks[currentIndex].uri :>> ",
          uri
        );
        console.log(
          "Controls2 handleNextTrack tracks[currentIndex].isPlaying :>> ",
          isPlaying
        );

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
          handlePreviousTrack(
            playbackInstance,
            currentIndex,
            tracks,
            isPlaying
          );
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
          handleNextTrack(playbackInstance, currentIndex, tracks, isPlaying);
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
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    overflow: "hidden",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const mapActionsToProps = {
  loadAudio,
  handlePlayPauseAction,
  handleChangeTrackAction,
};

const mapStateToProps = (state) => ({
  playbackInstance: state.playbackInstance,
  currentIndex: state.currentIndex,
  isPlaying: state.isPlaying,
  currentIndex: state.currentIndex,
  tracks: state.tracks,
});

export default connect(mapStateToProps, mapActionsToProps)(Controls);
