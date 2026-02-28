import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";

import {
  isFavorite as checkIsFavorite,
  toggleFavorite,
} from "@/services/favorite.service";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {  Pressable, ScrollView, Text, View } from "react-native";

export default function PlayerDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  // Parse player data from params
  const player = {
    id: params.id as string,
    playerName: params.playerName as string,
    image: params.image as string,
    position: params.position as string,
    team: params.team as string,
    YoB: Number(params.YoB),
    MinutesPlayed: Number(params.MinutesPlayed),
    PassingAccuracy: Number(params.PassingAccuracy),
    isCaptain: params.isCaptain === "true",
  };

  // Load favorite status
  useEffect(() => {
    const loadFavoriteStatus = async () => {
      const favoriteStatus = await checkIsFavorite(player.id);
      setIsFavorite(favoriteStatus);
    };
    loadFavoriteStatus();
  }, [player.id]);

  // Handle favorite toggle
  const handleFavoritePress = async () => {
    const newStatus = await toggleFavorite(player.id);
    setIsFavorite(newStatus);
  };

  const age = new Date().getFullYear() - player.YoB;

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with Back Button */}
      <LinearGradient
        colors={["#3b82f6", "#2563eb", "#1d4ed8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-6 pb-6 px-4"
      >
        <Box className="flex-row items-center justify-between mb-4">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>

          <Pressable
            onPress={handleFavoritePress}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "#ef4444" : "#fff"}
            />
          </Pressable>
        </Box>

        {/* Player Name and Position */}
        <Box className="items-center">
          <Heading size="2xl" className="text-white font-bold text-center mb-1">
            {player.playerName}
          </Heading>
          <Box className="flex-row items-center gap-2">
            <Box className="bg-white/20 px-4 py-1.5 rounded-full">
              <Text className="text-white text-sm font-bold">
                {player.position}
              </Text>
            </Box>
            {player.isCaptain && (
              <Box className="bg-yellow-400/90 px-3 py-1.5 rounded-full flex-row items-center gap-1">
                <Ionicons name="star" size={14} color="#fff" />
                <Text className="text-white text-xs font-bold">CAPTAIN</Text>
              </Box>
            )}
          </Box>
        </Box>
      </LinearGradient>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Player Image */}
        <Box className="items-center -mt-26 mb-4">
          <Box className="relative">
            {/* Image container */}
            <Box className="relative bg-white rounded-full p-6 shadow-2xl shadow-black/20 border-8 border-white">
              <Image
                source={{ uri: player.image }}
                className="w-40 h-40"
                resizeMode="contain"
                alt={player.playerName}
                style={{ backgroundColor: "transparent" }}
              />
            </Box>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Box className="px-4 pb-6">
          {/* Team Info and Age Row */}
          <Box className="flex-row gap-2 mb-2">
            {/* Team Info Card */}
            <Box className="flex-1 bg-white rounded-xl p-2 shadow-lg shadow-black/5">
              <Box className="flex-row items-center gap-2">
                <Box className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 items-center justify-center">
                  <Ionicons name="shield-outline" size={16} color="#9333ea" />
                </Box>
                <Box className="flex-1">
                  <Text className="text-gray-500 text-[10px] font-medium">
                    Team
                  </Text>
                  <Heading size="sm" className="text-gray-900 font-bold">
                    {player.team}
                  </Heading>
                </Box>
              </Box>
            </Box>

            {/* Age */}
            <Box className="flex-1 bg-white rounded-xl p-2 shadow-lg shadow-black/5">
              <Box className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 items-center justify-center mb-1">
                <Ionicons name="calendar-outline" size={16} color="#3b82f6" />
              </Box>
              <Text className="text-gray-500 text-[10px] font-medium">Age</Text>
              <Heading size="md" className="text-gray-900 font-bold">
                {age}
              </Heading>
              <Text className="text-gray-400 text-[10px]">years old</Text>
            </Box>
          </Box>

          {/* Passing Accuracy and Minutes Row */}
          <Box className="flex-row gap-2 mb-2">
            {/* Passing Accuracy Card */}
            <Box className="flex-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-2 shadow-xl shadow-blue-500/30">
              <Box className="w-8 h-8 rounded-full bg-white/20 items-center justify-center mb-1">
                <Ionicons name="football-outline" size={16} color="#fff" />
              </Box>
              <Text className="text-blue-500/80 text-[10px] font-medium">
                Passing
              </Text>
              <Heading size="md" className="text-blue-500 font-bold">
                {player.PassingAccuracy * 100}%
              </Heading>

              {/* Progress Bar */}
              <Box className="bg-blue-500/20 rounded-full h-1.5 overflow-hidden mt-1">
                <Box
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${player.PassingAccuracy * 100}%` }}
                />
              </Box>
            </Box>

            {/* Minutes Played */}
            <Box className="flex-1 bg-white rounded-xl p-2 shadow-lg shadow-black/5">
              <Box className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 items-center justify-center mb-1">
                <Ionicons name="time-outline" size={16} color="#10b981" />
              </Box>
              <Text className="text-gray-500 text-[10px] font-medium">
                Minutes
              </Text>
              <Heading size="md" className="text-gray-900 font-bold">
                {player.MinutesPlayed}
              </Heading>
              <Text className="text-gray-400 text-[10px]">played</Text>
            </Box>
          </Box>

          {/* Player Info Summary */}
          <Box className="bg-white rounded-2xl p-4 mt-4 shadow-lg shadow-black/5">
            <Heading size="md" className="text-gray-900 font-bold mb-3">
              Player Information
            </Heading>

            <Box className="space-y-3">
              <Box className="flex-row justify-between py-2 border-b border-gray-100">
                <Text className="text-gray-500 font-medium">Full Name</Text>
                <Text className="text-gray-900 font-bold">
                  {player.playerName}
                </Text>
              </Box>

              <Box className="flex-row justify-between py-2 border-b border-gray-100">
                <Text className="text-gray-500 font-medium">Position</Text>
                <Text className="text-gray-900 font-bold">
                  {player.position}
                </Text>
              </Box>

              <Box className="flex-row justify-between py-2 border-b border-gray-100">
                <Text className="text-gray-500 font-medium">Year of Birth</Text>
                <Text className="text-gray-900 font-bold">{player.YoB}</Text>
              </Box>

              <Box className="flex-row justify-between py-2">
                <Text className="text-gray-500 font-medium">
                  Captain Status
                </Text>
                <Box className="flex-row items-center gap-1">
                  {player.isCaptain ? (
                    <>
                      <Ionicons name="star" size={16} color="#eab308" />
                      <Text className="text-yellow-600 font-bold">Captain</Text>
                    </>
                  ) : (
                    <Text className="text-gray-400 font-medium">Player</Text>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </View>
  );
}
