import { Animated, Dimensions, Text, TouchableOpacity } from "react-native";
import styles from "../../assets/css/knowledgebase/knowledgebase";
import { useState } from "react";
export const Sidebar = ({toggleSidebar,sidebarWidth,sidebarAnim}) => {
   
  return (
    <>
      <TouchableOpacity style={styles.overlay} onPress={toggleSidebar}>
        <Animated.View
          style={[
            styles.sidebar,
            { transform: [{ translateX: sidebarAnim }], width: sidebarWidth },
          ]}
        >
          <Text style={styles.sidebarTitle}>Menu</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Help</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};
