"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAppointmentStore } from "@/src/store/appointment-store";
import { useUserStore } from "@/src/store/user-store";

export default function BookingForm({ doctorId }: { doctorId: string }) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const { createAppointment } = useAppointmentStore();
  const { user, isAuthenticated } = useUserStore();

  // Mock time slots
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to book an appointment",
        variant: "destructive",
      });
      router.push("/login?redirect=/doctors/" + doctorId);
      return;
    }

    if (!date || !timeSlot) {
      toast({
        title: "Incomplete booking",
        description: "Please select both date and time for your appointment",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const appointmentId = await createAppointment({
        doctorId,
        date: date.toISOString(),
        timeSlot,
        notes,
        userId: user?.id || "",
      });

      toast({
        title: "Appointment booked!",
        description: "Your appointment has been successfully scheduled",
      });

      router.push(`/appointments`);
    } catch (error) {
      toast({
        title: "Booking failed",
        description:
          "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Disable past dates
  const disabledDays = { before: new Date() };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Select Date</Label>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDays}
          className="border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <Label>Select Time</Label>
        <RadioGroup value={timeSlot} onValueChange={setTimeSlot}>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <div key={slot} className="flex items-center space-x-2">
                <RadioGroupItem value={slot} id={`time-${slot}`} />
                <Label htmlFor={`time-${slot}`}>{slot}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Describe your symptoms or reason for visit"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Booking..." : "Book Appointment"}
      </Button>
    </form>
  );
}
