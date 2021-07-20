import { RootState } from '@/store/types';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence<RootState>({
	storage: window.localStorage,
});

export default vuexLocal;
