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
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {services.map((service) => (
              <CarouselItem
                key={service.id}
                className="basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <div className="p-1 h-full">
                  <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group border hover:border-primary/50 h-full">
                    <CardContent className="p-4 lg:p-6">
                      <div className="text-center space-y-3 lg:space-y-4">
                        <div className="relative inline-block">
                          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-2xl lg:text-3xl mx-auto p-2 lg:p-3">
                            <img
                              src={service.logo}
                              alt={`${service.name} logo`}
                              className="w-full h-full dark:invert"
                            />
                          </div>
                          <div
                            className={`absolute -bottom-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 border-background ${getServiceStatusColor(
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
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </ErrorBoundary>
  );
}
