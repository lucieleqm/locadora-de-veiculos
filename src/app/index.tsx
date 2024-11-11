import { Redirect } from 'expo-router';
import React from 'react';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView>
      <Redirect href="/(drawer)/(tabs)/veiculos" />
    </SafeAreaView>
);
}