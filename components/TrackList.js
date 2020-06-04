import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import PropTypes from "prop-types";

// Redux stuff
import { connect } from "react-redux";
import { loadAudio } from "../redux/mediaActions";

import TrackItem from "./TrackItem";

const TrackList = ({ tracks, currentIndex, isPlaying, loadAudio }) => {
  React.useEffect(() => {
    console.log("TrackList useEffect tracks :>> ", tracks);
    const { uri } = tracks[currentIndex];
    console.log("TrackList useEffect uri :>> ", uri);
    console.log("TrackList useEffect isPlaying :>> ", isPlaying);
    loadAudio(uri, isPlaying);
  }, []);

  const { album } = tracks[currentIndex];

  return (
    <View>
      <Text style={styles.albumTitle}>{album}</Text>
      <FlatList
        data={tracks}
        renderItem={({ item, index }) => (
          <TrackItem track={item} index={index} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  albumTitle: {
    marginVertical: vmax(2),
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
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
