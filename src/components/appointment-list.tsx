"use client";

import { useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Calendar, Clock, Video } from "lucide-react";
import Link from "next/link";
import { useAppointmentStore } from "@/src/store/appointment-store";
import { format } from "date-fns";

export default function AppointmentList({
  status,
}: {
  status: "upcoming" | "completed" | "cancelled";
}) {
  const { appointments, fetchAppointments, cancelAppointment } =
    useAppointmentStore();

  useEffect(() => {
    fetchAppointments(status);
  }, [fetchAppointments, status]);

  const filteredAppointments = appointments.filter(
    (app) => app.status === status
  );

  if (filteredAppointments.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No {status} appointments</h3>
        {status === "upcoming" && (
          <Button asChild className="mt-4">
            <Link href="/doctors">Find Doctors</Link>
          </Button>
        )}
      </div>
    );
  }

  const handleCancel = async (id: string) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      await cancelAppointment(id);
    }
  };

  return (
    <div className="space-y-4">
      {filteredAppointments.map((appointment) => (
        <Card key={appointment.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0">
                <img
                  src={
                    appointment.doctor.image ||
                    "/placeholder.svg?height=80&width=80"
                  }
                  alt={appointment.doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {appointment.doctor.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {appointment.doctor.specialty}
                    </p>
                  </div>
                  <Badge
                    className={`mt-1 md:mt-0 w-fit ${
                      status === "upcoming"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : status === "completed"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {status === "upcoming"
                      ? "Upcoming"
                      : status === "completed"
                        ? "Completed"
                        : "Cancelled"}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {format(new Date(appointment.date), "MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{appointment.timeSlot}</span>
                  </div>
                </div>

                {appointment.notes && (
                  <p className="text-sm text-muted-foreground mb-4 border-l-2 pl-2 italic">
                    {appointment.notes}
                  </p>
                )}
              </div>

              <div className="flex flex-row md:flex-col gap-2 justify-end">
                {status === "upcoming" && (
                  <>
                    <Button asChild>
                      <Link href={`/meeting/${appointment.id}`}>
                        <Video className="h-4 w-4 mr-2" />
                        Join
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleCancel(appointment.id)}
                    >
                      Cancel
                    </Button>
                  </>
                )}

                {status === "completed" && (
                  <Button variant="outline" asChild>
                    <Link href={`/doctors/${appointment.doctor.id}`}>
                      Book Again
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
