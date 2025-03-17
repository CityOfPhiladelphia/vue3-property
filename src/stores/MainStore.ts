import { defineStore, acceptHMRUpdate } from 'pinia';

export const useMainStore = defineStore("MainStore", {
  state: () => {
    return {
      addressSearchRunning: false as boolean,
      datafetchRunning: false as boolean,
      publicPath: null as string | null,
      isMobileDevice: null as boolean | null,
      isMac: null as boolean | null,
      lastSearchMethod: 'address' as string | null,
      addressSearchValue: null as string | null,
      lastClickCoords: [0,0] as Array<number>,
      currentParcelGeocodeParameter: null as string | null,
      otherParcelGeocodeParameter: null as string | null,
      currentParcelAddress:null as string | null,
      otherParcelAddress:null as string | null,
      currentAddress: null as string | null,
      currentLang: null as string | null,
      dataSourcesLoadedArray: [] as Array<string>,
      clickedRow: [] as Array<string>,
      clickedMarkerId: null as string | null,
      hoveredStateId: null as string | null,
      selectedParcelId: null as string | null,
      fullScreenMapEnabled: false as boolean,
      fullScreenTopicsEnabled: false as boolean,
      windowDimensions: {} as { width: number, height: number },
      // on election days, switch these two
      // currentTopic: 'property',
      // currentTopic: 'voting',
    };
  },

  actions: {
    setCurrentAddress(address: string | null) {
      this.currentAddress = address;
    },
    setCurrentParcelGeocodeParameter(value: string) {
      this.currentParcelGeocodeParameter = value;
    },
    setLastSearchMethod(searchMethod: string) {
      this.lastSearchMethod = searchMethod;
    },
    clearDataSourcesLoadedArray() {
      this.dataSourcesLoadedArray = [];
    },
    addToDataSourcesLoadedArray(data: string) {
      this.dataSourcesLoadedArray.push(data);
    },
  },
});

// this is from https://pinia.vuejs.org/cookbook/hot-module-replacement.html
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
};