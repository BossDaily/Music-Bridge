import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export default function FormElements() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Form Elements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Fields</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-input">Text Input</Label>
              <Input id="text-input" placeholder="Enter text..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-input">Email Input</Label>
              <Input id="email-input" type="email" placeholder="user@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-input">Password Input</Label>
              <Input id="password-input" type="password" placeholder="••••••••" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Interactive Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox1" />
              <Label htmlFor="checkbox1">Enable auto-sync</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox2" />
              <Label htmlFor="checkbox2">High quality audio</Label>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="switch1">Dark mode</Label>
              <Switch id="switch1" />
            </div>
            <div className="space-y-2">
              <Label>Volume</Label>
              <Slider defaultValue={[75]} max={100} step={1} />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
