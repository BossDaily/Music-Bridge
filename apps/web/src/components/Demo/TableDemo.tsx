import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data based on the schema
const mockPlaylists = [
  {
    id: "pl001",
    name: "My Chill Vibes",
    service: "Spotify",
    trackCount: 45,
    lastSynced: "2025-01-10",
    syncStatus: "success" as const,
    accountUsername: "musiclover123",
  },
  {
    id: "pl002",
    name: "Workout Hits",
    service: "Apple Music",
    trackCount: 32,
    lastSynced: "2025-01-09",
    syncStatus: "pending" as const,
    accountUsername: "fitness_guru",
  },
  {
    id: "pl003",
    name: "Road Trip Mix",
    service: "YouTube Music",
    trackCount: 67,
    lastSynced: "2025-01-08",
    syncStatus: "failed" as const,
    accountUsername: "traveler2025",
  },
  {
    id: "pl004",
    name: "Jazz Classics",
    service: "Deezer",
    trackCount: 89,
    lastSynced: "2025-01-10",
    syncStatus: "success" as const,
    accountUsername: "jazz_enthusiast",
  },
  {
    id: "pl005",
    name: "Summer Hits 2024",
    service: "Spotify",
    trackCount: 124,
    lastSynced: "2025-01-07",
    syncStatus: "in_progress" as const,
    accountUsername: "summer_vibes",
  },
];

const mockTracks = [
  {
    id: "tr001",
    name: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    service: "Spotify",
    isrc: "USUG12000123",
    addedAt: "2025-01-10",
  },
  {
    id: "tr002",
    name: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: "2:54",
    service: "Apple Music",
    isrc: "USSM12001234",
    addedAt: "2025-01-09",
  },
  {
    id: "tr003",
    name: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    duration: "2:58",
    service: "YouTube Music",
    isrc: "USUM72112345",
    addedAt: "2025-01-08",
  },
  {
    id: "tr004",
    name: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    duration: "3:23",
    service: "Deezer",
    isrc: "GBAHT2000456",
    addedAt: "2025-01-07",
  },
  {
    id: "tr005",
    name: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    duration: "3:20",
    service: "Spotify",
    isrc: "USRCO2200567",
    addedAt: "2025-01-06",
  },
];

const mockConnectedAccounts = [
  {
    id: "ca001",
    service: "Spotify",
    username: "musiclover123",
    accountType: "Premium",
    connectedAt: "2024-12-15",
    status: "active" as const,
    playlistCount: 12,
  },
  {
    id: "ca002",
    service: "Apple Music",
    username: "fitness_guru",
    accountType: "Individual",
    connectedAt: "2024-12-20",
    status: "active" as const,
    playlistCount: 8,
  },
  {
    id: "ca003",
    service: "YouTube Music",
    username: "traveler2025",
    accountType: "Premium",
    connectedAt: "2025-01-01",
    status: "error" as const,
    playlistCount: 5,
  },
  {
    id: "ca004",
    service: "Deezer",
    username: "jazz_enthusiast",
    accountType: "HiFi",
    connectedAt: "2024-11-30",
    status: "active" as const,
    playlistCount: 15,
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "success":
      return <Badge variant="default" className="bg-green-500">Success</Badge>;
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "failed":
      return <Badge variant="destructive">Failed</Badge>;
    case "in_progress":
      return <Badge variant="outline" className="border-blue-500 text-blue-500">In Progress</Badge>;
    case "active":
      return <Badge variant="default" className="bg-green-500">Active</Badge>;
    case "error":
      return <Badge variant="destructive">Error</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function getServiceIcon(service: string) {
  const serviceLogos = {
    "Spotify": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/spotify.svg",
    "Apple Music": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/applemusic.svg",
    "YouTube Music": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/youtubemusic.svg",
    "Deezer": "/deezer2.svg",
    "Tidal": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tidal.svg",
  };
  
  const logo = serviceLogos[service as keyof typeof serviceLogos];
  
  if (logo) {
    return (
      <Avatar className="h-6 w-6">
        <AvatarImage 
          src={logo} 
          alt={service} 
          className="p-1 dark:invert dark:brightness-0 dark:contrast-100" 
        />
        <AvatarFallback className="text-xs">
          {service.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    );
  }
  
  return (
    <Avatar className="h-6 w-6">
      <AvatarFallback className="text-xs bg-gray-500 text-white">
        {service.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

function getServiceBadge(service: string) {
  const serviceColors = {
    "Spotify": "bg-green-500 hover:bg-green-600 text-white",
    "Apple Music": "bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900",
    "YouTube Music": "bg-red-500 hover:bg-red-600 text-white",
    "Deezer": "bg-purple-500 hover:bg-purple-600 text-white",
    "Tidal": "bg-blue-500 hover:bg-blue-600 text-white",
  };
  
  const colorClass = serviceColors[service as keyof typeof serviceColors] || "bg-gray-500 hover:bg-gray-600 text-white";
  
  return (
    <div className="flex items-center gap-2">
      {getServiceIcon(service)}
      <Badge className={colorClass}>
        {service}
      </Badge>
    </div>
  );
}

export default function TableDemo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Tables</h2>
      
      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="tracks">Tracks</TabsTrigger>
          <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="playlists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Playlists</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of your synced playlists across all platforms.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Playlist</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-center">Tracks</TableHead>
                    <TableHead>Last Synced</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPlaylists.map((playlist) => (
                    <TableRow key={playlist.id}>
                      <TableCell className="font-medium">{playlist.name}</TableCell>
                      <TableCell>
                        {getServiceBadge(playlist.service)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {playlist.accountUsername}
                      </TableCell>
                      <TableCell className="text-center">{playlist.trackCount}</TableCell>
                      <TableCell>{playlist.lastSynced}</TableCell>
                      <TableCell>{getStatusBadge(playlist.syncStatus)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Sync
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tracks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tracks</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Recently added tracks from all your connected services.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Track</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Album</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>ISRC</TableHead>
                    <TableHead className="text-right">Added</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTracks.map((track) => (
                    <TableRow key={track.id}>
                      <TableCell className="font-medium">{track.name}</TableCell>
                      <TableCell>{track.artist}</TableCell>
                      <TableCell className="text-muted-foreground">{track.album}</TableCell>
                      <TableCell>{track.duration}</TableCell>
                      <TableCell>
                        {getServiceBadge(track.service)}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{track.isrc}</TableCell>
                      <TableCell className="text-right">{track.addedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Your connected music streaming accounts.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Account Type</TableHead>
                    <TableHead className="text-center">Playlists</TableHead>
                    <TableHead>Connected</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockConnectedAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>
                        {getServiceBadge(account.service)}
                      </TableCell>
                      <TableCell>{account.username}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{account.accountType}</Badge>
                      </TableCell>
                      <TableCell className="text-center">{account.playlistCount}</TableCell>
                      <TableCell>{account.connectedAt}</TableCell>
                      <TableCell>{getStatusBadge(account.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
