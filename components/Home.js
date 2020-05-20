import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { Audio } from "expo-av";

// Redux stuff
import { connect } from "react-redux";
import { setTracks } from "../redux/mediaActions";

// import Controls from "./Controls";
import Controls from "./Controls";

const Home = ({ loading, tracks, setTracks }) => {
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
    <Controls tracks={tracks} />
  ) : (
    <Text>Loading...</Text>
  );

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

const mapStateToProps = (state) => ({
  loading: state.loading,
  tracks: state.tracks,
});

export default connect(mapStateToProps, { setTracks })(Home);
