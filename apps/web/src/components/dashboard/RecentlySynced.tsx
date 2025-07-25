import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ErrorBoundary from "../ErrorBoundary";

const getSyncStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20">Synced</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/20">Pending</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

export function RecentlySynced({ playlists }: { playlists: any[] }) {
  return (
    <ErrorBoundary>
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Recently Synced Playlists
          </h2>
          <p className="text-muted-foreground">
            Keep track of your latest playlist synchronizations
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
              {playlists.map((playlist) => (
                <CarouselItem
                  key={playlist.id}
                  className="pl-1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-2 h-full">
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group border hover:border-primary/50 h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-lg lg:text-xl flex-shrink-0">
                          {playlist.artwork}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-sm lg:text-base truncate group-hover:text-primary transition-colors">
                            {playlist.name}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            {getSyncStatusBadge(playlist.status)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground truncate">
                          {playlist.sources.map((source: string, index: number) => (
                            <React.Fragment key={`${playlist.id}-source-${index}`}>
                              {index > 0 && " • "}
                              {source}
                            </React.Fragment>
                          ))}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {playlist.lastSync}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-8" />
          <CarouselNext className="-right-8" />
        </Carousel>
        </div>
      </section>
    </ErrorBoundary>
  );
}
