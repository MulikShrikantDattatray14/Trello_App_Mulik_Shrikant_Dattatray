import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  RefreshControl,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, addData, deleteData } from "@/redux/slice/BoardSlice";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack } from "@/components/ui/vstack";
import { FlatList } from "react-native";
import { Fab, FabLabel, FabIcon } from "@/components/ui/fab";
import { AddIcon, TrashIcon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { Button } from "@/components/ui/button";
import { Pressable } from "react-native";
import { Icon } from "@/components/ui/icon";

export default function BoardsScreen() {
  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.boards);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [inputValue, setInputValue] = useState("");

  let RemainingBoards = 10 - boards.length;

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setInputValue("");
  };

  const handleOk = () => {
    dispatch(addData(inputValue));
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

  const handleIconPress = (id) => {
    dispatch(deleteData(id));
    Toast.show({
      type: "success",
      text1: "Hello! 👋",
      text2: "Board Deleted Successfully 🎉",
      position: "top",
    });
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(fetchData());
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const renderItem = ({ item }) => {
    const randomColor = getRandomDarkColor();

    return (
      <Box
        className="p-4 m-2 rounded-lg shadow-2xl h-32"
        style={{ backgroundColor: randomColor }}
      >
        <Box className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-bold">
            {item.name.toUpperCase()}
          </Text>
          <Pressable onPress={() => handleIconPress(item.id)}>
            <Icon as={TrashIcon} size="xl" className="text-white w-10 h-10" />
          </Pressable>
        </Box>
      </Box>
    );
  };

  function getRandomDarkColor() {
    const getDarkComponent = () => Math.floor(Math.random() * 128);
    const r = getDarkComponent();
    const g = getDarkComponent();
    const b = getDarkComponent();
    return `rgb(${r}, ${g}, ${b})`;
  }

  return (
    <SafeAreaView style={{ flex: 1, margin: 0 }}>
      <VStack className="flex-1 p-1 bg-white">
        <FlatList
          data={boards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 8 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={["#6200ea"]}
            />
          }
        />
      </VStack>
      <Box className="flex  bg-white">
        <Fab
          size="lg"
          placement="bottom right"
          isHovered={true}
          isDisabled={RemainingBoards === 0}
          isPressed={true}
          className="flex flex-col justify-center items-center w-[200px]"
          onPress={openModal}
        >
          <HStack className="items-center space-x-1">
            <FabLabel>
              <Text className="text-white text-lg font-bold">Add Boards</Text>
            </FabLabel>
            <FabIcon as={AddIcon} />
          </HStack>
          <Box className="flex justify-center items-center">
            <Text className="text-white text-sm">{RemainingBoards} left</Text>
          </Box>
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
                  Enter Board Name
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
                    placeholder="Enter the board name"
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
}
