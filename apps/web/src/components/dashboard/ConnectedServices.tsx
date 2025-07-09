import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ErrorBoundary from "../ErrorBoundary";

const getServiceStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500 dark:bg-green-600";
      case "disconnected":
        return "bg-red-500 dark:bg-red-600";
      default:
        return "bg-gray-500 dark:bg-gray-600";
    }
  };

export function ConnectedServices({ services }: { services: any[] }) {
  return (
    <ErrorBoundary>
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Connected Music Services
          </h2>
          <p className="text-muted-foreground">
            Manage your music streaming platform connections
          </p>
        </div>
        <div className="relative overflow-hidden px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {services.map((service) => (
                <CarouselItem
                  key={service.id}
                  className="pl-1 basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="p-2 h-full">
                  <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group border hover:border-primary/50 h-full">
                    <CardContent className="p-3 lg:p-4">
                      <div className="text-center space-y-2 lg:space-y-3">
                        <div className="relative inline-block">
                          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-lg lg:text-xl mx-auto p-2">
                            <img
                              src={service.logo}
                              alt={`${service.name} logo`}
                              className="w-full h-full dark:invert"
                            />
                          </div>
                          <div
                            className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-background ${getServiceStatusColor(
                              service.status
                            )}`}
                          >
                            <span className="sr-only">Connected</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm lg:text-base text-foreground group-hover:text-primary transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-xs lg:text-sm text-muted-foreground capitalize">
                            {service.status}
                          </p>
                        </div>
                        {service.status === "connected" && (
                          <div className="bg-muted rounded-lg p-2">
                            <p className="text-sm font-medium text-foreground">
                              {service.playlistCount}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Playlists
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>            <CarouselPrevious className="-left-8" />
            <CarouselNext className="-right-8" />
          </Carousel>
        </div>
      </section>
    </ErrorBoundary>
  );
}
