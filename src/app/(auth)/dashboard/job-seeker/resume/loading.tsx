import SkeletonPlaceholder from '@/components/common/SkeletonPlaceholder';

export default async function Loading() {
  return (
    <>
      <SkeletonPlaceholder variant='card' rows={5} columns={1} />
    </>
  );
}
