import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { Audio } from "expo-av";

// Redux stuff
import { connect } from "react-redux";
import { setTracks, loadAudio } from "../redux/mediaActions";

// import Controls from "./Controls";
import Controls from "./Controls2";

const Home = ({
  loading,
  tracks,
  isPlaying,
  currentTrack: { uri },
  setTracks,
  loadAudio,
}) => {
  React.useEffect(() => {
    // let mounted = true;
    // // console.log("mounted :>> ", mounted);

    // if (mounted) setTracks();
    // console.log('setTracks :>> ',setTracks());
    // console.log('tracks Home1:>> ', tracks);

    async function fetchData() {
      try {
        {
          await Audio.setAudioModeAsync({
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid:
              Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: true,
          });

          console.log("Home useEffect setTracks()");
          setTracks();
          console.log("Home useEffect first loading audio");
          console.log("Home useEffect uri :>> ", uri);
          console.log("Home useEffect isPlaying :>> ", isPlaying);
          loadAudio(uri, isPlaying);
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();

    // return () => (mounted = false);
  }, []);

  // console.log('tracks :>> ', tracks);
  // console.log('tracks Home2:>> ', tracks[8]);

  let markup = !loading ? (
    <Controls tracks={tracks} />
  ) : (
    <Text>Loading...</Text>
  );

  //   console.log("markup :>> ", markup);

  return (
    <View style={styles.container}>
      <View style={styles.lineStyle} />
      {markup}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: "#2f712f",
    marginHorizontal: vw(2),
  },
});

const mapActionsToProps = {
  setTracks,
  loadAudio,
};

const mapStateToProps = (state) => ({
  loading: state.loading,
  tracks: state.tracks,
  currentTrack: state.currentTrack,
  isPlaying: state.isPlaying,
});

export default connect(mapStateToProps, mapActionsToProps)(Home);
