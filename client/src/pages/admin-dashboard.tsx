import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone?: string;
  isAdmin: boolean;
}

interface WaitlistEntry {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  catInfo?: string;
  newsletterOptIn: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  
  // Pagination state
  const [usersPage, setUsersPage] = useState(1);
  const [waitlistPage, setWaitlistPage] = useState(1);
  const [subscriptionsPage, setSubscriptionsPage] = useState(1);
  const itemsPerPage = 10;
  
  // Fetch users
  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    enabled: !!user?.isAdmin,
  });
  
  // Fetch waitlist entries
  const { data: waitlistEntries = [] } = useQuery<WaitlistEntry[]>({
    queryKey: ["/api/admin/waitlist"],
    enabled: !!user?.isAdmin,
  });
  
  // Fetch subscriptions
  const { data: subscriptions = [] } = useQuery<any[]>({
    queryKey: ["/api/admin/subscriptions"],
    enabled: !!user?.isAdmin,
  });
  
  // Paginate data
  const paginateData = (data: any[], page: number) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };
  
  const paginatedUsers = paginateData(users, usersPage);
  const paginatedWaitlist = paginateData(waitlistEntries, waitlistPage);
  const paginatedSubscriptions = paginateData(subscriptions, subscriptionsPage);
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">
              Manage users, subscriptions, and waitlist entries
            </p>
          </div>
          
          <Card>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <CardHeader>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                  <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
                </TabsList>
              </CardHeader>
              
              <CardContent>
                {/* Users Tab */}
                <TabsContent value="users" className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Username</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Role</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone || "-"}</TableCell>
                            <TableCell>
                              <Badge variant={user.isAdmin ? "default" : "outline"}>
                                {user.isAdmin ? "Admin" : "User"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                        
                        {paginatedUsers.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                              No users found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {users.length > itemsPerPage && (
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setUsersPage(prev => Math.max(prev - 1, 1))}
                            disabled={usersPage === 1}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => setUsersPage(i + 1)}
                              isActive={usersPage === i + 1}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setUsersPage(prev => Math.min(prev + 1, Math.ceil(users.length / itemsPerPage)))}
                            disabled={usersPage === Math.ceil(users.length / itemsPerPage)}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </TabsContent>
                
                {/* Subscriptions Tab */}
                <TabsContent value="subscriptions" className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>User ID</TableHead>
                          <TableHead>Pet ID</TableHead>
                          <TableHead>Plan ID</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedSubscriptions.map((subscription) => (
                          <TableRow key={subscription.id}>
                            <TableCell className="font-medium">{subscription.id}</TableCell>
                            <TableCell>{subscription.userId}</TableCell>
                            <TableCell>{subscription.petId}</TableCell>
                            <TableCell>{subscription.planId}</TableCell>
                            <TableCell>
                              <Badge variant={subscription.status === 'active' ? 'success' : 'secondary'}>
                                {subscription.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDate(subscription.startDate)}</TableCell>
                            <TableCell>{(subscription.totalPrice/100).toFixed(2)} SAR</TableCell>
                          </TableRow>
                        ))}
                        
                        {paginatedSubscriptions.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                              No subscriptions found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {subscriptions.length > itemsPerPage && (
                    <Pagination>
                      <PaginationContent>
                        <PaginationPrevious 
                          onClick={() => setSubscriptionsPage(prev => Math.max(prev - 1, 1))}
                          disabled={subscriptionsPage === 1}
                        />
                        
                        {Array.from({ length: Math.ceil(subscriptions.length / itemsPerPage) }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => setSubscriptionsPage(i + 1)}
                              isActive={subscriptionsPage === i + 1}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationNext 
                          onClick={() => setSubscriptionsPage(prev => Math.min(prev + 1, Math.ceil(subscriptions.length / itemsPerPage)))}
                          disabled={subscriptionsPage === Math.ceil(subscriptions.length / itemsPerPage)}
                        />
                      </PaginationContent>
                    </Pagination>
                  )}
                </TabsContent>
                
                {/* Waitlist Tab */}
                <TabsContent value="waitlist" className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Cat Info</TableHead>
                          <TableHead>Newsletter</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedWaitlist.map((entry) => (
                          <TableRow key={entry.id}>
                            <TableCell className="font-medium">{entry.id}</TableCell>
                            <TableCell>{entry.fullName}</TableCell>
                            <TableCell>{entry.email}</TableCell>
                            <TableCell>{entry.phone || "-"}</TableCell>
                            <TableCell>
                              <div className="max-w-xs truncate" title={entry.catInfo}>
                                {entry.catInfo || "-"}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={entry.newsletterOptIn ? "default" : "outline"}>
                                {entry.newsletterOptIn ? "Yes" : "No"}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDate(entry.createdAt)}</TableCell>
                          </TableRow>
                        ))}
                        
                        {paginatedWaitlist.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                              No waitlist entries found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {waitlistEntries.length > itemsPerPage && (
                    <Pagination>
                      <PaginationContent>
                        <PaginationPrevious 
                          onClick={() => setWaitlistPage(prev => Math.max(prev - 1, 1))}
                          disabled={waitlistPage === 1}
                        />
                        
                        {Array.from({ length: Math.ceil(waitlistEntries.length / itemsPerPage) }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => setWaitlistPage(i + 1)}
                              isActive={waitlistPage === i + 1}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationNext 
                          onClick={() => setWaitlistPage(prev => Math.min(prev + 1, Math.ceil(waitlistEntries.length / itemsPerPage)))}
                          disabled={waitlistPage === Math.ceil(waitlistEntries.length / itemsPerPage)}
                        />
                      </PaginationContent>
                    </Pagination>
                  )}
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
