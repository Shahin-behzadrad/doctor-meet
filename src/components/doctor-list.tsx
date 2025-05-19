"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Video, MapPin } from "lucide-react";
import Link from "next/link";
import { useDoctorsStore } from "@/store/doctors-store";

export default function DoctorList() {
  const { doctors, filters, fetchDoctors } = useDoctorsStore();

  useEffect(() => {
    fetchDoctors(filters);
  }, [fetchDoctors, filters]);

  if (doctors.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No doctors found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters to find more doctors.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {doctors.map((doctor) => (
        <Card key={doctor.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={doctor.image || "/placeholder.svg?height=120&width=120"}
                  alt={doctor.name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {doctor.specialty}
                    </p>
                  </div>
                  <div className="flex items-center mt-1 md:mt-0">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < doctor.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                        />
                      ))}
                    <span className="text-xs ml-1">
                      {doctor.rating} ({doctor.reviewCount})
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {doctor.bio}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{doctor.experience} Years Exp.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <span>Video Consultation</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{doctor.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {doctor.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {doctor.tags.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{doctor.tags.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="text-sm">
                    <p className="font-medium">Next Available</p>
                    <p className="text-muted-foreground">
                      {doctor.nextAvailable}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Consultation Fee</p>
                    <p className="text-muted-foreground">${doctor.fee}</p>
                  </div>
                  <div className="sm:ml-auto">
                    <Button asChild>
                      <Link href={`/doctors/${doctor.id}`}>
                        Book Appointment
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
