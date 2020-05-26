import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons';
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

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
    // console.log("Controls2 useEffect uri :>> ", uri);
    // console.log("Controls2 useEffectisPlaying :>> ", isPlaying);
    loadAudio(uri, isPlaying);
  }, []);

  // const { imageSource, author, title } = tracks[currentIndex];
  // console.log("Controls2 imageSource :>> ", imageSource);

  const handlePlayPause = async () => {
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();
    handlePlayPauseAction(isPlaying);
  };

  const handlePreviousTrack = async () => {
    const amountOfTracks = tracks.length;
    // console.log(
    //   "Controls2 handlePreviousTrack amountOfTracks :>> ",
    //   amountOfTracks
    // );

    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();

        currentIndex > 0
          ? (currentIndex -= 1)
          : (currentIndex = amountOfTracks - 1);

        handleChangeTrackAction(currentIndex);

        const { uri } = tracks[currentIndex];
        // console.log(
        //   "Controls2 handlePreviousTrack tracks[currentIndex].uri :>> ",
        //   uri
        // );
        // console.log(
        //   "Controls2 handlePreviousTrack tracks[currentIndex].isPlaying :>> ",
        //   isPlaying
        // );

        loadAudio(uri, isPlaying);
        // console.log("window.loadAudio :>> ", window.loadAudio);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleNextTrack = async () => {
    const amountOfTracks = tracks.length;
    // console.log(
    //   "Controls2 handleNextTrack amountOfTracks :>> ",
    //   amountOfTracks
    // );

    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
        currentIndex < amountOfTracks - 1
          ? (currentIndex += 1)
          : (currentIndex = 0);
        handleChangeTrackAction(currentIndex);

        const { uri } = tracks[currentIndex];
        // console.log(
        //   "Controls2 handleNextTrack tracks[currentIndex].uri :>> ",
        //   uri
        // );
        // console.log(
        //   "Controls2 handleNextTrack tracks[currentIndex].isPlaying :>> ",
        //   isPlaying
        // );

        loadAudio(uri, isPlaying);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => alert('')}>
        <SimpleLineIcons
          name="shuffle"
          size={vmax(5)}
          style={[styles.materialPicture, styles.previous]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePreviousTrack}>
        <MaterialIcons
          name="skip-previous"
          size={vmax(10)}
          style={[styles.materialPicture, styles.previous]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlayPause}>
        {isPlaying ? (
          <MaterialIcons
            name="pause-circle-filled"
            size={vmax(10)}
            style={styles.materialPicture}
          />
        ) : (
          <MaterialIcons
            name="play-circle-filled"
            size={vmax(10)}
            style={styles.materialPicture}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNextTrack}>
        <MaterialIcons
          name="skip-next"
          size={vmax(10)}
          style={[styles.materialPicture, styles.next]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('')}>
        <SimpleLineIcons
          name="loop"
          size={vmax(5)}
          style={[styles.materialPicture, styles.next]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  materialPicture: {
    color: "#2f712f",
     },
  container: {
    flexDirection: "row",
    height: vmax(9),
    marginTop: vmax(1.5),
    alignItems: "center",
    justifyContent: "center"
  },
  
  previous: {
    marginRight: vmax(1)
  },

  next: {
    marginLeft: vmax(1)
  }

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
  tracks: state.tracks,
});

export default connect(mapStateToProps, mapActionsToProps)(Controls);
