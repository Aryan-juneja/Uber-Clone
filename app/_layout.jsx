import { Stack } from "expo-router";
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? '-64' : '0'}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="Map" />
          </Stack>
        </KeyboardAvoidingView>
      </Provider>
    </SafeAreaProvider>
  );
}
