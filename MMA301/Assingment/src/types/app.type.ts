// Tab Navigator (Bottom Tabs)
export type RootTabParamList = {
  HomeStack: undefined;
  Favorite: undefined;
  About: undefined;
};

// Home Stack Navigator
export type HomeStackParamList = {
  Home: undefined;
  Detail: { handbagId: string }; // Truyền ID của handbag
};
