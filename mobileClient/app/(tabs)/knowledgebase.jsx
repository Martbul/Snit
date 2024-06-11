import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  Modal,
  Easing,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SmallSearchInput from "../../components/singleUIElements/SmallSeacrhInput";
import { icons } from "../../constants";
import KnowledgeBaseCard from "../../components/knowledgeBase/KnowledgeBaseCard";
import {
  createKnowledgeBase,
  getAllKnowledgeBases,
} from "../../services/knowledgeServices";
import { AuthContext } from "../../contexts/AuthContext";
import useFetchKnowledgeBases from "../../hooks/useFetchKnowledgeBases";
import EmptyState from "../../components/EmptyState";
import styles from "../../assets/css/knowledgebase/knowledgebase";
import { Sidebar } from "../../components/sidebar/Sidebar";
// import { toggleSidebar } from "../../components/sidebar/toggleSidebar";

const Knowledge = () => {
  const { user } = useContext(AuthContext);
  const {  refetch } = useFetchKnowledgeBases(() =>
    getAllKnowledgeBases(user.email)
  );
  const [allKnowledgeBases, setAllKnowledgeBases] =useState(null)
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarWidth = Dimensions.get("window").width * 0.82;
  const sidebarAnim = useState(new Animated.Value(-sidebarWidth))[0];

  useEffect(() => {
      const setKnowledgeBases = async () => {
        const knowledgeBases = await getAllKnowledgeBases(user.email);
        setAllKnowledgeBases(knowledgeBases);
        await refetch();
        setSelectedKnowedgeBase(knowledgeBases[0]);
      };
      setKnowledgeBases();
    refetch();
  }, []);

  const toggleSidebar = () => {
    if (isSidebarVisible) {
      Animated.timing(sidebarAnim, {
        toValue: -sidebarWidth,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => setIsSidebarVisible(false));
    } else {
      setIsSidebarVisible(true);
      Animated.timing(sidebarAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  };

  const createNewKnowledgeBase = async () => {
    const newKnowledgeBase = await createKnowledgeBase(user.email);
    refetch();
    router.push({
      pathname: "/(knowledge)/[knowledgedata]",
      params: { title: newKnowledgeBase.title },
    });
  };

  return (
    <SafeAreaView style={styles.container} className="bg-primary h-full">
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          {/* onPress={() => toggleSidebar(isSidebarVisible, setIsSidebarVisible, sidebarAnim, sidebarWidth)}> */}
          <Image
            source={icons.hamburger}
            style={styles.hamburgerIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* //TODO: Implement search for knowledgebase */}
        <View style={styles.searchContainer}>
          <SmallSearchInput />
        </View>
      </View>

      {isSidebarVisible && (
        <Sidebar
          toggleSidebar={toggleSidebar}
          sidebarWidth={sidebarWidth}
          sidebarAnim={sidebarAnim}
        />
      )}

      <View style={styles.contentContainer}>
        <FlatList
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
          data={allKnowledgeBases}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <KnowledgeBaseCard
                item={item}
              />
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState title="Add knowledge folders" />
          )}
        />
      </View>

      <TouchableOpacity
        onPress={createNewKnowledgeBase}
        style={styles.floatingButton}
      >
        <Image
          source={icons.plusBig}
          style={styles.plusIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Knowledge;

