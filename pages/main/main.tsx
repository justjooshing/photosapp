import Container from "./components/container";
import States from "./states/states";

import { useGetImages } from "@/server/images/queries";
import useHideSplashScreen from "@/hooks/useHideSplashScreen";

const Images = () => {
  const images = useGetImages();
  useHideSplashScreen({ loaded: !!images.data || images.isError });

  return (
    <Container>
      <States />
    </Container>
  );
};

export default Images;
