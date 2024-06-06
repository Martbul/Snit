import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "../../constants";
import { router } from "expo-router";
import { deleteFileFromCurrentKnowledgeBase } from "../../services/knowledgeServices";

const KnowledgeBaseImage = ({
  item,
  knowledgeBaseTitle,
  creator,
  getCurrentKnowledgeBaseData,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = async () => {
    await deleteFileFromCurrentKnowledgeBase(item, knowledgeBaseTitle, creator);
    setModalVisible(false);
    getCurrentKnowledgeBaseData()
  };
  return (
    <View className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
      <Image
        source={{ uri: item }}
        className="w-full h-full rounded-xl mt-3"
        resizeMode="cover"
      />

      <TouchableOpacity
        style={{ position: "absolute", top: 10, right: 8 }}
        onPress={() => setModalVisible(true)}
      >
        <Image source={icons.menu} className="w-12 h-5" />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Delete this image?</Text>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalHeader: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  modalButton: {
    width: "100%",
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
  cancelButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  cancelButtonText: {
    color: "black",
    fontSize: 14,
  },
});
export default KnowledgeBaseImage;
