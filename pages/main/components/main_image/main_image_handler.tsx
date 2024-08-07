import { useRef } from "react";

import Container from "./components/container";
import States from "./states/states";

const MainImageHandler = () => {
  const containerWidthRef = useRef(0);
  return (
    <Container containerRef={containerWidthRef}>
      <States />
    </Container>
  );
};

export default MainImageHandler;
