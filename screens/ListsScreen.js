import React, { useEffect, useRef, useState } from "react";
import { Box } from "@/components/ui/box";
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from "react-native";
import { addList } from "@/redux/slice/ListSlice";
import CardContent from "./components/CardContent";

import { useDispatch, useSelector } from "react-redux";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button } from "@/components/ui/button";
import {
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { fetchAllLists, deleteList } from "@/redux/slice/ListSlice";
import { Pressable, Modal } from "react-native";
import { Keyboard } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { AddIcon, TrashIcon } from "@/components/ui/icon";
import Toast from "react-native-toast-message";
import { Fab, FabLabel, FabIcon } from "@/components/ui/fab";

const ListsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { BoardId } = route.params;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { lists } = useSelector((state) => state.lists);
  const flatListRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    dispatch(fetchAllLists(BoardId));
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(fetchAllLists(BoardId));
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };
  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setInputValue("");
  };
  const handleDeletePress = (id) => {
    dispatch(deleteList(id));
    Toast.show({
      type: "success",
      text1: "Hello! 👋",
      text2: "List Deleted Successfully 🎉",
      position: "top",
    });

    if (flatListRef.current && lists.length > 1) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({ index: 0, animated: true });
      }, 300);
    }
  };

  const handleOk = () => {
    //  //addList({ BoardID, name: e.target.listName.value })
    //console.log("name " + inputValue);
    //console.log("fromlist", { BoardId, inputValue });
    dispatch(addList({ id: BoardId, name: inputValue }));
    closeModal();
    Toast.show({
      type: "success",
      text1: "Hello! 👋",
      text2: "New Board Created Successfully 🎉",
      position: "top",
    });
  };

  const handleCancel = () => {
    setInputValue("");
    closeModal();
  };

  function getRandomDarkColor() {
    const getDarkComponent = () => Math.floor(Math.random() * 128);
    const r = getDarkComponent();
    const g = getDarkComponent();
    const b = getDarkComponent();
    return `rgb(${r}, ${g}, ${b})`;
  }

  const renderItem = ({ item }) => {
    const randomColor = getRandomDarkColor();

    return (
      <Box
        className="p-4 m-2 rounded-lg shadow-2xl w-[35vh] h-32"
        style={{ backgroundColor: randomColor }}
      >
        <Box className="flex-row justify-between items-center">
          <Text className="text-white text-lg font-bold">{item.name}</Text>
          <Pressable onPress={() => handleDeletePress(item.id)}>
            <Icon as={TrashIcon} size="lg" className="text-white w-8 h-8" />
          </Pressable>
        </Box>
        <CardContent
          listid={item.id} // Pass item.id as listid
          listName={item.name} // Pass item.id as listid
        />
      </Box>

      // </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, margin: 0 }}>
      <HStack className="flex-1 p-4">
        <FlatList
          ref={flatListRef}
          data={lists}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={true}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={["black"]}
            />
          }
        />
      </HStack>
      <Box className="flex  bg-white">
        <Fab
          size="lg"
          placement="bottom right"
          isHovered={true}
          isDisabled={false}
          isPressed={true}
          className="flex flex-col justify-center items-center w-[200px]"
          onPress={openModal}
        >
          <HStack className="items-center space-x-1">
            <FabLabel>
              <Text className="text-white text-lg font-bold">Add Lists</Text>
            </FabLabel>
            <FabIcon as={AddIcon} />
          </HStack>
        </Fab>
      </Box>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View className="flex-1 bg-black/50 justify-center items-center">
              <Box
                className="p-4 h-[25vh] w-4/5 bg-white rounded-lg shadow-lg"
                onStartShouldSetResponder={() => true}
              >
                <Text className="text-lg font-bold mb-4 text-primary-700">
                  Enter List Name
                </Text>
                <VStack className="space-y-4">
                  <TextInput
                    style={{
                      padding: 10,
                      borderWidth: 1,
                      borderColor: "gray",
                      borderRadius: 8,
                      marginBottom: 20,
                      color: "black",
                    }}
                    placeholder="Enter the List name"
                    placeholderTextColor="gray"
                    value={inputValue}
                    onChangeText={setInputValue}
                  />
                  <HStack className="space-x-8">
                    <Button
                      className="bg-blue-400 text-white py-1 px-4 rounded-md"
                      onPress={handleOk}
                    >
                      <Text className="text-white font-bold">Add</Text>
                    </Button>
                    <Button
                      className="bg-red-400 text-white py-1 px-4 rounded-md"
                      onPress={handleCancel}
                    >
                      <Text className="text-white font-bold">Close</Text>
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
      <Toast />
    </SafeAreaView>
  );
};

export default ListsScreen;
