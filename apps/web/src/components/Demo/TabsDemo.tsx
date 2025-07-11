import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

export function TabsDemo() {
	return (
		<Tabs defaultValue="account" className="w-full">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
				<TabsTrigger value="settings">Settings</TabsTrigger>
			</TabsList>
			<TabsContent value="account" className="space-y-4">
				<Card>
					<CardHeader>
						<CardTitle>Account Information</CardTitle>
						<CardDescription>Manage your account details here.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input id="username" placeholder="Enter your username" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="Enter your email" />
						</div>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="password" className="space-y-4">
				<Card>
					<CardHeader>
						<CardTitle>Password Settings</CardTitle>
						<CardDescription>Change your password here.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="current">Current Password</Label>
							<Input id="current" type="password" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="new">New Password</Label>
							<Input id="new" type="password" />
						</div>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="settings" className="space-y-4">
				<Card>
					<CardHeader>
						<CardTitle>Preferences</CardTitle>
						<CardDescription>Configure your application settings.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex items-center justify-between">
							<div>
								<Label htmlFor="notifications">Enable Notifications</Label>
								<p className="text-sm text-muted-foreground">Receive updates about sync status</p>
							</div>
							<Switch id="notifications" />
						</div>
						<div className="space-y-2">
							<Label>Sync Frequency</Label>
							<Slider defaultValue={[30]} max={120} step={10} className="w-full" />
							<p className="text-sm text-muted-foreground">Every 30 minutes</p>
						</div>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
