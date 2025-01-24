import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Pressable,
} from "react-native";
import { fetchAllCards } from "@/redux/slice/CardSlice";
import { useDispatch, useSelector } from "react-redux";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { AddIcon, TrashIcon } from "@/components/ui/icon";
import { Icon } from "@/components/ui/icon";

const CardContent = ({ listid, listName, onAction }) => {
  return <Box style={{ flex: 1, marginTop: 10 }}></Box>;
};

export default CardContent;
