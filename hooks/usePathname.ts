import { usePathname as useExpoPathname } from "expo-router";

const usePathname = () => {
  const pathname = useExpoPathname();

  const [, path, slug] = pathname.split("/");
  return {
    path,
    slug,
  };
};

export default usePathname;
