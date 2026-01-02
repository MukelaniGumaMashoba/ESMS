import React from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "expo-router";

const categories = [
  { name: "Commerce", color: "#FEEA00" },
  { name: "Science", color: "#47e67c" },
  { name: "General", color: "lightblue" },
  { name: "Life Science", color: "#f7b320" },
];

export default function Courses() {
  const courses = useQuery(api.courses.getPublishedCourses) || [];
  const router = useRouter();

  const getCoursesByCategory = (category: string) => {
    return courses.filter((course: any) => course.category === category);
  };

  const handleCategoryPress = (category: string) => {
    // Navigate to course list for this category
    router.push({
      pathname: "/explore",
      params: { category },
    });
  };

  return (
    <View style={styles.container}>
      {categories.map((category, index) => {
        const categoryCourses = getCoursesByCategory(category.name);
        return (
          <TouchableOpacity
            key={index}
            style={[styles.categoryContainer, { backgroundColor: category.color }]}
            onPress={() => handleCategoryPress(category.name)}
          >
            <Text style={styles.topText}>{category.name}</Text>
            <Text style={styles.containerText}>
              {categoryCourses.length} {categoryCourses.length === 1 ? "Course" : "Courses"}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f5f7f5",
    borderRadius: 20,
    borderColor: "lightgrey",
    borderWidth: 1,
    gap: 10,
  },
  categoryContainer: {
    borderRadius: 20,
    padding: 15,
    margin: 5,
    width: "47%",
    minHeight: Dimensions.get("window").height / 6,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto-Bold",
    marginBottom: 8,
    color: "#333",
  },
  containerText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Roboto-Regular",
  },
});
