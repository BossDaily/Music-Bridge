import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorBoundary from "../ErrorBoundary";

export function WelcomeBanner({ user }: { user: { name: string, totalPlaylists: number, totalServices: number } }) {
  return (
    <ErrorBoundary>
      <div className="w-full">
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 overflow-hidden">
          <CardHeader className="pb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-foreground">
                  Welcome back, {user.name}! 👋
                </CardTitle>
                <CardDescription className="text-base lg:text-lg text-muted-foreground">
                  Now managing <span className="font-semibold text-primary">{user.totalPlaylists} global playlists</span> across <span className="font-semibold text-primary">{user.totalServices} services</span>
                </CardDescription>
              </div>
              <div className="flex gap-6 lg:gap-8">
                <div className="text-center lg:text-right">
                  <p className="text-2xl lg:text-3xl font-bold text-primary">{user.totalPlaylists}</p>
                  <p className="text-sm text-muted-foreground">Active Playlists</p>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-2xl lg:text-3xl font-bold text-primary">{user.totalServices}</p>
                  <p className="text-sm text-muted-foreground">Connected Services</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </ErrorBoundary>
  );
}
