import { create } from 'zustand';
import { REGIONS } from '@/constants/region';

interface FilterState {
  selectedRegion: keyof typeof REGIONS | null;
  setSelectedRegion: (region: keyof typeof REGIONS | null) => void;

  selectedDistricts: string[];
  setSelectedDistricts: (districts: string[]) => void;
  toggleDistrict: (district: string) => void;

  selectedSubcategories: string[];
  setSelectedSubcategories: (subs: string[]) => void;
  toggleSubcategory: (sub: string) => void;

  selectedMethod: string[];
  setSelectedMethod: (methods: string[]) => void;
  toggleMethod: (method: string) => void;

  selectedCareer: string[];
  setSelectedCareer: (careers: string[]) => void;
  toggleCareer: (career: string) => void;

  selectedEducation: string[];
  setSelectedEducation: (educations: string[]) => void;
  toggleEducation: (education: string) => void;

  resetAll: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedRegion: null,
  setSelectedRegion: (region) => set({ selectedRegion: region }),

  selectedDistricts: [],
  setSelectedDistricts: (districts) => set({ selectedDistricts: districts }),
  toggleDistrict: (district) =>
    set((state) => ({
      selectedDistricts: state.selectedDistricts.includes(district)
        ? state.selectedDistricts.filter((d) => d !== district)
        : [...state.selectedDistricts, district],
    })),

  selectedSubcategories: [],
  setSelectedSubcategories: (subs) => set({ selectedSubcategories: subs }),
  toggleSubcategory: (sub) =>
    set((state) => ({
      selectedSubcategories: state.selectedSubcategories.includes(sub)
        ? state.selectedSubcategories.filter((s) => s !== sub)
        : [...state.selectedSubcategories, sub],
    })),

  selectedMethod: [],
  setSelectedMethod: (methods) => set({ selectedMethod: methods }),
  toggleMethod: (method) =>
    set((state) => ({
      selectedMethod: state.selectedMethod.includes(method)
        ? state.selectedMethod.filter((m) => m !== method)
        : [...state.selectedMethod, method],
    })),

  selectedCareer: [],
  setSelectedCareer: (careers) => set({ selectedCareer: careers }),
  toggleCareer: (career) =>
    set((state) => ({
      selectedCareer: state.selectedCareer.includes(career)
        ? state.selectedCareer.filter((c) => c !== career)
        : [...state.selectedCareer, career],
    })),

  selectedEducation: [],
  setSelectedEducation: (educations) => set({ selectedEducation: educations }),
  toggleEducation: (education) =>
    set((state) => ({
      selectedEducation: state.selectedEducation.includes(education)
        ? state.selectedEducation.filter((e) => e !== education)
        : [...state.selectedEducation, education],
    })),

  resetAll: () =>
    set({
      selectedRegion: null,
      selectedDistricts: [],
      selectedSubcategories: [],
      selectedMethod: [],
      selectedCareer: [],
      selectedEducation: [],
    }),
}));
