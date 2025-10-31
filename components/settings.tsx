"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export function Settings() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage admin portal settings</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" placeholder="Your business name" defaultValue="E-Commerce Store" />
              </div>
              <div>
                <Label htmlFor="businessEmail">Business Email</Label>
                <Input id="businessEmail" type="email" placeholder="business@example.com" />
              </div>
              <div>
                <Label htmlFor="businessPhone">Business Phone</Label>
                <Input id="businessPhone" placeholder="+1-555-0000" />
              </div>
              <div>
                <Label htmlFor="businessAddress">Business Address</Label>
                <textarea
                  id="businessAddress"
                  placeholder="Your business address"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  rows={3}
                />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Store Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Input id="currency" placeholder="USD" defaultValue="USD" />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" placeholder="UTC" defaultValue="UTC" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox id="newOrders" defaultChecked />
                <Label htmlFor="newOrders" className="cursor-pointer">
                  Notify me about new orders
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="lowStock" defaultChecked />
                <Label htmlFor="lowStock" className="cursor-pointer">
                  Notify me about low stock items
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="customerMessages" defaultChecked />
                <Label htmlFor="customerMessages" className="cursor-pointer">
                  Notify me about customer messages
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="dailyReport" />
                <Label htmlFor="dailyReport" className="cursor-pointer">
                  Send me daily sales report
                </Label>
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" placeholder="Enter current password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <Button>Enable 2FA</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
