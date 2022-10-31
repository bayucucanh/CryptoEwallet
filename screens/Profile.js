import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { HeaderBar } from "../components";
import { COLORS, dummyData, FONTS, icons, SIZES } from "../constants";
import { MainLayout } from "./";

const SectionTitle = ({ title }) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
      }}
    >
      <Text style={{ color: COLORS.lightGray3, ...FONTS.h4 }}>{title}</Text>
    </View>
  );
};

const Setting = ({ title, value, type, onPress }) => {
  if (type == "button") {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>
          {title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginRight: SIZES.radius,
              color: COLORS.lightGray3,
              ...FONTS.h3,
            }}
          >
            {value}
          </Text>
          <Image
            source={icons.rightArrow}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={{ flexDirection: "row", height: 50, alignItems: "center" }}>
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>
          {title}
        </Text>
        <Switch value={value} onValueChange={(value) => onPress(value)} />
      </View>
    );
  }
};

const Profile = () => {
  const [faceId, setFaceId] = useState(true);

  return (
    <MainLayout>
      <StatusBar animated={true} backgroundColor={COLORS.black} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header */}
        <HeaderBar title="Profile" />

        {/* Details */}
        <ScrollView>
          {/* Email & User Id */}
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
            }}
          >
            {/* Email & ID */}
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                {dummyData.profile.email}
              </Text>
              <Text style={{ color: COLORS.lightGray, ...FONTS.body4 }}>
                {dummyData.profile.id}
              </Text>
            </View>

            {/* Status */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={icons.verified}
                style={{
                  height: 25,
                  width: 25,
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.base,
                  color: COLORS.lightGreen,
                  ...FONTS.body4,
                }}
              >
                Verified
              </Text>
            </View>
          </View>

          {/* APP */}
          <SectionTitle title="APP" />
          <Setting
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log("Pressed")}
          />

          <Setting
            title="Apparance"
            value="Dark"
            type="button"
            onPress={() => console.log("Pressed")}
          />

          <SectionTitle title="ACCOUNT" />

          <Setting
            title="Payment Currency"
            value="IDR"
            type="button"
            onPress={() => console.log("Pressed")}
          />

          <Setting
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log("Pressed")}
          />

          <SectionTitle title="SECCURITY" />

          <Setting
            title="FaceID"
            value={faceId}
            type="switch"
            onPress={(value) => setFaceId(value)}
          />

          <Setting
            title="Password Settings"
            value=""
            type="button"
            onPress={() => console.log("Pressed")}
          />

          <Setting
            title="Change Password"
            value=""
            type="button"
            onPress={() => console.log("Pressed")}
          />

          <Setting
            title="2-Factor Authentication"
            value=""
            type="button"
            onPress={() => console.log("Pressed")}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
