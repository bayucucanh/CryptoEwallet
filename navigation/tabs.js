import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { setTradeModalVisibility } from "../stores/tab/tabActions";

import { Home, Portfolio, Market, Profile } from "../screens";
import { TabIcons } from "../components";
import { COLORS, icons } from "../constants";
import { useDispatch, useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const Tabs = () => {
  const dispatch = useDispatch();
  const isTradeModalVisible = useSelector(
    (state) => state.tabReducer.isTradeModalVisible
  );

  function tradeTabButtonOnClickHandler() {
    dispatch(setTradeModalVisibility(!isTradeModalVisible));
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 140,
          backgroundColor: COLORS.primary,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            if (isTradeModalVisible) {
              return (
                <TabIcons focused={focused} icon={icons.home} label="Home" />
              );
            }
          },
        }}
        listeners={{ 
            tabPress: e => {
                if (isTradeModalVisible === false) {
                    e.preventDefault()
                }
            }
         }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => {
            if (isTradeModalVisible) {
              return (
                <TabIcons
                  focused={focused}
                  icon={icons.briefcase}
                  label="Portfolio"
                />
              );
            }
          },
        }}
        listeners={{ 
            tabPress: e => {
                if (isTradeModalVisible === false) {
                    e.preventDefault()
                }
            }
         }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcons
                focused={focused}
                icon={isTradeModalVisible ? icons.trade : icons.close}
                iconStyle={isTradeModalVisible ? null : {
                    width: 15,
                    height: 15
                }}
                label="Trade"
                isTrade={true}
              />
            );
          },
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
              onPress={() => tradeTabButtonOnClickHandler()}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => {
            if (isTradeModalVisible) {
              return (
                <TabIcons
                  focused={focused}
                  icon={icons.market}
                  label="Market"
                />
              );
            }
          },
        }}
        listeners={{ 
            tabPress: e => {
                if (isTradeModalVisible === false) {
                    e.preventDefault()
                }
            }
         }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            if (isTradeModalVisible) {
              return (
                <TabIcons
                  focused={focused}
                  icon={icons.profile}
                  label="Profile"
                />
              );
            }
          },
        }}
        listeners={{ 
            tabPress: e => {
                if (isTradeModalVisible === false) {
                    e.preventDefault()
                }
            }
         }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
