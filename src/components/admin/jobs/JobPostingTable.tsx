'use client';

import { useRouter } from 'next/navigation';
import DataTable from '../table/DataTable';
import { JobPosting, getColumns } from './columns';

interface Props {
  data: JobPosting[];
}

export default function JobPostingTable({ data }: Props) {
  const router = useRouter();

  return <DataTable columns={getColumns(router)} data={data} />;
}
