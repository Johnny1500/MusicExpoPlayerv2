import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

// Redux stuff
import { connect } from "react-redux";
import {
  loadAudio,
  handlePlayPauseAction,
  handleChangeTrackAction,
  shuffleTracks,
  setCurrentPosition,
  setCurrentPositionWithTimer,
} from "../redux/mediaActions";

const Controls = ({
  playbackInstance,
  tracks,
  isPlaying,
  currentIndex,
  loadAudio,
  handlePlayPauseAction,
  handleChangeTrackAction,
  shuffleTracks,
  currentPosition,
  setCurrentPosition,
  timerId,
  setCurrentPositionWithTimer,
}) => {
  // React.useEffect(() => {
  //   // console.log("Controls2 useEffect tracks :>> ", tracks);
  //   const { uri } = tracks[currentIndex];
  //   // console.log("Controls2 useEffect uri :>> ", uri);
  //   // console.log("Controls2 useEffectisPlaying :>> ", isPlaying);
  //   loadAudio(uri, isPlaying);
 
  // }, []);

  // const { imageSource, author, title } = tracks[currentIndex];
  // console.log("Controls2 imageSource :>> ", imageSource);

  const handlePlayPause = async () => {
    try {
      const currentPositionMilliseconds = currentPosition * 1000;
      // console.log(
      //   "Controls handlePlayPause currentPosition in milliseconds :>> ",
      //   currentPositionMilliseconds
      // );

      console.log("Controls handlePlayPause timerId :>> ", timerId);

      if (isPlaying) {
        await playbackInstance.pauseAsync();
        if (timerId) {
          console.log("Controls handlePlayPause test");
          clearTimeout(timerId);
        }
      } else {
        await playbackInstance.playFromPositionAsync(
          currentPositionMilliseconds
        );
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
      }

      // isPlaying
      //   ? await playbackInstance.pauseAsync()
      //   : await playbackInstance.playFromPositionAsync(currentPositionMilliseconds);
      handlePlayPauseAction(isPlaying);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePreviousTrack = async () => {
    try {
      const amountOfTracks = tracks.length;
      // console.log(
      //   "Controls2 handlePreviousTrack amountOfTracks :>> ",
      //   amountOfTracks
      // );

      if (playbackInstance) {
        await playbackInstance.unloadAsync();

        currentIndex > 0
          ? (currentIndex -= 1)
          : (currentIndex = amountOfTracks - 1);

        if (timerId) clearTimeout(timerId);
        handleChangeTrackAction(currentIndex);
        setCurrentPosition(0);

        const { uri } = tracks[currentIndex];
        // console.log(
        //   "Controls2 handlePreviousTrack tracks[currentIndex].uri :>> ",
        //   uri
        // );
        // console.log(
        //   "Controls2 handlePreviousTrack tracks[currentIndex].isPlaying :>> ",
        //   isPlaying
        // );

        await loadAudio(uri, isPlaying);
        if (isPlaying) {
          currentPosition = 0;
          setCurrentPositionWithTimer(currentPosition);
          // currentPosition = 0;
          // const timerId = setInterval(() => {
          //   currentPosition += 1;
          //   // console.log(
          //   //   "Controls handlePlayPause currentPosition :>> ",
          //   //   currentPosition
          //   // );
          //   setCurrentPosition(currentPosition);
          // }, 1000);

          // setTimer(timerId);
        }

        // console.log("window.loadAudio :>> ", window.loadAudio);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleNextTrack = async () => {
    try {
      const amountOfTracks = tracks.length;
      // console.log(
      //   "Controls2 handleNextTrack amountOfTracks :>> ",
      //   amountOfTracks
      // );

      if (playbackInstance) {
        await playbackInstance.unloadAsync();
        currentIndex < amountOfTracks - 1
          ? (currentIndex += 1)
          : (currentIndex = 0);
        if (timerId) clearTimeout(timerId);
        handleChangeTrackAction(currentIndex);
        setCurrentPosition(0);

        const { uri } = tracks[currentIndex];
        // console.log(
        //   "Controls2 handleNextTrack tracks[currentIndex].uri :>> ",
        //   uri
        // );
        // console.log(
        //   "Controls2 handleNextTrack tracks[currentIndex].isPlaying :>> ",
        //   isPlaying
        // );

        await loadAudio(uri, isPlaying);
        if (isPlaying) {
          currentPosition = 0;
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
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleShuffleTracks = async () => {
    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
        for (let i = tracks.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
        }
        shuffleTracks(tracks);
        if (timerId) clearTimeout(timerId);
        setCurrentPosition(0);
        const { uri } = tracks[currentIndex];
        console.log(
          "Controls handleShuffleTracks tracks[currentIndex] :>> ",
          tracks[currentIndex]
        );
        loadAudio(uri, isPlaying);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleReverseTracks = async () => {
    try {
      if (playbackInstance) {
        await playbackInstance.unloadAsync();
        tracks.reverse();
        shuffleTracks(tracks);
        if (timerId) clearTimeout(timerId);
        setCurrentPosition(0);
        const { uri } = tracks[currentIndex];
        console.log(
          "Controls handleShuffleTracks tracks[currentIndex] :>> ",
          tracks[currentIndex]
        );
        loadAudio(uri, isPlaying);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleShuffleTracks}>
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
      <TouchableOpacity onPress={handleReverseTracks}>
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
    justifyContent: "center",
  },

  previous: {
    marginRight: vmax(1),
  },

  next: {
    marginLeft: vmax(1),
  },
});

const mapActionsToProps = {
  loadAudio,
  handlePlayPauseAction,
  handleChangeTrackAction,
  shuffleTracks,
  setCurrentPosition,
  setCurrentPositionWithTimer,
};

const mapStateToProps = (state) => ({
  playbackInstance: state.playbackInstance,
  currentIndex: state.currentIndex,
  isPlaying: state.isPlaying,
  tracks: state.tracks,
  currentPosition: state.currentPosition,
  timerId: state.timerId,
});

export default connect(mapStateToProps, mapActionsToProps)(Controls);
