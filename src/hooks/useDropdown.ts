import { JOB_CATEGORIES } from '@/constants/jobCategories';
import { REGIONS } from '@/constants/region';
import { useState } from 'react';

type RegionKey = keyof typeof REGIONS;
type JobKey = keyof typeof JOB_CATEGORIES;

const useDropdown = () => {
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<RegionKey | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobKey | null>(null);

  return {
    isRegionOpen,
    setIsRegionOpen,
    isJobOpen,
    setIsJobOpen,
    isDetailOpen,
    setIsDetailOpen,
    selectedRegion,
    setSelectedRegion,
    selectedJob,
    setSelectedJob,
  };
};

export default useDropdown;
