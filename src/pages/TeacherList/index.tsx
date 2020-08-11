import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, Alert } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

import TeacherItem, { Teacher } from "../../components/TeacherItem";
import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isfiltersVisible, setIsfiltersVisible] = useState(true);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );

        setFavorites(favoritedTeachersIds);
      }
    });
  }
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  function handleToggleFiltersVisible() {
    setIsfiltersVisible(!isfiltersVisible);
  }
  async function handleFiltersSubmit() {
    loadFavorites();
    console.log({ subject, week_day, time });

    const response = await api.get(
      "/classes" +
        "?week_day='" +
        week_day +
        "'&&subject=" +
        subject +
        "&&time=" +
        time
    );

    console.log(response.data);

    setTeachers(response.data);
    setIsfiltersVisible(false);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <PageHeader
          title="Proffys Disponíveis"
          headerRight={
            <BorderlessButton
              style={styles.filterButton}
              onPress={handleToggleFiltersVisible}
            >
              <Text style={styles.filterButtonText}>Filtros </Text>
              <Feather name="filter" size={29} color={"#fff"} />
            </BorderlessButton>
          }
        >
          {isfiltersVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>Materia</Text>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={(text) => setSubject(text)}
                placeholder="Qual Materia?"
                placeholderTextColor="#c1bccc"
              />

              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da Semana</Text>
                  <TextInput
                    style={styles.input}
                    value={week_day}
                    onChangeText={(text) => setWeekDay(text)}
                    placeholder="Qual o dia?"
                    placeholderTextColor="#c1bccc"
                  />
                </View>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horario</Text>
                  <TextInput
                    style={styles.input}
                    value={time}
                    onChangeText={(text) => setTime(text)}
                    placeholder="Qual o Horario?"
                    placeholderTextColor="#c1bccc"
                  />
                </View>
              </View>
              <RectButton
                onPress={handleFiltersSubmit}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Buscar</Text>
              </RectButton>
            </View>
          )}
        </PageHeader>

        <ScrollView
          style={styles.teacherList}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        >
          {teachers.map((teacher: Teacher) => {
            return (
              <TeacherItem
                key={teacher.id}
                teacher={teacher}
                favorited={favorites.includes(teacher.id)}
              />
            );
          })}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
export default TeacherList;
