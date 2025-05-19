import { DoctorFilter } from "@/components/doctor-filter";
import DoctorList from "@/components/doctor-list";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DoctorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Doctors</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <DoctorFilter />
        </div>
        <div className="md:col-span-3">
          <Suspense fallback={<DoctorListSkeleton />}>
            <DoctorList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function DoctorListSkeleton() {
  return (
    <div className="space-y-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border rounded-lg">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
