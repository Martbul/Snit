// import { createContext, useCallback, useContext, useEffect, useState } from "react";
// import { postRequest, baseUrl } from "../utils/request";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getAllKnowledgeBases } from './../services/knowledgeServices';
// import useFetchKnowledgeBases from './../hooks/useFetchKnowledgeBases';
// import { AuthContext } from "./AuthContext";

// export const KnowledgeBaseContext = createContext();

// export const KnowledgeBaseContextProvider = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   console.log('aaaaaaaaaaaaa', user);
//   // if(user == null) return
//   //  const { data: knowledgeBases, refetch } = useFetchKnowledgeBases(() =>
//   //    getAllKnowledgeBases(user?.email)
//   // );
// //todo: not sure if i even need to use a useContext or all this logic should be used in the home screen
//   const { data: knowledgeBases, refetch } = useFetchKnowledgeBases(() =>
//      getAllKnowledgeBases(user?.email))
  
//   const [selectedKnowedgeBase, setSelectedKnowedgeBase] = useState(null);
//   const [allUserKnowledgeBases, setAllUserKnowledgeBases] = useState([]);
//   const [selectedKBimages, setSelectedKBimages] = useState(null);
//   const [selectedKBdocuments, setSelectedKBdocuments] = useState(null);

// // //Todo: fix renderuing of the knoweldge bases
//   useEffect(() => {
//     const result = refetch();
//     console.log('tttttttt',result);
//     let knowedgeDataArr = result._j;
    
//     setAllUserKnowledgeBases(knowledgeBases);
  
    
//   },[]);

//   return (
//     <KnowledgeBaseContext.Provider
//       value={{allUserKnowledgeBases, selectedKnowedgeBase, selectedKBimages, selectedKBdocuments }}
//     >
//       {children}
//     </KnowledgeBaseContext.Provider>
//   );
// };
