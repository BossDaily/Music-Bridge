import React from "react";
// import {
//   Music,
//   Play,
//   Clock,
//   CheckCircle,
//   Shuffle,
//   RotateCcw,
//   Plus,
//   ExternalLink,
//   Headphones,
//   TrendingUp
// } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ErrorBoundary from "./ErrorBoundary";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Mock data - replace with real data from your API
const mockData = {
  user: {
    name: "BossDaily",
    totalPlaylists: 8,
    totalServices: 4,
  },
  recentlySync: [
    {
      id: 1,
      name: "Workout Bangers",
      artwork: "🏋️",
      sources: ["Spotify", "Apple Music"],
      lastSync: "5 minutes ago",
      status: "success",
    },
    {
      id: 2,
      name: "Chill Vibes",
      artwork: "🌊",
      sources: ["Spotify", "Deezer"],
      lastSync: "2 hours ago",
      status: "success",
    },
    {
      id: 3,
      name: "Rock Classics",
      artwork: "🎸",
      sources: ["Apple Music", "YouTube Music"],
      lastSync: "1 day ago",
      status: "success",
    },
    {
      id: 4,
      name: "Jazz Collection",
      artwork: "🎷",
      sources: ["Spotify", "Tidal"],
      lastSync: "3 days ago",
      status: "pending",
    },
    {
      id: 5,
      name: "Jazz Collezction",
      artwork: "🎷",
      sources: ["Spotify", "Tidal"],
      lastSync: "3 days ago",
      status: "pending",
    },
    {
      id: 6,
      name: "Jazz Colzlection",
      artwork: "🎷",
      sources: ["Spotify", "Tidal"],
      lastSync: "3 days ago",
      status: "pending",
    },
    {
      id: 7,
      name: "Jazz Collezction",
      artwork: "🎷",
      sources: ["Spotify", "Tidal"],
      lastSync: "3 days ago",
      status: "pending",
    },
    {
      id: 8,
      name: "Jazzz Collection",
      artwork: "🎷",
      sources: ["Spotify", "Tidal"],
      lastSync: "3 days ago",
      status: "pending",
    },
  ],
  connectedServices: [
    {
      id: 1,
      name: "Spotify",
      logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/spotify.svg",
      status: "connected",
      playlistCount: 12,
    },
    {
      id: 2,
      name: "Apple Music",
      logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/applemusic.svg",
      status: "connected",
      playlistCount: 8,
    },
    {
      id: 3,
      name: "YouTube Music",
      logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/youtubemusic.svg",
      status: "connected",
      playlistCount: 5,
    },
    {
      id: 4,
      name: "Deezer",
      logo: "/deezer2.svg", // Local path for simplicity
      status: "connected",
      playlistCount: 3,
    },
    {
      id: 5,
      name: "Tidal",
      logo: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tidal.svg",
      status: "disconnected",
      playlistCount: 0,
    },
    
  ],
};

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

const getSyncStatusBadge = (status: string) => {
  switch (status) {
    case "success":
      return (
        <Badge
          variant="secondary"
          className="bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20"
        >
          Synced
        </Badge>
      );
    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/20"
        >
          Pending
        </Badge>
      );
    case "error":
      return <Badge variant="destructive">Error</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export function DashboardHome() {
  // Debug logging to track rendering
  React.useEffect(() => {
    console.log("DashboardHome - Component mounted");
    console.log("DashboardHome - Mock data:", mockData);
  }, []);

  return (
    <div className="min-h-screen bg-background space-y-8 p-6">
      {/* Dynamic Welcome Banner */}
      <ErrorBoundary>
        <div className="w-full">
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 overflow-hidden">
            <CardHeader className="pb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground">
                    Welcome back, {mockData.user.name}! 👋
                  </CardTitle>
                  <CardDescription className="text-base lg:text-lg text-muted-foreground">
                    Now managing{" "}
                    <span className="font-semibold text-primary">
                      {mockData.user.totalPlaylists} global playlists
                    </span>{" "}
                    across{" "}
                    <span className="font-semibold text-primary">
                      {mockData.user.totalServices} services
                    </span>
                  </CardDescription>
                </div>
                <div className="flex gap-6 lg:gap-8">
                  <div className="text-center lg:text-right">
                    <p className="text-2xl lg:text-3xl font-bold text-primary">
                      {mockData.user.totalPlaylists}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Active Playlists
                    </p>
                  </div>
                  <div className="text-center lg:text-right">
                    <p className="text-2xl lg:text-3xl font-bold text-primary">
                      {mockData.user.totalServices}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Connected Services
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </ErrorBoundary>

      {/* Recently Synced Playlists */}
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
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-max"
          >
            <CarouselContent>
              {mockData.recentlySync.map((playlist) => (
                <CarouselItem
                  key={playlist.id}
                  className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-1 h-full">
                    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group border hover:border-primary/50 h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                            {playlist.artwork}
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base lg:text-lg truncate group-hover:text-primary transition-colors">
                              {playlist.name}
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-2">
                              {getSyncStatusBadge(playlist.status)}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-2">
                          {/* <Music className="w-4 h-4 text-muted-foreground flex-shrink-0" /> */}
                          <span className="text-sm text-muted-foreground truncate">
                            {playlist.sources.map((source, index) => (
                              <React.Fragment
                                key={`${playlist.id}-source-${index}`}
                              >
                                {index > 0 && " • "}
                                {source}
                              </React.Fragment>
                            ))}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {/* <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" /> */}
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
            <CarouselPrevious className="-left-9" />
            <CarouselNext className="-right-9" />
          </Carousel>
        </section>
      </ErrorBoundary>

      {/* Connected Music Services */}
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
              {mockData.connectedServices.map((service) => (
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

      {/* Quick Actions */}
      <ErrorBoundary>
        <section className="space-y-6 pb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Quick Actions
            </h2>
            <p className="text-muted-foreground">
              Frequently used tools and features
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-2 hover:border-primary/50">
              <CardContent className="p-6 lg:p-8 text-center">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  {/* <Shuffle className="w-7 h-7 lg:w-8 lg:h-8 text-blue-600" /> */}
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Initiate a Transfer
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground mb-4">
                  Move playlists between different music streaming services
                </p>
                <Button
                  variant="outline"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-full lg:w-auto"
                >
                  Start Transfer
                  {/* <ExternalLink className="w-4 h-4 ml-2" /> */}
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-2 hover:border-primary/50">
              <CardContent className="p-6 lg:p-8 text-center">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  {/* <RotateCcw className="w-7 h-7 lg:w-8 lg:h-8 text-green-600" /> */}
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Manage Syncs
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground mb-4">
                  Monitor and control your playlist synchronization settings
                </p>
                <Button
                  variant="outline"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-full lg:w-auto"
                >
                  Manage Syncs
                  {/* <ExternalLink className="w-4 h-4 ml-2" /> */}
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-2 hover:border-primary/50">
              <CardContent className="p-6 lg:p-8 text-center">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  {/* <Plus className="w-7 h-7 lg:w-8 lg:h-8 text-purple-600" /> */}
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Create New Global Playlist
                </h3>
                <p className="text-sm lg:text-base text-muted-foreground mb-4">
                  Build a new playlist that syncs across all your services
                </p>
                <Button
                  variant="outline"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-full lg:w-auto"
                >
                  Create Playlist
                  {/* <Plus className="w-4 h-4 ml-2" /> */}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </ErrorBoundary>
    </div>
  );
}
