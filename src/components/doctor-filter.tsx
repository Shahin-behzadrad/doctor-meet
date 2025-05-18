"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Slider } from "@/src/components/ui/slider";
import { Checkbox } from "@/src/components/ui/checkbox";
import {@/src/components/ui/accordion
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDoctorsStore } from "@/src/store/doctors-store";

export function DoctorFilter() {
  const { filters, updateFilters } = useDoctorsStore();
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [experienceRange, setExperienceRange] = useState([0, 30]);

  const specialties = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Psychiatrist",
    "Orthopedic",
    "Gynecologist",
    "Ophthalmologist",
  ];

  const availabilities = [
    { id: "today", label: "Today" },
    { id: "tomorrow", label: "Tomorrow" },
    { id: "this-week", label: "This Week" },
    { id: "next-week", label: "Next Week" },
  ];

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    const currentSpecialties = filters.specialties || [];
    let newSpecialties;

    if (checked) {
      newSpecialties = [...currentSpecialties, specialty];
    } else {
      newSpecialties = currentSpecialties.filter((s) => s !== specialty);
    }

    updateFilters({ ...filters, specialties: newSpecialties });
  };

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    const currentAvailabilities = filters.availabilities || [];
    let newAvailabilities;

    if (checked) {
      newAvailabilities = [...currentAvailabilities, availability];
    } else {
      newAvailabilities = currentAvailabilities.filter(
        (a) => a !== availability
      );
    }

    updateFilters({ ...filters, availabilities: newAvailabilities });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    updateFilters({ ...filters, minPrice: value[0], maxPrice: value[1] });
  };

  const handleExperienceChange = (value: number[]) => {
    setExperienceRange(value);
    updateFilters({
      ...filters,
      minExperience: value[0],
      maxExperience: value[1],
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ ...filters, search: e.target.value });
  };

  const handleReset = () => {
    setPriceRange([0, 300]);
    setExperienceRange([0, 30]);
    updateFilters({
      search: "",
      specialties: [],
      availabilities: [],
      minPrice: 0,
      maxPrice: 300,
      minExperience: 0,
      maxExperience: 30,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Input
          type="search"
          placeholder="Search doctors..."
          value={filters.search || ""}
          onChange={handleSearchChange}
        />
      </div>

      <Accordion
        type="multiple"
        defaultValue={["specialty", "availability", "price", "experience"]}
      >
        <AccordionItem value="specialty">
          <AccordionTrigger>Specialty</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {specialties.map((specialty) => (
                <div key={specialty} className="flex items-center space-x-2">
                  <Checkbox
                    id={`specialty-${specialty}`}
                    checked={(filters.specialties || []).includes(specialty)}
                    onCheckedChange={(checked) =>
                      handleSpecialtyChange(specialty, checked as boolean)
                    }
                  />
                  <Label htmlFor={`specialty-${specialty}`}>{specialty}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {availabilities.map((availability) => (
                <div
                  key={availability.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`availability-${availability.id}`}
                    checked={(filters.availabilities || []).includes(
                      availability.id
                    )}
                    onCheckedChange={(checked) =>
                      handleAvailabilityChange(
                        availability.id,
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor={`availability-${availability.id}`}>
                    {availability.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 300]}
                value={priceRange}
                min={0}
                max={300}
                step={10}
                onValueChange={handlePriceChange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger>Experience</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 30]}
                value={experienceRange}
                min={0}
                max={30}
                step={1}
                onValueChange={handleExperienceChange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">{experienceRange[0]} years</span>
                <span className="text-sm">{experienceRange[1]} years</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button variant="outline" className="w-full" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  );
}
