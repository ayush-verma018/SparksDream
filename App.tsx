import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MentorListScreen from "./src/screens/MentorListScreen";
import MentorDetailsScreen from "./src/screens/MentorDetailsScreen";
import CreateBookingScreen from "./src/screens/CreateBookingScreen";
import BookingConfirmationScreen from "./src/screens/BookingConfirmationScreen";
import BookingsListScreen from "./src/screens/BookingsListScreen";
import RescheduleScreen from "./src/screens/RescheduleScreen";

export type RootStackParamList = {
  MentorList: undefined;
  MentorDetails: { mentorId: string };
  CreateBooking: {
    mentorId: string;
    date: string;
    slotStart: string;
    slotEnd: string;
  };
  BookingConfirmation: { bookingId: string };
  BookingsList: undefined;
  Reschedule: { bookingId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MentorList"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MentorList" component={MentorListScreen} />
        <Stack.Screen name="MentorDetails" component={MentorDetailsScreen} />
        <Stack.Screen name="CreateBooking" component={CreateBookingScreen} />
        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmationScreen}
        />
        <Stack.Screen name="BookingsList" component={BookingsListScreen} />
        <Stack.Screen name="Reschedule" component={RescheduleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
