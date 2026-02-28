import { Box } from "@/components/ui/box";
import { Pressable, ScrollView, Text } from "react-native";

type TeamFilterProps = {
  teams: string[];
  selectedTeam: string | null;
  onSelectTeam: (team: string | null) => void;
};

export default function TeamFilter({
  teams,
  selectedTeam,
  onSelectTeam,
}: TeamFilterProps) {
  return (
    <Box className="py-3 px-2 bg-white/50 border-b border-gray-200/50">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        {/* All Teams Button */}
        <Pressable onPress={() => onSelectTeam(null)} className="mr-2">
          <Box
            className={`px-4 py-2 rounded-full border ${
              selectedTeam === null
                ? "bg-blue-500 border-blue-600"
                : "bg-white/80 border-gray-300"
            }`}
          >
            <Text
              className={`text-sm font-bold ${
                selectedTeam === null ? "text-white" : "text-gray-700"
              }`}
            >
              All Teams
            </Text>
          </Box>
        </Pressable>

        {/* Team Buttons */}
        {teams.map((team) => (
          <Pressable
            key={team}
            onPress={() => onSelectTeam(team)}
            className="mr-2"
          >
            <Box
              className={`px-4 py-2 rounded-full border ${
                selectedTeam === team
                  ? "bg-blue-500 border-blue-600"
                  : "bg-white/80 border-gray-300"
              }`}
            >
              <Text
                className={`text-sm font-bold ${
                  selectedTeam === team ? "text-white" : "text-gray-700"
                }`}
              >
                {team}
              </Text>
            </Box>
          </Pressable>
        ))}
      </ScrollView>
    </Box>
  );
}
