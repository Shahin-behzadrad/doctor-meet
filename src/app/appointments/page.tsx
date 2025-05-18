import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import AppointmentList from "@/src/components/appointment-list";
import { Suspense } from "react";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function AppointmentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Appointments</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Suspense fallback={<AppointmentSkeleton />}>
            <AppointmentList status="upcoming" />
          </Suspense>
        </TabsContent>
        <TabsContent value="completed">
          <Suspense fallback={<AppointmentSkeleton />}>
            <AppointmentList status="completed" />
          </Suspense>
        </TabsContent>
        <TabsContent value="cancelled">
          <Suspense fallback={<AppointmentSkeleton />}>
            <AppointmentList status="cancelled" />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AppointmentSkeleton() {
  return (
    <div className="space-y-4">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-4 pt-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
