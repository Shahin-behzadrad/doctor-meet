import { Card, CardContent } from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Badge } from "@/src/components/ui/badge";
import { Star, Clock, Video, MapPin, CalendarIcon } from "lucide-react";
import BookingForm from "@/src/components/booking-form";

export default function DoctorProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Doctor profile"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-1">Dr. Sarah Johnson</h1>
                  <p className="text-lg text-muted-foreground mb-2">
                    Cardiologist
                  </p>

                  <div className="flex items-center gap-1 mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    <span className="text-sm ml-1">4.9 (120 reviews)</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">10+ Years Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Video Consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">New York, NY</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Available Today</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Heart Disease</Badge>
                    <Badge variant="secondary">Hypertension</Badge>
                    <Badge variant="secondary">Cardiac Surgery</Badge>
                    <Badge variant="secondary">ECG</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="about" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                About Dr. Sarah Johnson
              </h3>
              <p className="text-muted-foreground mb-4">
                Dr. Sarah Johnson is a board-certified cardiologist with over 10
                years of experience in treating various heart conditions. She
                specializes in preventive cardiology, heart failure management,
                and cardiac rehabilitation.
              </p>
              <p className="text-muted-foreground">
                Dr. Johnson completed her medical degree at Harvard Medical
                School, followed by a residency at Massachusetts General
                Hospital and a fellowship in cardiology at Johns Hopkins
                Hospital.
              </p>
            </TabsContent>
            <TabsContent value="experience" className="p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Chief Cardiologist</h4>
                  <p className="text-sm text-muted-foreground">
                    New York Heart Center • 2018 - Present
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Senior Cardiologist</h4>
                  <p className="text-sm text-muted-foreground">
                    Memorial Hospital • 2015 - 2018
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Cardiology Fellow</h4>
                  <p className="text-sm text-muted-foreground">
                    Johns Hopkins Hospital • 2012 - 2015
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-4">
              <div className="space-y-4">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="border-b pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {["JD", "MK", "RL"][i]}
                        </div>
                        <div>
                          <p className="font-medium">
                            {["John Doe", "Mary Kim", "Robert Lee"][i]}
                          </p>
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, j) => (
                                <Star
                                  key={j}
                                  className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {
                          [
                            "Dr. Johnson was very thorough and took the time to explain everything to me. Highly recommend!",
                            "Great experience with Dr. Johnson. She answered all my questions and made me feel at ease.",
                            "Dr. Johnson is knowledgeable and caring. The video consultation was convenient and effective.",
                          ][i]
                        }
                      </p>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
              <BookingForm doctorId={params.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
