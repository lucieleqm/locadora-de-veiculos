import {
  View,
  Dimensions,
  Image,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
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

const images: ImageItem[] = [
  {
    id: 1,
    url: "https://www.chevrolet.com.br/content/dam/chevrolet/mercosur/brazil/portuguese/index/cars/cars-subcontent/09-images/onix-plus-showroom-1920x960.jpg?imwidth=960",
  },
  {
    id: 2,
    url: "https://quatrorodas.abril.com.br/wp-content/uploads/2024/02/FiatMobiLikeMY245.jpg?quality=70&strip=info",
  },
  {
    id: 3,
    url: "https://www.yamaha-motor.com.br/ccstore/v1/images/?source=/file/v1561935453053965188/products/30095.3-4-urbano-fazer-fz-25-abs-30095-condicao-img-01-v021.png",
  },
];

const OnBoardingItem: React.FC<{ item: ImageItem }> = ({ item }) => {
  return <Image source={{ uri: item.url }} style={styles.image} />;
};

export function ImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

 // o useCallback melhora o desempenho do scroll  
  const onScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / width);
      setActiveIndex(index);
    },
    []
  );

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
