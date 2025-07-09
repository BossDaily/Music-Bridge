import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ErrorBoundary from "../ErrorBoundary";

export function QuickActions() {
  return (
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
              <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-full lg:w-auto">
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
              <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-full lg:w-auto">
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
              <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-full lg:w-auto">
                Create Playlist
                {/* <Plus className="w-4 h-4 ml-2" /> */}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </ErrorBoundary>
  );
}
