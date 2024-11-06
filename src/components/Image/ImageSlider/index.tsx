import {
  View,
  Dimensions,
  Image,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
} from "react-native";
import { StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../../styles/theme";

const { width } = Dimensions.get("window");

interface ImageItem {
  id: number;
  url: string;
}

interface ImageSliderProps {
  images: ImageItem[];
}

const OnBoardingItem: React.FC<{ item: ImageItem }> = ({ item }) => {
  return <Image source={{ uri: item.url }} style={styles.image} />;
};

export function ImageSlider({ images }: ImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // o useCallback melhora o desempenho do scroll
  const onScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / width);
      setActiveIndex(index);
    },
    []
  );

  if (!images || images.length === 0) {
    return <Text>Nenhuma imagem disponível</Text>;
  }

  return (
    <SafeAreaView>
      <FlatList
        data={images}
        style={{ maxHeight: width }}
        pagingEnabled
        horizontal
        onMomentumScrollEnd={onScrollEnd}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <OnBoardingItem item={item} />}
      />
      {images.length > 1 ? (
        <View style={styles.dotsContainer}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i === activeIndex
                      ? theme.colors.gray[800]
                      : theme.colors.gray[300],
                },
              ]}
            />
          ))}
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width,
    height: width,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 1,
  },
});
