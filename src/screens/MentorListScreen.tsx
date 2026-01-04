import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import users from "../data/users.json";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import Header from "../components/Header";
import { styles } from "./MentorList.styles";
import colors from "../theme/colors";
import { FontAwesome } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "MentorList">;

export default function MentorListScreen({ navigation }: Props) {
  let mentors = users.filter((u) => u.role === "MENTOR");

  const renderMentor = ({ item }: any) => {
    const initial = item.name?.charAt(0).toUpperCase();

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("MentorDetails", {
            mentorId: item.user_id,
          })
        }
      >
        <View style={styles.cardleft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>

          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subject}>{"Computer Science"}</Text>
          </View>
        </View>

        <FontAwesome
          name="chevron-right"
          size={14}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <Header />

      <FlatList
        data={mentors}
        keyExtractor={(item) => item.user_id}
        renderItem={renderMentor}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<Text style={styles.title}>Mentors</Text>}
      />
    </View>
  );
}
