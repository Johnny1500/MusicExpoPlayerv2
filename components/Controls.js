import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";

export class Controls extends React.Component {
  _isMounted = false;

  state = {
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    volume: 1.0,
    isBuffering: false,
    trackSource:
      "https://ia803008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/a_day_with_great_poets_01_byron_128kb.mp3",
    imageSource:
      "https://ia803008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/day_great_poets_1310.jpg",
  };

  async componentDidMount() {
    this._isMounted = true;

    try {
      {
        await Audio.setAudioModeAsync({
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true,
        });

        if (this._isMounted) this.loadAudio();
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({});
  }

  async loadAudio() {
    const {
      currentIndex,
      isPlaying,
      isBuffering,
      volume,
      trackSource,
    } = this.state;

    const { tracks } = this.props;
    // let track = tracks[currentIndex];

    // console.log('tracks :>> ', tracks);
    // console.log("track :>> ", track);
    // console.log("loading :>> ", loading);

    try {
      const playbackInstance = new Audio.Sound();

      const status = {
        shouldPlay: isPlaying,
        volume: volume,
      };

      // console.log("tracks[currentIndex] loadAudio :>> ", tracks[currentIndex]);

      let uriTrackSource = tracks[currentIndex]
        ? tracks[currentIndex].uri
        : trackSource;
      //   console.log("uriTrackSource loadAudio:>> ", uriTrackSource);

      const source = {
        uri: uriTrackSource,
      };

      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      this.setState({
        playbackInstance,
      });
    } catch (e) {
      console.log(e);
    }
  }

  onPlaybackStatusUpdate = (status) => {
    this.setState({
      isBuffering: status.isBuffering,
    });
  };

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = this.state;
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();

    this.setState({
      isPlaying: !isPlaying,
    });
  };

  handlePreviousTrack = async (amountOfTracks) => {
    let { currentIndex, playbackInstance } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex > 0
        ? (currentIndex -= 1)
        : (currentIndex = amountOfTracks - 1);
      this.setState({
        currentIndex,
      });
      this.loadAudio();
    }
  };

  handleNextTrack = async (amountOfTracks) => {
    let { currentIndex, playbackInstance } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      currentIndex < amountOfTracks - 1
        ? (currentIndex += 1)
        : (currentIndex = 0);
      this.setState({
        currentIndex,
      });
      this.loadAudio();
    }
  };

  render() {
    const { isPlaying, imageSource, currentIndex } = this.state;
    const { tracks } = this.props;
    // console.log('tracks Controls :>> ', tracks);
    // console.log("track1 :>> ", tracks[currentIndex]);
    // console.log("currentIndex :>> ", currentIndex);

    const amountOfTracks = tracks.length;
    // console.log("amountOfTracks :>> ", amountOfTracks);
    let uriImageSource = tracks[currentIndex]
      ? tracks[currentIndex].imageSource
      : imageSource;
    // console.log("tracks[currentIndex] render :>> ", tracks[currentIndex]);
    // console.log("uriImageSource render :>> ", uriImageSource);

    return (
      <View style={styles.container}>
        <Image
          style={styles.albumCover}
          source={{
            uri: uriImageSource,
          }}
        />

        <TouchableOpacity onPress={() => alert("")}>
          <MaterialIcons
            name="skip-previous"
            size={38}
            style={styles.materialPicture}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handlePlayPause}>
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
        <TouchableOpacity onPress={() => alert("")}>
          <MaterialIcons
            name="skip-next"
            size={38}
            style={styles.materialPicture}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

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
});

export default Controls;
