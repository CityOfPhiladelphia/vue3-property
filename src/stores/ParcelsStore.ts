import { defineStore } from 'pinia';
import { useGeocodeStore } from '@/stores/GeocodeStore.ts'
import axios from 'axios';

interface ParcelFeature {
  type: string,
  id: number,
  geometry: {
    type: string,
    coordinates: Array<number>,
  },
  properties: {
    PARCELID: number,
    ADDRESS: string,
    OWNER1: string,
    OWNER2: string,
    BRT_ID: string,
  }
}

interface ParcelData {
  type: string,
  features: Array<ParcelFeature>,
}

export const useParcelsStore = defineStore('ParcelsStore', {
  state: () => {
    return {
      pwdChecked: {
        type: 'FeatureCollection',
        features: [] as Array<ParcelFeature>,
      },
      pwd: {
        type: 'FeatureCollection',
        features: [] as Array<ParcelFeature>,
      },
    };
  },
  actions: {
    async fillPwdParcelData() {
      console.log('fillPwdParcelData is running');
      const GeocodeStore = useGeocodeStore();
      const AddressLoaded = GeocodeStore.aisData.features;
      if (!AddressLoaded) { return }
      const aisData = AddressLoaded[0];
      console.log('aisData:', aisData);
      const pwdParcelNumber = aisData.properties.pwd_parcel_id;
      if (!pwdParcelNumber) {
        if (import.meta.env.VITE_DEBUG == 'true') console.log('no pwd parcel in AIS')
        await this.checkParcelDataByLngLat(aisData.geometry.coordinates[0], aisData.geometry.coordinates[1], 'pwd');
        this.pwd = this.pwdChecked;
        return;
      }
      try {
        const response = await fetch(`https://services.arcgis.com/fLeGjb7u4uXqeF9q/ArcGIS/rest/services/PWD_PARCELS/FeatureServer/0/query?where=PARCELID=%27${pwdParcelNumber}%27&outSR=4326&f=geojson&outFields=*&returnGeometry=true`);
        if (response.ok) {
          let data = await response.json();
          let features: Array<ParcelFeature> = [];
          data.features.forEach((feature: any) => {
            features.push({
              type: feature.type,
              id: feature.id,
              geometry: feature.geometry,
              properties: {
                PARCELID: feature.properties.PARCELID,
                ADDRESS: feature.properties.ADDRESS,
                OWNER1: feature.properties.OWNER1,
                OWNER2: feature.properties.OWNER2,
                BRT_ID: feature.properties.BRT_ID,
              },
            })
          });

          const parcelData: ParcelData = {
            type: data.type,
            features,
          };

          this.pwd = parcelData;
        } else {
          if (import.meta.env.VITE_DEBUG == 'true') console.warn('fillPwdParcelData - await resolved but HTTP status was not successful');
        }
      } catch {
        if (import.meta.env.VITE_DEBUG == 'true') console.error('fillPwdParcelData - await never resolved, failed to fetch parcel data');
      }
    },

    async checkParcelDataByLngLat(lng: number, lat: number, parcelLayer: string) {
      if (import.meta.env.VITE_DEBUG == 'true') console.log('checkParcelDataByLngLat, lng:', lng, 'lat:', lat, 'parcelLayer:', parcelLayer);
      let ESRILayer = parcelLayer === 'pwd' ? 'PWD_PARCELS' : 'DOR_Parcel';
      let params = {
        'where': '1=1',
        'outSR': 4326,
        'f': 'geojson',
        'outFields': '*',
        'returnGeometry': true,
        'geometry': `{ "x": ${lng}, "y": ${lat}, "spatialReference":{ "wkid":4326 }}`,
        'geometryType': 'esriGeometryPoint',
        'spatialRel': 'esriSpatialRelWithin',
      };
      try {
        const response = await axios(`https://services.arcgis.com/fLeGjb7u4uXqeF9q/ArcGIS/rest/services/${ESRILayer}/FeatureServer/0/query`, { params });
        if (response.status !== 200) {
          if (import.meta.env.VITE_DEBUG == 'true') console.warn('checkParcelDataByLngLat - await resolved but HTTP status was not successful')
        }
        if (response.data.features.length > 0) {
          let data = await response.data;

          let features: Array<ParcelFeature> = [];
          data.features.forEach((feature: any) => {
            features.push({
              type: feature.type,
              id: feature.id,
              geometry: feature.geometry,
              properties: {
                PARCELID: feature.properties.PARCELID,
                ADDRESS: feature.properties.ADDRESS,
                OWNER1: feature.properties.OWNER1,
                OWNER2: feature.properties.OWNER2,
                BRT_ID: feature.properties.BRT_ID,
              },
            })
          });

          const parcelData: ParcelData = {
            type: data.type,
            features,
          };

          this.pwdChecked = parcelData;
        } else {
          // if (import.meta.env.VITE_DEBUG == 'true') console.log('in else, parcelLayer:', parcelLayer, '$config.parcelLayerForTopic[MainStore.currentTopic]:', $config.parcelLayerForTopic[MainStore.currentTopic]);
          this.pwdChecked = {
            type: 'FeatureCollection',
            features: [] as Array<ParcelFeature>,
          };
        }
      } catch {
        if (import.meta.env.VITE_DEBUG == 'true') console.error(`checkParcelDataByLngLat await never resolved, failed to fetch ${parcelLayer} parcel data by lng/lat`)
        this.pwdChecked = {
          type: 'FeatureCollection',
          features: [] as Array<ParcelFeature>,
        };
      }
    },

  },
})