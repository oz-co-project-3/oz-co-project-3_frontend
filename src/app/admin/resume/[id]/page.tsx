import Resume from '@/components/resume/Resume';

interface Props {
  params: {
    id: string;
  };
}

export default async function ResumeDetailPage({ params }: Props) {
  const { id } = params;

  console.log('이력서 상세 ID:', id);

  return <Resume />;
}
