declare module "@/components/location-links" {
  import { ReactNode } from "react";
  
  interface LocationLinksProps {
    children?: ReactNode;
  }

  const LocationLinks: React.FC<LocationLinksProps>;
  export default LocationLinks;
}