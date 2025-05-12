import { create } from 'zustand';

type MapStore = {
  map: naver.maps.Map | null;
  setMap: (map: naver.maps.Map | null) => void;
  marker: naver.maps.Marker | null;
  setMarker: (marker: naver.maps.Marker | null) => void;
  location: naver.maps.Point | null;
  setLocation: (location: naver.maps.Point | null) => void;
};

const useMapStore = create<MapStore>((set) => ({
  map: null,
  setMap: (map) => set({ map }),
  marker: null,
  setMarker: (marker) => set({ marker }),
  location: null,
  setLocation: (location) => set({ location }),
}));

export default useMapStore;
