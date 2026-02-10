import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdminStore, ADMIN_ROUTE } from "@/store/adminStore";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  InboxIcon,
  Building2,
  PlusCircle,
  MapPin,
  Home,
  Sparkles,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ShoppingCart,
  Key,
  History,
  User,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const AdminLayout = () => {
  const { logout, user } = useAdminStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate(`${ADMIN_ROUTE}/login`);
  };

  const navItems = [
    {
      title: "Dashboard",
      href: `${ADMIN_ROUTE}/dashboard`,
      icon: LayoutDashboard,
    },
    {
      title: "Seller Submissions",
      items: [
        {
          title: "Pending Sell Requests",
          href: `${ADMIN_ROUTE}/pending-sell`,
          icon: InboxIcon,
        },
        {
          title: "Pending Lease Requests",
          href: `${ADMIN_ROUTE}/pending-lease`,
          icon: InboxIcon,
        },
        {
          title: "Submission History",
          href: `${ADMIN_ROUTE}/history`,
          icon: History,
        },
      ],
    },
    {
      title: "Buyer Requirements",
      items: [
        {
          title: "Buy Requirements",
          href: `${ADMIN_ROUTE}/pending-buy-requirements`,
          icon: ShoppingCart,
        },
        {
          title: "Rent Requirements",
          href: `${ADMIN_ROUTE}/pending-rent-requirements`,
          icon: Key,
        },
        {
          title: "Requirement History",
          href: `${ADMIN_ROUTE}/history?tab=requirements`,
          icon: History,
        },
      ],
    },
    {
      title: "Property Management",
      items: [
        {
          title: "All Properties",
          href: `${ADMIN_ROUTE}/properties`,
          icon: Building2,
        },
        {
          title: "Create Property",
          href: `${ADMIN_ROUTE}/create`,
          icon: PlusCircle,
        },
      ],
    },
    {
      title: "Master Controls",
      items: [
        {
          title: "Locations",
          href: `${ADMIN_ROUTE}/master/locations`,
          icon: MapPin,
        },
        {
          title: "Property Types",
          href: `${ADMIN_ROUTE}/master/property-types`,
          icon: Home,
        },
        {
          title: "Amenities",
          href: `${ADMIN_ROUTE}/master/amenities`,
          icon: Sparkles,
        },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href.includes("?")) {
      return location.pathname + location.search === href;
    }
    return location.pathname === href;
  };

  const NavLink = ({
    href,
    icon: Icon,
    children,
  }: {
    href: string;
    icon: any;
    children: React.ReactNode;
  }) => (
    <Link
      to={href}
      onClick={() => setSidebarOpen(false)}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm",
        isActive(href)
          ? "bg-primary text-primary-foreground font-medium"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
      {isActive(href) && <ChevronRight className="w-4 h-4 ml-auto" />}
    </Link>
  );

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "AD";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Pro Property</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-3 space-y-2">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.href ? (
                <NavLink href={item.href} icon={item.icon}>
                  {item.title}
                </NavLink>
              ) : (
                <div className="pt-4 first:pt-0">
                  <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {item.title}
                  </p>
                  <div className="space-y-1 mt-1">
                    {item.items?.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        href={subItem.href}
                        icon={subItem.icon}
                      >
                        {subItem.title}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Profile Footer */}
      <div className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start px-2 h-auto py-2"
            >
              <Avatar className="h-8 w-8 mr-3">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left overflow-hidden">
                <p className="text-sm font-medium truncate">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || ""}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name || "Admin"}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.email || ""}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  Role: {user?.role || "admin"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-40 flex items-center justify-between px-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
          <span className="font-semibold ml-3">Admin Panel</span>
        </div>

        {/* Mobile User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name || "Admin"}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.email || ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:block bg-white border-r shadow-sm">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="lg:pl-72 pt-16 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
