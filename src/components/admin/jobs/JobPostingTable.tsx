'use client';

import DataTable from '../table/DataTable';
import { JobPosting, columns } from './columns';

interface Props {
  data: JobPosting[];
}

export default function JobPostingTable({ data }: Props) {
  return <DataTable columns={columns} data={data} />;
}
