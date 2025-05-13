import SkeletonPlaceholder from '@/components/common/SkeletonPlaceholder';

export default async function Loading() {
  return (
    <>
      <SkeletonPlaceholder variant='table' rows={1} columns={2} />
    </>
  );
}
