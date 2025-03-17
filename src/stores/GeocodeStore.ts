import { defineStore } from 'pinia';

interface AisFeature {
  type: string,
  properties: {
    street_address: string,
    pwd_parcel_id: string,
    opa_account_num: string,
    opa_owners: Array<string>,
  },
  geometry: {
    type: string,
    coordinates: Array<number>,
  },
  ais_feature_type: string,
  match_type: string,
}

interface AisData {
  total_size: number,
  normalized: string,
  type: string,
  features: Array<AisFeature>,
}

export const useGeocodeStore = defineStore("GeocodeStore", {
  state: () => {
    return {
      aisDataChecked: {
        total_size: 0,
        normalized: '',
        type: 'FeatureCollection',
        features: [] as Array<AisFeature>,
      } as AisData,
      aisData: {
        total_size: 0,
        normalized: '',
        type: 'FeatureCollection',
        features: [] as Array<AisFeature>,
      } as AisData,
    };
  },

  actions: {
    async checkAisData(parameter: string) {
      try {
        if (import.meta.env.VITE_DEBUG == 'true') console.log('checkAisData is running, parameter:', parameter);
        const response = await fetch(`https://api.phila.gov/ais/v1/search/${encodeURIComponent(parameter)}?include_units=false`)
        if (response.ok) {
          if (import.meta.env.VITE_DEBUG == 'true') console.log('check AIS - await resolved and HTTP status is successful')
          this.aisDataChecked = await response.json()
        } else {
          if (import.meta.env.VITE_DEBUG == 'true') console.log('check AIS - await resolved but HTTP status was not successful')
          this.aisDataChecked = {}
        }
      } catch {
        if (import.meta.env.VITE_DEBUG == 'true') console.error('check AIS - await never resolved, failed to fetch address data')
      }
    },
    async fillAisData(address: string) {
      try {
        if (import.meta.env.VITE_DEBUG == 'true') console.log('Address - fillAisData is running, address:', address)
        const response = await fetch(`https://api.phila.gov/ais/v1/search/${encodeURIComponent(address)}?include_units=false`)
        if (response.ok) {
          if (import.meta.env.VITE_DEBUG == 'true') console.log('Address - await resolved and HTTP status is successful')
          const data = await response.json();

          let features: Array<AisFeature> = [];
          data.features.forEach((feature: any) => {
            features.push({
              type: feature.type,
              properties: {
                street_address: feature.properties.street_address,
                pwd_parcel_id: feature.properties.pwd_parcel_id,
                opa_account_num: feature.properties.opa_account_num,
                opa_owners: feature.properties.opa_owners
              },
              geometry: {
                type: feature.geometry.type,
                coordinates: feature.geometry.coordinates,
              },
              ais_feature_type: feature.ais_feature_type,
              match_type: feature.match_type,
            });
          });
          console.log('features:', features);

          const aisData: AisData = {
            total_size: data.total_size,
            normalized: data.normalized,
            type: data.type,
            features,
          };
          this.aisData = aisData;

        } else {
          if (import.meta.env.VITE_DEBUG == 'true') console.log('Address - await resolved but HTTP status was not successful')
          this.aisData = {
            total_size: 0,
            normalized: '',
            type: 'FeatureCollection',
            features: [] as Array<AisFeature>,
          } as AisData;
        }
      } catch {
        if (import.meta.env.VITE_DEBUG == 'true') console.error('Address - await never resolved, failed to fetch address data')
      }
    },
  },
  getters: {
  },

});