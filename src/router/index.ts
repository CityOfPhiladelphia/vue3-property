import { createRouter, createWebHistory, type RouteComponent, type RouteLocation } from 'vue-router'
import Home from '../views/Home.vue'

import { useGeocodeStore } from '@/stores/GeocodeStore.ts'
import { useCondosStore } from '@/stores/CondosStore.ts'
import { useParcelsStore } from '@/stores/ParcelsStore.ts'
import { useMainStore } from '@/stores/MainStore.ts'

import useRouting from '@/composables/useRouting';
const { routeApp } = useRouting();

const getGeocodeAndPutInStore = async(address: string) => {
  const GeocodeStore = useGeocodeStore();
  const MainStore = useMainStore();
  await GeocodeStore.fillAisData(address);
  if (MainStore.lastSearchMethod == 'address' && !GeocodeStore.aisData.features) {
    MainStore.currentAddress = null;
    if (import.meta.env.VITE_DEBUG == 'true') console.log('getGeocodeAndPutInStore, calling not-found');
    // router.push({ name: 'not-found' });
    return;
  } else if (!GeocodeStore.aisData.features) {
    return;
  }
  let currentAddress = null;
  if (GeocodeStore.aisData.features[0].properties.street_address) {
    currentAddress = GeocodeStore.aisData.features[0].properties.street_address;
  }
  MainStore.setCurrentAddress(currentAddress);
  // MainStore.addressSearchRunning = false;
};


// this is called on every route change, including address searches, initial app load, and back button clicks
// when it is called, it may have some of the data it needs already in the store (after a geocode), or it may need to fetch everything (e.g. initial app load)
const dataFetch = async(to: RouteLocation, from: RouteLocation) => {
  if (import.meta.env.VITE_DEBUG == 'true') console.log('dataFetch is starting, to:', to, 'from:', from, 'to.params.address:', to.params.address, 'from.params.address:', from.params.address);
  const MainStore = useMainStore();
  MainStore.datafetchRunning = true;
  const GeocodeStore = useGeocodeStore();
  const ParcelsStore = useParcelsStore();
  // const dataSourcesLoadedArray = MainStore.dataSourcesLoadedArray;
  if (to.name === 'not-found') {
    MainStore.datafetchRunning = false;
    return;
  }

  let opaNum;
  if (to.query.p != "") opaNum = to.query.p;

  if (import.meta.env.VITE_DEBUG == 'true') console.log('to.params.address:', to.params.address, 'from.params.address:', from.params.address, 'GeocodeStore.aisData.normalized:', GeocodeStore.aisData.normalized);
  
  let routeAddressChanged;
  if (from.params.address) {
    routeAddressChanged = to.params.address.trim() !== from.params.address.trim();
  } else {
    routeAddressChanged = to.params.address !== from.params.address;
  }

  let routeOpaChanged = to.query.p !== from.query.p;
  if (import.meta.env.VITE_DEBUG == 'true') console.log('routeOpaChanged:', routeOpaChanged);

  // In the config, there is a list called "addressDoubles" of addresses we know of that are used by multiple properties.
  // An exception has to be made for them, in the case that someone clicks from one of them to the other.
  // if ($config.addressDoubles.includes(address) || routeOpaChanged) {
  if (routeOpaChanged && to.query.p) {
    // if there is no geocode or the geocode does not match the address in the route, get the geocode
    if (import.meta.env.VITE_DEBUG) console.log('GeocodeStore.aisData.normalized:', GeocodeStore.aisData.normalized);
    if (opaNum && !GeocodeStore.aisData.normalized || GeocodeStore.aisData.normalized && GeocodeStore.aisData.normalized !== opaNum) {
      if (import.meta.env.VITE_DEBUG == 'true') console.log('in datafetch, routeOpaChanged:', routeOpaChanged, 'right before geocode, GeocodeStore.aisData:', GeocodeStore.aisData);
      // await clearStoreData();
      await getGeocodeAndPutInStore(opaNum);
    }
    if (import.meta.env.VITE_DEBUG == 'true') console.log('in datafetch, after geocode, GeocodeStore.aisData:', GeocodeStore.aisData);

    // if this was NOT started by a map click, get the parcels
    if (MainStore.lastSearchMethod !== 'mapClick') {
      if (import.meta.env.VITE_DEBUG == 'true') console.log('dataFetch, inside if');
      await ParcelsStore.fillPwdParcelData();
    }
  } else if (routeAddressChanged && to.query.address) {
    // if there is no geocode or the geocode does not match the address in the route, get the geocode
    if (import.meta.env.VITE_DEBUG) console.log('GeocodeStore.aisData.normalized:', GeocodeStore.aisData.normalized);
    if (!GeocodeStore.aisData.normalized || GeocodeStore.aisData.normalized && GeocodeStore.aisData.normalized !== opaNum) {
      if (import.meta.env.VITE_DEBUG == 'true') console.log('in datafetch, routeOpaChanged:', routeOpaChanged, 'right before geocode, GeocodeStore.aisData:', GeocodeStore.aisData);
      // await clearStoreData();
      await getGeocodeAndPutInStore(to.query.address);
    }
    if (import.meta.env.VITE_DEBUG == 'true') console.log('in datafetch, after geocode, GeocodeStore.aisData:', GeocodeStore.aisData);

    // if this was NOT started by a map click, get the parcels
    if (MainStore.lastSearchMethod !== 'mapClick') {
      if (import.meta.env.VITE_DEBUG == 'true') console.log('dataFetch, inside if');
      await ParcelsStore.fillPwdParcelData();
    }
  }
  
  // check for condos
  // const CondosStore = useCondosStore();
  // CondosStore.loadingCondosData = true;
  // await CondosStore.fillCondoData(MainStore.currentAddress);
  // CondosStore.loadingCondosData = false;

  // const OpaStore = useOpaStore();
  // await OpaStore.fillOpaPublic();
  // await OpaStore.fillOpaAssessment();
  // await OpaStore.fillActiveSearchAssessmentHistory();
  // await OpaStore.fillActiveSearchSalesHistory();
  // if (import.meta.env.VITE_VERSION == 'cityatlas') {
  //   await OpaStore.fillAssessmentHistory();
  // }
  // OpaStore.loadingOpaData = false;

  // MainStore.lastSearchMethod = null;
  MainStore.datafetchRunning = false;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/search',
      name: 'search',
      component: Home,
      beforeEnter: async (to, from) => {
        const { address, lat, lng } = to.query;
        if (import.meta.env.VITE_DEBUG == 'true') console.log('search route beforeEnter, to.query:', to.query, 'from:', from, 'address:', address);
        const MainStore = useMainStore();
        const GeocodeStore = useGeocodeStore();
        const ParcelsStore = useParcelsStore();
        // MainStore.addressSearchRunning = true;
        if (MainStore.datafetchRunning) {
          return false;
        } else if (address && address !== '') {
          if (import.meta.env.VITE_DEBUG == 'true') console.log('search route beforeEnter, address:', address);
          MainStore.setLastSearchMethod('address');
          // await clearStoreData();
          await getGeocodeAndPutInStore(address);
          if (!GeocodeStore.aisData.features) {
            MainStore.currentTopic = null;
          }
          routeApp(router, to);
        } else if (lat && lng) {
          MainStore.setLastSearchMethod('mapClick');
          ParcelsStore.checkParcelDataByLngLat(lng, lat, 'pwd');
          // await getParcelsAndPutInStore(lng, lat);
          if (!Object.keys(ParcelsStore.pwdChecked).length && !Object.keys(ParcelsStore.dorChecked).length) {
            MainStore.addressSearchRunning = false;
            return false;
          }
          // await checkParcelInAis();
          routeApp(router, to);
        } else {
          return false;
        }
      },
    }
  ],
})

router.afterEach(async (to, from) => {
  if (import.meta.env.VITE_DEBUG == 'true') console.log('router afterEach to:', to, 'from:', from);
  const MainStore = useMainStore();
  if (to.query.lang !== from.query.lang) {
    MainStore.currentLang = to.query.lang;
  }
  if (to.name === 'address-or-topic') {
    return;
  } else if (to.name !== 'not-found' && to.name !== 'search') {
    MainStore.addressSearchRunning = false;
    await dataFetch(to, from);
  } else if (to.name == 'not-found') {
    MainStore.currentAddress = null;
    MainStore.currentParcelGeocodeParameter = null;
    MainStore.currentParcelAddress = null;
    MainStore.otherParcelAddress = null;
    MainStore.otherParcelGeocodeParameter = null;
  }
});

export default router
