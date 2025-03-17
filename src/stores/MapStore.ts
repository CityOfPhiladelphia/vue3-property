import { defineStore, acceptHMRUpdate } from 'pinia';
import buffer from '@turf/buffer';
import { point } from '@turf/helpers';
import type { Feature, Polygon, MultiPolygon, GeoJsonProperties } from '@types/geojson';

export const useMapStore = defineStore("MapStore", {
  state: () => {
    return {
      map: {} as maplibregl.Map,
      currentMapStyle: 'pwdDrawnMapStyle' as string,
      currentAddressCoords: [],
      // currentTopicMapStyle: {},
      bufferForAddress: {},
      currentMarkersForTopic: [],
      addressMarker: null,
      addressParcel: null,
      initialized: false,
      draw: null,
      imageryOn: false,
      imagerySelected: '2023',
      cyclomediaOn: false,
      cyclomediaInitialized: false,
      cyclomediaRecordingsOn: false,
      cyclomediaCameraYaw: null as number | null,
      cyclomediaCameraHFov: null,
      cyclomediaCameraXyz: null as Array<number> | null,
      cyclomediaCameraLngLat: null as Array<number> | null,
      cyclomediaYear: null,
      clickedCyclomediaRecordingCoords: null,
      eagleviewOn: false,
      selectedRegmap: null,
      regmapOpacity: 0.5,
      zoningOpacity: 1,
      stormwaterOpacity: 1,
      labelLayers: [],
    };
  },
  actions: {
    setCyclomediaCameraYaw(yaw: number) {
      this.cyclomediaCameraYaw = yaw;
    },
    setCyclomediaCameraLngLat(lngLat: Array<number>, xyz: Array<number>) {
      this.cyclomediaCameraXyz = xyz;
      this.cyclomediaCameraLngLat = lngLat;
    },
    setMap(map: maplibregl.Map) {
      if (import.meta.env.VITE_DEBUG == 'true') console.log('MapStore.setMap is running, map:', map);
      this.map = map;
    },
    setMapStyle(style: string) {
      this.currentMapStyle = style;
    },
    async fillBufferForAddress(lng: number, lat: number) {
      let thePoint = point([lng, lat])
      let theBuffer: Feature<Polygon | MultiPolygon, GeoJsonProperties> | undefined = buffer(thePoint, 750, {units: 'feet'});
      if (import.meta.env.VITE_DEBUG == 'true') console.log('fillBufferForAddress is running, thePoint:', thePoint, 'theBuffer:', theBuffer, 'lng:', lng, 'lat:', lat);
      if (theBuffer) this.bufferForAddress = theBuffer.geometry.coordinates;
    }
  },
});

// this is from https://pinia.vuejs.org/cookbook/hot-module-replacement.html
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot))
};