import React from 'react';
import { 
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from './ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Music, 
  Play, 
  Users, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  Plus,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Shuffle,
  RotateCcw,
  Home,
  Settings,
  PanelLeft
} from 'lucide-react';
import { DashboardSidebar } from './DashboardSidebar';

// Mock data for the prototype
const mockPlaylists = [
  {
    id: 1,
    name: "Chill Vibes",
    artwork: "https://picsum.photos/200/200?random=1",
    services: ["spotify", "apple-music"],
    lastSync: "5 minutes ago",
    trackCount: 42
  },
  {
    id: 2,
    name: "Workout Mix",
    artwork: "https://picsum.photos/200/200?random=2", 
    services: ["spotify", "youtube-music", "soundcloud"],
    lastSync: "1 hour ago",
    trackCount: 28
  },
  {
    id: 3,
    name: "Study Focus",
    artwork: "https://picsum.photos/200/200?random=3",
    services: ["apple-music", "deezer"],
    lastSync: "3 hours ago",
    trackCount: 67
  },
  {
    id: 4,
    name: "Road Trip Classics",
    artwork: "https://picsum.photos/200/200?random=4",
    services: ["spotify", "tidal", "youtube-music"],
    lastSync: "1 day ago",
    trackCount: 89
  }
];

const mockServices = [
  {
    name: "Spotify",
    id: "spotify",
    connected: true,
    playlistCount: 15,
    color: "bg-green-500",
    icon: "🎵"
  },
  {
    name: "Apple Music", 
    id: "apple-music",
    connected: true,
    playlistCount: 8,
    color: "bg-gray-800",
    icon: "🍎"
  },
  {
    name: "YouTube Music",
    id: "youtube-music", 
    connected: true,
    playlistCount: 12,
    color: "bg-red-500",
    icon: "▶️"
  },
  {
    name: "SoundCloud",
    id: "soundcloud",
    connected: false,
    playlistCount: 0,
    color: "bg-orange-500",
    icon: "☁️"
  },
  {
    name: "Deezer",
    id: "deezer",
    connected: true,
    playlistCount: 5,
    color: "bg-purple-500",
    icon: "🎶"
  },
  {
    name: "Tidal",
    id: "tidal",
    connected: true,
    playlistCount: 3,
    color: "bg-blue-500",
    icon: "🌊"
  }
];

const ServiceIcon = ({ service }: { service: string }) => {
  const serviceMap: Record<string, string> = {
    "spotify": "🎵",
    "apple-music": "🍎", 
    "youtube-music": "▶️",
    "soundcloud": "☁️",
    "deezer": "🎶",
    "tidal": "🌊"
  };
  
  return <span className="text-sm">{serviceMap[service] || "🎵"}</span>;
};

// Navigation items for the sidebar
const navigationItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: TrendingUp,
    isActive: true,
  },
  {
    title: "Global Playlists",
    url: "#",
    icon: Music,
  },
  {
    title: "Sync Manager",
    url: "#",
    icon: RotateCcw,
  },
  {
    title: "Transfer Tool",
    url: "#",
    icon: Shuffle,
  },
  {
    title: "Connected Services",
    url: "#",
    icon: Users,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function Dashboard() {
  return (
    <SidebarProvider >
      <DashboardSidebar 
        navigationItems={navigationItems} 
        userName="BossDaily" 
        userEmail="boss@example.com"
      />
      
      {/* Main Content */}
      <SidebarInset > 
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              PROTOTYPE
            </Badge>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome back, BossDaily! 👋</h2>
            <p className="text-purple-100 text-lg">
              Now managing <span className="font-semibold">5 global playlists</span> across <span className="font-semibold">4 services</span>
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>All services synced</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Last sync: 5 min ago</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Playlists</p>
                    <p className="text-2xl font-bold text-gray-900">23</p>
                  </div>
                  <Music className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Connected Services</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                  <ExternalLink className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tracks</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                  </div>
                  <Play className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Sync Success</p>
                    <p className="text-2xl font-bold text-gray-900">98%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recently Synced Playlists */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-bold">Recently Synced Playlists</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPlaylists.map((playlist) => (
                      <div key={playlist.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <img 
                          src={playlist.artwork} 
                          alt={playlist.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{playlist.name}</h3>
                          <p className="text-sm text-gray-500">{playlist.trackCount} tracks</p>
                          <div className="flex items-center gap-2 mt-1">
                            {playlist.services.map((service) => (
                              <ServiceIcon key={service} service={service} />
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{playlist.lastSync}</p>
                          <Badge variant="secondary" className="mt-1">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Synced
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Connected Services & Quick Actions */}
            <div className="space-y-6">
              {/* Connected Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Connected Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockServices.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full ${service.color} flex items-center justify-center text-white`}>
                            {service.icon}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{service.name}</p>
                            <p className="text-sm text-gray-500">{service.playlistCount} playlists</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {service.connected ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" size="lg">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Global Playlist
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Shuffle className="mr-2 h-4 w-4" />
                    Transfer Playlists
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Manage Syncs
                  </Button>
                </CardContent>
              </Card>

              {/* Sync Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Sync Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Health</span>
                        <span>98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-green-600 font-medium">✓ 1,223 Successful</p>
                      </div>
                      <div>
                        <p className="text-red-600 font-medium">✗ 24 Failed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
