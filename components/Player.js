import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";

// Redux stuff
import { connect } from "react-redux";

import Controls from "./Controls";
import Seekbar from "./Seekbar";

const Player = ({ tracks, currentIndex, phoneOrientation, shuffledTimes }) => {
  // React.useEffect(()=>{
  //   console.log('Player useEffect tracks[currentIndex] :>> ', tracks[currentIndex]);
  // },[tracks])

  const { imageSource, album, title, author } = tracks[currentIndex];
  // console.log('Player shuffledTimes :>> ', shuffledTimes);

  // console.log('Player screenOrientation :>> ', screenOrientation);

  return (
    <View
      style={
        phoneOrientation == 1 || phoneOrientation == 2
          ? styles.container
          : styles.containerLandscape
      }
    >
      <View>
        <Text style={styles.albumTitle}>{album}</Text>
        <View style={styles.albumContainer}>
          <Image
            style={
              phoneOrientation == 1 || phoneOrientation == 2
                ? styles.albumCover
                : styles.albumCoverLandscape
            }
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
        <View>
            <Seekbar />
        </View>
        <View>
          <Controls />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },

  containerLandscape: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  albumTitle: {
    marginBottom: vmax(3),
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },

  containerControl: {
    flex: 1,
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: "#2f712f",
    marginTop: vmax(4),
  },

  albumCover: {
    width: vmax(52),
    height: vmax(52),
  },

  albumContainer: {
    alignItems: "center",
  },

  albumCoverLandscape: {
    width: vmax(34),
    height: vmax(34),
  },

  textInfo: {
    alignItems: "center",
    justifyContent: "center",
  },

  trackTitle: {
    marginTop: vmax(5),
    fontWeight: "bold",
    fontSize: 20,
  },

  authorTitle: {
    fontSize: 16,
  },
});

const mapStateToProps = (state) => ({
  tracks: state.tracks,
  currentIndex: state.currentIndex,
  phoneOrientation: state.phoneOrientation,
  shuffledTimes: state.shuffledTimes,
});

export default connect(mapStateToProps)(Player);
