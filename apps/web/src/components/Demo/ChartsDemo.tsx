import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

// Mock data for different chart types
const syncActivityData = [
  { month: "Jan", spotify: 186, appleMusic: 150, youtubeMusic: 120, deezer: 80 },
  { month: "Feb", spotify: 305, appleMusic: 200, youtubeMusic: 180, deezer: 120 },
  { month: "Mar", spotify: 237, appleMusic: 180, youtubeMusic: 150, deezer: 100 },
  { month: "Apr", spotify: 273, appleMusic: 220, youtubeMusic: 190, deezer: 140 },
  { month: "May", spotify: 209, appleMusic: 170, youtubeMusic: 160, deezer: 110 },
  { month: "Jun", spotify: 314, appleMusic: 250, youtubeMusic: 200, deezer: 160 },
];

const genreDistributionData = [
  { genre: "Pop", count: 420, fill: "hsl(var(--chart-1))" },
  { genre: "Rock", count: 350, fill: "hsl(var(--chart-2))" },
  { genre: "Hip-Hop", count: 280, fill: "hsl(var(--chart-3))" },
  { genre: "Electronic", count: 200, fill: "hsl(var(--chart-4))" },
  { genre: "Jazz", count: 150, fill: "hsl(var(--chart-5))" },
  { genre: "Classical", count: 100, fill: "hsl(var(--chart-6))" },
];

const playlistGrowthData = [
  { date: "2024-07", playlists: 12 },
  { date: "2024-08", playlists: 15 },
  { date: "2024-09", playlists: 18 },
  { date: "2024-10", playlists: 22 },
  { date: "2024-11", playlists: 28 },
  { date: "2024-12", playlists: 35 },
  { date: "2025-01", playlists: 42 },
];

const serviceUsageData = [
  { service: "Spotify", usage: 65, color: "#1db954" },
  { service: "Apple Music", usage: 25, color: "#000000" },
  { service: "YouTube Music", usage: 8, color: "#ff0000" },
  { service: "Deezer", usage: 2, color: "#a238ff" },
];

// Chart configurations
const syncActivityConfig = {
  spotify: {
    label: "Spotify",
    color: "#1db954",
  },
  appleMusic: {
    label: "Apple Music",
    color: "#000000",
  },
  youtubeMusic: {
    label: "YouTube Music",
    color: "#ff0000",
  },
  deezer: {
    label: "Deezer",
    color: "#a238ff",
  },
} satisfies ChartConfig;

const genreConfig = {
  count: {
    label: "Track Count",
  },
} satisfies ChartConfig;

const playlistConfig = {
  playlists: {
    label: "Playlists",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ChartsDemo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Charts</h2>
      
      <Tabs defaultValue="sync-activity" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sync-activity">Sync Activity</TabsTrigger>
          <TabsTrigger value="genres">Genre Distribution</TabsTrigger>
          <TabsTrigger value="growth">Playlist Growth</TabsTrigger>
          <TabsTrigger value="usage">Service Usage</TabsTrigger>
        </TabsList>
        
        {/* Sync Activity - Area Chart */}
        <TabsContent value="sync-activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sync Activity</CardTitle>
              <CardDescription>
                Number of tracks synced across different services over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={syncActivityConfig}>
                <AreaChart
                  accessibilityLayer
                  data={syncActivityData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="spotify"
                    type="natural"
                    fill="var(--color-spotify)"
                    fillOpacity={0.4}
                    stroke="var(--color-spotify)"
                    stackId="a"
                  />
                  <Area
                    dataKey="appleMusic"
                    type="natural"
                    fill="var(--color-appleMusic)"
                    fillOpacity={0.4}
                    stroke="var(--color-appleMusic)"
                    stackId="a"
                  />
                  <Area
                    dataKey="youtubeMusic"
                    type="natural"
                    fill="var(--color-youtubeMusic)"
                    fillOpacity={0.4}
                    stroke="var(--color-youtubeMusic)"
                    stackId="a"
                  />
                  <Area
                    dataKey="deezer"
                    type="natural"
                    fill="var(--color-deezer)"
                    fillOpacity={0.4}
                    stroke="var(--color-deezer)"
                    stackId="a"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Genre Distribution - Pie Chart */}
        <TabsContent value="genres" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Music Genre Distribution</CardTitle>
              <CardDescription>
                Breakdown of your music library by genre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={genreConfig}>
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={genreDistributionData}
                    dataKey="count"
                    nameKey="genre"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    {genreDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartLegend
                    content={<ChartLegendContent nameKey="genre" />}
                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Playlist Growth - Line Chart */}
        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Playlist Growth Over Time</CardTitle>
              <CardDescription>
                Total number of playlists created over the past 7 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={playlistConfig}>
                <LineChart
                  accessibilityLayer
                  data={playlistGrowthData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(5)} // Show only month-year
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="playlists"
                    type="monotone"
                    stroke="var(--color-playlists)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--color-playlists)",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Usage - Bar Chart */}
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Usage Distribution</CardTitle>
              <CardDescription>
                Percentage of listening time across different music services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={genreConfig}>
                <BarChart
                  accessibilityLayer
                  data={serviceUsageData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="service"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    domain={[0, 100]}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="usage" radius={[4, 4, 0, 0]}>
                    {serviceUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
