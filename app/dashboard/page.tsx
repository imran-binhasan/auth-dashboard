import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/api';
import { LogoutButton } from '@/components/logout-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, User } from 'lucide-react';

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and manage your account information",
};

export default async function DashboardPage() {
  const token = (await cookies()).get('auth-token');
  if (!token) redirect('/login');

  const userId = 2;
  let user;
  try {
    ({ data: user } = await fetchUser(userId));
  } catch {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user.first_name}!
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* User Profile Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                />
                <AvatarFallback className="text-2xl">
                  {user.first_name[0]}
                  {user.last_name[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-semibold">
                      {user.first_name} {user.last_name}
                    </h3>
                    <Badge variant="outline" className="text-green-600">
                      <span className="mr-1 h-2 w-2 rounded-full bg-green-600 inline-block" />
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center text-muted-foreground">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <User className="mr-2 h-4 w-4" />
                    <span>User ID: {user.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}