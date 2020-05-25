import * as React from "react";
import { ActivityIndicator, StyleSheet, View, Text, Image } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { Audio } from "expo-av";
import { ScreenOrientation } from 'expo';

// Redux stuff
import { connect } from "react-redux";

// import Controls from "./Controls";
import Controls from "./Controls";

const Player = ({ tracks, currentIndex }) => {
  const { imageSource, album, title, author } = tracks[currentIndex];
  // let screenOrientation = ScreenOrientation.ScreenOrientationInfo;
  // console.log('Player screenOrientation :>> ', screenOrientation);

  return (
    <View>
      <View>
        <Text style={styles.albumTitle}>{album}</Text>
        <View style={styles.albumContainer}>
          <Image
            style={styles.albumCover}
            source={{
              uri: imageSource,
            }}
          />
        </View>
      </View>
      <View>
        <View style={styles.textInfo}>
          <Text style={styles.trackTitle}>{title}</Text>
          <Text style={styles.authorTitle}>{author}</Text>
        </View>
        <View style={styles.lineStyle} />
        <View style={styles.containerControl}>
          <Controls />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex:1,
    justifyContent: "center",
    // justifyContent: "center",
    // alignItems: "center",
  },

  albumTitle: {
    // marginTop: vh(10),
    marginBottom: vh(3),
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },

  containerControl: {
    flex: 1,
    // justifyContent: "flex-end",
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: "#2f712f",
    marginTop: vw(8),
  },

  albumCover: {
    width: vw(84),
    height: vh(50),
  },

  albumContainer: {
    alignItems: "center",
  },

  textInfo: {
    alignItems: "center",
    justifyContent: "center",
  },

  trackTitle: {
    marginTop: vh(5),
    fontWeight: "bold",
    fontSize: 20,
  },

  authorTitle: {
    fontSize: 16,
  },
});

const mapStateToProps = (state) => ({
  loading: state.loading,
  tracks: state.tracks,
  currentIndex: state.currentIndex,
});

export default connect(mapStateToProps)(Player);
