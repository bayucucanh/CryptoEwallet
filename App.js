import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Tabs from "./navigation/tabs";
import { Persistor, Store } from "./stores/store";

const Stack = createStackNavigator();

// const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={"MainLayout"}
          >
            <Stack.Screen name="MainLayout" component={Tabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
