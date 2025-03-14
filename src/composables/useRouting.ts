import { useMainStore } from '@/stores/MainStore';
import { useGeocodeStore } from '@/stores/GeocodeStore';
import { useParcelsStore } from '@/stores/ParcelsStore';

export default function useRouting() {
  const routeApp = (router, route) => {
    
    const MainStore = useMainStore();
    const GeocodeStore = useGeocodeStore();
    const ParcelsStore = useParcelsStore();
    let startQuery = { ...route.query };
    delete startQuery['address'];
    delete startQuery['lat'];
    delete startQuery['lng'];
    if (import.meta.env.VITE_DEBUG) console.log('routeApp, router:', router, 'route:', route, 'startQuery:', startQuery);
    if (MainStore.condoSearched) {
      console.log('searching condo');
      router.push({ name: 'home', query: { ...startQuery, address: MainStore.currentAddress } });
    } else if (MainStore.currentAddress) {
      if (import.meta.env.VITE_DEBUG) console.log('routeApp routing to address because MainStore has address');
      // router.push({ name: 'address', params: { address: MainStore.currentAddress }, query: { ...startQuery } });
      let p;
      if (Object.keys(GeocodeStore.aisData).length) {
        p = GeocodeStore.aisData.features[0].properties.opa_account_num;
      } else {
        p = ParcelsStore.pwd.features[0].properties.BRT_ID;
      }
      router.push({ name: 'home', query: { ...startQuery, p: p } });
    } else {
      if (import.meta.env.VITE_DEBUG) console.log('routeApp routing to not-found because no address or topic');
      MainStore.addressSearchRunning = false;
      router.push({ name: 'not-found', query: { ...startQuery } });
    }
  }
  return {
    routeApp
  }
}