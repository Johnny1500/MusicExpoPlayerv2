import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Redux stuff
import { connect } from "react-redux";

const Controls = ({
  playbackInstance,
  currentTrack: { author, imageSource, title, uri },
}) => {
  
    handlePlayPause = async () => {
        // const { isPlaying, playbackInstance } = this.state;
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


    return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handlePreviousTrack();
        }}
      >
        <MaterialIcons
          name="skip-previous"
          size={38}
          style={styles.materialPicture}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlayPause}>
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
          handleNextTrack(amountOfTracks);
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
          uri: uriImageSource,
        }}
      />
      <View style={styles.textInfo}>
        <Text>{trackTitle}</Text>
        <Text>{trackAuthor}</Text>
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
});

const mapStateToProps = (state) => ({
  playbackInstance: state.playbackInstance,
  currentTrack: state.currentTrack,
});

export default connect(mapStateToProps)(Controls);
