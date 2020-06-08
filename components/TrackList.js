import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";
import { loadAudio } from "../redux/mediaActions";

import TrackItem from "./TrackItem";
import MiniPlayer from "./MiniPlayer";

const TrackList = ({ tracks, currentIndex, isPlaying, loadAudio }) => {
  // React.useEffect(() => {
  //   console.log("TrackList useEffect tracks :>> ", tracks);
  //   const { uri } = tracks[currentIndex];
  //   console.log("TrackList useEffect uri :>> ", uri);
  //   console.log("TrackList useEffect isPlaying :>> ", isPlaying);
  //   loadAudio(uri, isPlaying);
  // }, []);

  const { album } = tracks[currentIndex];
  // const trackListMarkup = tracks.map((track, index) => (
  //   <TrackItem track={track} index={index} key={track.id} />
  // ));

  return (
    <View style={styles.container}>
      {/* <View> */}
      <Text style={styles.albumTitle}>{album}</Text>
      {/* </View> */}
      {/* <View style={styles.tracklist}>
        <ScrollView scrollEnabled={true}>{trackListMarkup}</ScrollView>
      </View> */}
      <View style={styles.tracklist}>
        <FlatList
          data={tracks}
          renderItem={({ item, index }) => (
            <TrackItem track={item} index={index} />
          )}
        />
      </View>
      <MiniPlayer />
      {/* <View>
        <MiniPlayer />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  albumTitle: {
    marginTop: vmax(2),
    marginBottom: vmax(2),
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },

  tracklist: {
    flex: 1,
    // justifyContent: "flex-end"
  },

  container: {
    flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center"
  },

  miniPlayer: {
    alignSelf: "center",
  },
});

const mapActionsToProps = {
  loadAudio,
};

const mapStateToProps = (state) => ({
  tracks: state.tracks,
  currentIndex: state.currentIndex,
  isPlaying: state.isPlaying,
});

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(TrackList);
