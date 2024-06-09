// export const toggleSidebar = ({isSidebarVisible,setIsSidebarVisible}) => {
   
//     if (isSidebarVisible) {
//       Animated.timing(sidebarAnim, {
//         toValue: -sidebarWidth,
//         duration: 300,
//         easing: Easing.linear,
//         useNativeDriver: false,
//       }).start(() => setIsSidebarVisible(false));
//     } else {
//       setIsSidebarVisible(true);
//       Animated.timing(sidebarAnim, {
//         toValue: 0,
//         duration: 300,
//         easing: Easing.linear,
//         useNativeDriver: false,
//       }).start();
//     }
//   };