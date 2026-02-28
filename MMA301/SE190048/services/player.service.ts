const baseUrl = process.env.EXPO_PUBLIC_API;
if (!baseUrl) {
  throw new Error("Missing Expo");
}
export async function fetchAPI() {
  const res = await fetch(baseUrl as string);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return await res.json();
}
export async function fetchTeams(): Promise<string[]> {
  const players = await fetchAPI();
  // Extract unique teams from players
  const teams = [
    ...new Set(players.map((player: any) => player.team)),
  ] as string[];
  return teams.filter(Boolean).sort(); // Remove null/undefined and sort alphabetically
}
