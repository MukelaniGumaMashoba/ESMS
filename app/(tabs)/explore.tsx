import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  SafeAreaProvider,
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "expo-router";

export default function ExploreScreen() {
  const [playing, setPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const router = useRouter();

  // Get educational videos
  const videos = useQuery(api.videos.getEducationalVideos) || [];
  const courses = useQuery(api.courses.getPublishedCourses) || [];

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
    setPlaying(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" translucent={false} />
        
        <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 10 }}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={24} color="#666" style={styles.searchIcon} />
            <TextInput
              placeholder="Search educational content..."
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={24} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Explore</Text>
            <Text style={styles.headerSubtitle}>Educational Content</Text>
          </View>

          {/* Courses Section */}
          {courses.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Featured Courses</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {courses.map((course) => (
                  <TouchableOpacity
                    key={course._id}
                    style={styles.courseCard}
                    onPress={() => router.push(`/course/${course._id}`)}
                  >
                    {course.thumbnail && (
                      <Image
                        source={{ uri: course.thumbnail }}
                        style={styles.courseThumbnail}
                      />
                    )}
                    <View style={[styles.courseColorBar, { backgroundColor: course.color }]} />
                    <Text style={styles.courseName} numberOfLines={2}>
                      {course.name}
                    </Text>
                    <Text style={styles.courseCategory}>{course.category}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Videos Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Educational Videos {filteredVideos.length > 0 && `(${filteredVideos.length})`}
            </Text>
            
            {filteredVideos.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="videocam-off-outline" size={64} color="#ccc" />
                <Text style={styles.emptyText}>
                  {searchQuery ? "No videos found" : "No educational videos available"}
                </Text>
              </View>
            ) : (
              filteredVideos.map((video) => (
                <View key={video._id} style={styles.videoCard}>
                  <View style={styles.videoHeader}>
                    {video.thumbnail ? (
                      <Image
                        source={{ uri: video.thumbnail }}
                        style={styles.videoThumbnail}
                      />
                    ) : (
                      <View style={[styles.videoThumbnail, styles.thumbnailPlaceholder]}>
                        <Ionicons name="play-circle" size={48} color="#666" />
                      </View>
                    )}
                    <View style={styles.videoInfo}>
                      <Text style={styles.videoTitle} numberOfLines={2}>
                        {video.title}
                      </Text>
                      {video.description && (
                        <Text style={styles.videoDescription} numberOfLines={2}>
                          {video.description}
                        </Text>
                      )}
                      <View style={styles.videoMeta}>
                        <Ionicons name="eye-outline" size={16} color="#666" />
                        <Text style={styles.videoMetaText}>{video.views} views</Text>
                        <Ionicons name="heart-outline" size={16} color="#666" style={{ marginLeft: 12 }} />
                        <Text style={styles.videoMetaText}>{video.likes} likes</Text>
                      </View>
                      {video.tags.length > 0 && (
                        <View style={styles.tagsContainer}>
                          {video.tags.slice(0, 3).map((tag, index) => (
                            <View key={index} style={styles.tag}>
                              <Text style={styles.tagText}>{tag}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>

                  {selectedVideo === video.youtubeVideoId && (
                    <View style={styles.playerContainer}>
                      <YoutubePlayer
                        height={200}
                        play={playing}
                        videoId={video.youtubeVideoId}
                        onChangeState={onStateChange}
                      />
                      <TouchableOpacity style={styles.playButton} onPress={togglePlaying}>
                        <Ionicons
                          name={playing ? "pause" : "play"}
                          size={24}
                          color="#fff"
                        />
                        <Text style={styles.playButtonText}>
                          {playing ? "Pause" : "Play"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.watchButton}
                    onPress={() => handleVideoSelect(video.youtubeVideoId)}
                  >
                    <Ionicons name="play-circle" size={20} color="#007BFF" />
                    <Text style={styles.watchButtonText}>
                      {selectedVideo === video.youtubeVideoId ? "Hide Video" : "Watch Video"}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#333",
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
    color: "#333",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#666",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Roboto-Bold",
    color: "#333",
    marginBottom: 16,
  },
  courseCard: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseThumbnail: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  courseColorBar: {
    height: 4,
    width: "100%",
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto-Bold",
    color: "#333",
    padding: 12,
    paddingBottom: 4,
  },
  courseCategory: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "#666",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  videoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  videoThumbnail: {
    width: 120,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
  },
  thumbnailPlaceholder: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto-Bold",
    color: "#333",
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: "#666",
    marginBottom: 8,
  },
  videoMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  videoMetaText: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "#666",
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  tag: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    fontFamily: "Roboto-Regular",
    color: "#1976d2",
  },
  playerContainer: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto-Bold",
    marginLeft: 8,
  },
  watchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007BFF",
  },
  watchButtonText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto-Bold",
    marginLeft: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#999",
    marginTop: 16,
  },
});
