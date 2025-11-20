import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'
import SettingsTable from "@/components/dashboard/SettingsTable/SettingsTable"
export default function Tab() {
  return (
    <div className="w-full ">
      <Tabs defaultValue="account" className="w-full">
  <TabsList className="flex justify-between">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
     <TabsTrigger value="Email">Email</TabsTrigger>
    <TabsTrigger value="Create">Create New Dig</TabsTrigger>
  </TabsList>
  <TabsContent value="account"><SettingsTable/></TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
   <TabsContent value="Email">Change your password here.</TabsContent>
    <TabsContent value="Create">Change your password here.</TabsContent>
    
</Tabs>
    </div>
  )
}
