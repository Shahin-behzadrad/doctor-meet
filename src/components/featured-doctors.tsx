"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";
import Link from "next/link";
import { useDoctorsStore } from "@/store/doctors-store";

export default function FeaturedDoctors() {
  const { doctors, fetchFeaturedDoctors } = useDoctorsStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDoctors = async () => {
      await fetchFeaturedDoctors();
      setIsLoading(false);
    };

    loadDoctors();
  }, [fetchFeaturedDoctors]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-muted mb-4"></div>
                  <div className="h-6 w-32 bg-muted rounded mb-2"></div>
                  <div className="h-4 w-24 bg-muted rounded mb-4"></div>
                  <div className="flex justify-center mb-4">
                    <div className="h-4 w-24 bg-muted rounded"></div>
                  </div>
                  <div className="w-full h-4 bg-muted rounded mb-2"></div>
                  <div className="w-full h-4 bg-muted rounded"></div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center p-6 pt-0">
                <div className="h-10 w-full bg-muted rounded"></div>
              </CardFooter>
            </Card>
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <Card key={doctor.id}>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <img
                src={doctor.image || "/placeholder.svg?height=100&width=100"}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{doctor.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {doctor.specialty}
              </p>

              <div className="flex items-center mb-4">
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

              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                <Clock className="h-4 w-4" />
                <span>Next available: {doctor.nextAvailable}</span>
              </div>

              <div className="flex flex-wrap gap-1 justify-center">
                {doctor.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center p-6 pt-0">
            <Button asChild className="w-full">
              <Link href={`/doctors/${doctor.id}`}>Book Appointment</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
