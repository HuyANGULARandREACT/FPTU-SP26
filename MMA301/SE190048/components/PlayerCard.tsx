import {
  isFavorite as checkIsFavorite,
  toggleFavorite,
} from "@/services/favorite.service";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Box } from "./ui/box";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";

type Props = {
  data: any;
};
export default function PlayerCard({ data }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const loadFavoriteStatus = useCallback(async () => {
    const favoriteStatus = await checkIsFavorite(String(data.id));
    setIsFavorite(favoriteStatus);
  }, [data.id]);
  useEffect(() => {
    loadFavoriteStatus();
  }, [loadFavoriteStatus]);
  useFocusEffect(
    useCallback(() => {
      loadFavoriteStatus();
    }, [loadFavoriteStatus]),
  );
  const handleFavoritePress = async () => {
    const newStatus = await toggleFavorite(String(data.id));
    setIsFavorite(newStatus);
  };
  const handleImagePress = () => {
    router.push({
      pathname: "/player-detail",
      params: {
        id: String(data.id),
        playerName: data.playerName,
        image: data.image,
        position: data.position,
        team: data.team,
        YoB: String(data.YoB),
        MinutesPlayed: String(data.MinutesPlayed),
        PassingAccuracy: String(data.PassingAccuracy),
        isCaptain: String(data.isCaptain),
      },
    });
  };
  return (
    <Box className="px-1 mt-2">
      <Card
        className="relative w-full rounded-2xl overflow-hidden shadow-xl shadow-black/20"
        style={{ minHeight: 380 }}
      >
        {/* Gradient Background Layer */}
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0.9)",
            "rgba(255, 255, 255, 0.7)",
            "rgba(240, 240, 255, 0.8)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0"
        />

        {/* Glass Border Effect */}
        <View className="absolute inset-0 border-2 border-white/50 rounded-2xl" />

        {/* Captain Ribbon - Only shown when isCaptain is true */}
        {data.isCaptain && (
          <Box
            className="absolute top-0 left-0 z-10"
            style={{ width: 0, height: 0 }}
          >
            {/* Ribbon Triangle Background */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                borderTopWidth: 60,
                borderRightWidth: 60,
                borderTopColor: "#dc2626",
                borderRightColor: "transparent",
              }}
            />
            {/* Ribbon Content */}
            <Box
              className="absolute"
              style={{ top: 8, left: 8, transform: [{ rotate: "-45deg" }] }}
            >
              <Box className="flex-row items-center gap-1">
                <Ionicons name="star" size={14} color="#fff" />
              </Box>
            </Box>
          </Box>
        )}

        {/* Content Container */}
        <Box className="relative p-2.5 flex-1">
          {/* Top Actions Row */}
          <Box className="flex-row justify-end items-start mb-2">
            {/* Favorite Button */}
            <Pressable onPress={handleFavoritePress}>
              <Box className="w-8 h-8 rounded-full items-center justify-center bg-white/80 border border-white/60 shadow-md shadow-black/10">
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={16}
                  color={isFavorite ? "#ef4444" : "#64748b"}
                />
              </Box>
            </Pressable>
          </Box>

          {/* Player Image with Glow Effect */}
          <Box className="items-center mb-3">
            <Pressable onPress={handleImagePress}>
              <Box className="relative">
                {/* Image - No container, transparent background */}
                <Image
                  source={{ uri: data.image }}
                  className="w-20 h-20"
                  resizeMode="contain"
                  alt="player"
                  style={{ backgroundColor: "transparent" }}
                />
              </Box>
            </Pressable>
          </Box>

          {/* Player Name */}
          <Box className="items-center mb-2">
            <Heading
              size="md"
              className="text-gray-900 font-bold text-center mb-1"
            >
              {data.playerName}
            </Heading>

            {/* Position Badge */}
            <Box className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 rounded-full border border-blue-300/40">
              <Text className="text-blue-900 text-xs font-bold tracking-wide">
                {data.position}
              </Text>
            </Box>
          </Box>

          {/* Stats Grid */}
          <Box className="bg-white/40 rounded-xl p-2.5 border border-white/50 mb-2">
            <Box className="flex-row justify-around">
              {/* Age Stat */}
              <Box className="items-center flex-1">
                <Box className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 items-center justify-center mb-1 border border-blue-300/30">
                  <Ionicons name="calendar-outline" size={14} color="#3b82f6" />
                </Box>
                <Text className="text-lg font-bold text-gray-900">
                  {2026 - data.YoB}
                </Text>
                <Text className="text-[10px] text-gray-500 font-medium">
                  Age
                </Text>
              </Box>

              {/* Divider */}
              <Box className="w-px bg-white/60 mx-2" />

              {/* Minutes Stat */}
              <Box className="items-center flex-1">
                <Box className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 items-center justify-center mb-1 border border-green-300/30">
                  <Ionicons name="time-outline" size={14} color="#10b981" />
                </Box>
                <Text className="text-lg font-bold text-gray-900">
                  {data.MinutesPlayed}
                </Text>
                <Text className="text-[10px] text-gray-500 font-medium">
                  Minutes
                </Text>
              </Box>
            </Box>
          </Box>

          {/* Team Info */}
          <Box className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-2 border border-purple-300/30">
            <Box className="flex-row items-center justify-center gap-1.5">
              <Ionicons name="shield-outline" size={14} color="#9333ea" />
              <Text className="text-purple-900 font-semibold text-xs">
                {data.team}
              </Text>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
