/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit2, Trash2, Search, Shield } from "lucide-react"
import { UserDialog } from "./user-dialog"

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1-555-0101",
    role: "CUSTOMER",
    orders: 5,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-0102",
    role: "CUSTOMER",
    orders: 3,
    createdAt: "2024-01-05",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    phone: "+1-555-0103",
    role: "ADMIN",
    orders: 0,
    createdAt: "2023-12-01",
  },
  {
    id: "4",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1-555-0104",
    role: "CUSTOMER",
    orders: 8,
    createdAt: "2024-01-10",
  },
]

export function UserList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("ALL")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "ALL" || user.role === roleFilter

    return matchesSearch && matchesRole
  })

  const handleEdit = (user :any) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const handleNew = () => {
    setSelectedUser(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground mt-2">Manage customer and admin accounts</p>
        </div>
        <Button onClick={handleNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["ALL", "ADMIN", "CUSTOMER"].map((role) => (
                <Button
                  key={role}
                  variant={roleFilter === role ? "default" : "outline"}
                  onClick={() => setRoleFilter(role)}
                  size="sm"
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Orders</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{user.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.phone}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {user.role === "ADMIN" && <Shield className="w-4 h-4 text-blue-600" />}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === "ADMIN"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                          }`}
                        >
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-foreground">{user.orders}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.createdAt}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(user)} className="text-blue-600">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User Dialog */}
      <UserDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} user={selectedUser} />
    </div>
  )
}
