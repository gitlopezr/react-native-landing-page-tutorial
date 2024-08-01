
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import CTA from "../../components/CTA";
import Navbar from "../../components/Navbar";
import shop from "../../assets/images/shop.png";
import Terms from "../../components/Terms";
import Wishlist from "../../components/Wishlist";
import Announcement from "../../components/Announcement";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import axios from "axios";
export default function App() {
  const [data, setData] = useState();

  const access_Token = "cefe6a7049dd83a8a31d11216a9217c7e3c54873";
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `https://api.buttercms.com/v2/pages/*/home-page/?auth_token=${access_Token}`
        )
        .then((response) => {
          setData(response.data.data.fields);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView>
        <Navbar />
          <CTA data={data?.cta_section} />
          <Image
            source={{ uri: data?.image_section?.clothe_image }}
            style={{ width: "100%", height: 200 }}
          />
          <Terms data={data?.terms_section} />
          <Wishlist data={data?.wishlist_section} />
          <Announcement data={data?.announcement_section} />
          <Contact data={data?.contact_section} />
          <Footer data={data?.footer_section} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
