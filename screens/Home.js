import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import dummyData from "../constants/dummy";
import { getHoldings } from "../stores/market/marketAction";
import {MainLayout} from "./";

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHoldings(dummyData.holdings))
  }, [])
  
  
  return (
    <MainLayout>
      <View>
        <Text>Home</Text>
      </View>
    </MainLayout>
  );
};

export default Home;
