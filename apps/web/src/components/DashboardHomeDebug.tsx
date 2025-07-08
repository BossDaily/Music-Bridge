import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with real data from your API
const mockData = {
  user: {
    name: "BossDaily",
    totalPlaylists: 5,
    totalServices: 4
  },
  recentlySync: [
    {
      id: 1,
      name: "Workout Bangers",
      artwork: "🏋️",
      sources: ["Spotify", "Apple Music"],
      lastSync: "5 minutes ago",
      status: "success"
    },
    {
      id: 2,
      name: "Chill Vibes",
      artwork: "🌊",
      sources: ["Spotify", "Deezer"],
      lastSync: "2 hours ago",
      status: "success"
    },
    {
      id: 3,
      name: "Rock Classics",
      artwork: "🎸",
      sources: ["Apple Music", "YouTube Music"],
      lastSync: "1 day ago",
      status: "success"
    },
    {
      id: 4,
      name: "Jazz Collection",
      artwork: "🎷",
      sources: ["Spotify", "Tidal"],
      lastSync: "3 days ago",
      status: "pending"
    }
  ],
  connectedServices: [
    {
      id: 1,
      name: "Spotify",
      logo: "🎵",
      status: "connected",
      playlistCount: 12
    },
    {
      id: 2,
      name: "Apple Music",
      logo: "🍎",
      status: "connected",
      playlistCount: 8
    },
    {
      id: 3,
      name: "YouTube Music",
      logo: "📺",
      status: "connected",
      playlistCount: 5
    },
    {
      id: 4,
      name: "Deezer",
      logo: "🎧",
      status: "connected",
      playlistCount: 3
    },
    {
      id: 5,
      name: "Tidal",
      logo: "🌊",
      status: "disconnected",
      playlistCount: 0
    }
  ]
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
      return <Badge key="success" variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20">Synced</Badge>;
    case "pending":
      return <Badge key="pending" variant="outline" className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/20">Pending</Badge>;
    case "error":
      return <Badge key="error" variant="destructive">Error</Badge>;
    default:
      return <Badge key="unknown" variant="outline">Unknown</Badge>;
  }
};

export function DashboardHomeDebug() {
  console.log("DashboardHomeDebug rendering");
  console.log("Recent sync data:", mockData.recentlySync);
  console.log("Connected services data:", mockData.connectedServices);

  return (
    <div className="min-h-screen bg-background space-y-8 p-6">
      {/* Dynamic Welcome Banner */}
      <div className="w-full">
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 overflow-hidden">
          <CardHeader className="pb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground">
                  Welcome back, {mockData.user.name}! 👋
                </CardTitle>
                <CardDescription className="text-base lg:text-lg text-muted-foreground">
                  Now managing <span className="font-semibold text-primary">{mockData.user.totalPlaylists} global playlists</span> across <span className="font-semibold text-primary">{mockData.user.totalServices} services</span>
                </CardDescription>
              </div>
              <div className="flex gap-6 lg:gap-8">
                <div className="text-center lg:text-right">
                  <p className="text-2xl lg:text-3xl font-bold text-primary">{mockData.user.totalPlaylists}</p>
                  <p className="text-sm text-muted-foreground">Active Playlists</p>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-2xl lg:text-3xl font-bold text-primary">{mockData.user.totalServices}</p>
                  <p className="text-sm text-muted-foreground">Connected Services</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Recently Synced Playlists */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Recently Synced Playlists</h2>
          <p className="text-muted-foreground">Keep track of your latest playlist synchronizations</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {mockData.recentlySync.map((playlist, index) => {
            console.log(`Rendering playlist ${index}:`, playlist);
            return (
              <Card key={`playlist-${playlist.id}`} className="hover:shadow-lg transition-all duration-200 cursor-pointer group border hover:border-primary/50">
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
                    <span className="text-sm text-muted-foreground truncate">
                      {playlist.sources.map((source, sourceIndex) => (
                        <React.Fragment key={`source-${playlist.id}-${sourceIndex}`}>
                          {sourceIndex > 0 && " • "}
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
            );
          })}
        </div>
      </section>

      {/* Connected Music Services */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Connected Music Services</h2>
          <p className="text-muted-foreground">Manage your music streaming platform connections</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mockData.connectedServices.map((service, index) => {
            console.log(`Rendering service ${index}:`, service);
            return (
              <Card key={`service-${service.id}`} className="hover:shadow-md transition-all duration-200 cursor-pointer group border hover:border-primary/50">
                <CardContent className="p-4 lg:p-6">
                  <div className="text-center space-y-3 lg:space-y-4">
                    <div className="relative inline-block">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-2xl lg:text-3xl mx-auto">
                        {service.logo}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 border-background ${getServiceStatusColor(service.status)}`}>
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
            );
          })}
        </div>
      </section>
    </div>
  );
}
