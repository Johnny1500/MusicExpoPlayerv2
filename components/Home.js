import * as React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { Audio } from "expo-av";

// Redux stuff
import { connect } from "react-redux";
import { setTracks } from "../redux/mediaActions";

// import Controls from "./Controls";
import Player from "./Player";

const Home = ({ loading, setTracks }) => {
  React.useEffect(() => {
    async function fetchData() {
      try {
        {
          await Audio.setAudioModeAsync({
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          });

          setTracks();
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);

  let markup = !loading ? (
    <View>
      <Player />
    </View>
  ) : (
    <View>
      <ActivityIndicator size="large" color="#2f712f" />
      <Text>Loading...</Text>
    </View>
  );

  return (
    <View style={loading ? styles.containerLoading : styles.containerControl}>
      {markup}
    </View>
  );
};

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  containerControl: {
    flex: 1,
    justifyContent: "center",
  },

  loadingText: {
    height: vh(25),
    fontWeight: "bold",
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: "#2f712f",
    marginHorizontal: vw(2),
  },
});

const mapStateToProps = (state) => ({
  loading: state.loading,
  tracks: state.tracks,
});

export default connect(mapStateToProps, { setTracks })(Home);
