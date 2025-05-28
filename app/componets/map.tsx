import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type MapProps = {
  lat?: number;
  lng?: number;
};

const Map: React.FC<MapProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const position = {
        lat: lat || 37.7749,
        lng: lng || -122.4194,
      };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 15,
        mapId: "MY_NEXTJS_MAP_ID",
      };

      new Map(mapRef.current as HTMLDivElement, mapOptions);
    };

    initMap();
  }, [lat, lng]);

  return <div ref={mapRef} style={{ width: "100%", height: "200px" }} />;
};

export default Map;
