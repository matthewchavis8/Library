"use client";

import { ArrowDownRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Carousel from "@/components/Carousel/Carousel";

const page = () => {
  return (
    <section className="relative w-full py-16 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              New Release
              <ArrowDownRight className="ml-2 size-4" />
            </Badge>
            <h1 className="my-6 text-pretty text-3xl sm:text-4xl font-bold lg:text-6xl">
              Welcome to Matt's Library
            </h1>
            <p className="mb-8 text-black max-w-xl lg:text-xl">
              Check out the Catalogue!
            </p>
          </div>
          <div className="w-full">
            <Carousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
