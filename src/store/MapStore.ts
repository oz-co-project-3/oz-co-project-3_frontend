import { create } from 'zustand';

type MapStore = {
  location: naver.maps.Point | null;
  setLocation: (location: naver.maps.Point) => void;
};

const useMapStore = create<MapStore>((set) => ({
  location: null,
  setLocation: (location) => set({ location }),
}));

export default useMapStore;
