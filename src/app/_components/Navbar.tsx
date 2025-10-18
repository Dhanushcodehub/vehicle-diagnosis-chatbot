// app/_components/Navbar1.tsx
"use client";

import { useEffect, useState } from "react";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: { url: string; src: string; alt: string; title: string };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

export function Navbar1({
  logo = { url: "/", src: "/logo.svg", alt: "logo", title: "AutoAid" },
  menu = [
    { title: "Home", url: "#" },
    {
      title: "Products",
      url: "#",
      items: [
        { title: "Blog", description: "Latest updates and guides", icon: <Book className="size-5" />, url: "#" },
        { title: "Company", description: "What drives our mission", icon: <Trees className="size-5" />, url: "#" },
        { title: "Careers", description: "Open roles and culture", icon: <Sunset className="size-5" />, url: "#" },
        { title: "Support", description: "Help center and community", icon: <Zap className="size-5" />, url: "#" },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        { title: "Help Center", description: "Find quick answers", icon: <Zap className="size-5" />, url: "#" },
        { title: "Contact Us", description: "We’d love to help", icon: <Sunset className="size-5" />, url: "#" },
        { title: "Status", description: "API and app uptime", icon: <Trees className="size-5" />, url: "#" },
        { title: "Terms of Service", description: "Conditions of use", icon: <Book className="size-5" />, url: "#" },
      ],
    },
    { title: "Pricing", url: "#" },
    { title: "Blog", url: "#" },
  ],
  auth: authCfg = { login: { title: "Login", url: "/login" }, signup: { title: "Sign up", url: "/signup" } },
}: Navbar1Props) {
  const [userName, setUserName] = useState("Guest");
  const [isAuthed, setIsAuthed] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (u: User | null) => {
        setIsAuthed(!!u);
        setUserName(u?.displayName ?? u?.email ?? "Guest");
        setAuthLoaded(true);
      },
      () => setAuthLoaded(true)
    );
    return unsub;
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-white/10 text-white">
      <div className="max-w-6xl mx-auto h-14 px-4 flex items-center justify-between overflow-visible">
        {/* Brand */}
        <a href={logo.url} className="flex items-center gap-2">
          <img src={logo.src} className="max-h-6 invert" alt={logo.alt} />
          <span className="font-semibold tracking-tight">{logo.title}</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          <NavigationMenu className="relative">
            <NavigationMenuList>
              {menu.map((item) => renderMenuItem(item))}
            </NavigationMenuList>

            {/* Keep viewport as direct child of NavigationMenu */}
            <NavigationMenuViewport className="absolute left-0 top-full z-50 mt-2 border border-white/15 bg-black text-white rounded-md shadow w-[var(--radix-navigation-menu-viewport-width)] h-[var(--radix-navigation-menu-viewport-height)] overflow-hidden" />
          </NavigationMenu>
        </div>

        {/* Right actions (desktop) */}
        <div className="hidden lg:flex items-center gap-2">
          {authLoaded && isAuthed ? (
            <>
              <span className="text-sm text-white/80 mr-1 pr-5">Hello, {userName}</span>
              
              <a href="/logout">
                <Button size="sm" className="bg-white text-black hover:bg-white/90">
                  Sign out
                </Button>
              </a>
            </>
          ) : (
            <>
              <a href={authCfg.login.url}>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  {authCfg.login.title}
                </Button>
              </a>
              <a href={authCfg.signup.url}>
                <Button size="sm" className="bg-white text-black hover:bg-white/90">
                  {authCfg.signup.title}
                </Button>
              </a>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          {authLoaded && isAuthed && (
            <span className="text-xs text-white/70">Hi, {userName}</span>
          )}
          <MobileMenu
            logo={logo}
            menu={menu}
            authCfg={authCfg}
            isAuthed={isAuthed}
            userName={userName}
          />
        </div>
      </div>
    </header>
  );
}

/* Mobile sheet */
function MobileMenu({
  logo,
  menu,
  authCfg,
  isAuthed,
  userName,
}: {
  logo: { url: string; src: string; alt: string; title: string };
  menu: MenuItem[];
  authCfg: { login: { title: string; url: string }; signup: { title: string; url: string } };
  isAuthed: boolean;
  userName: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto bg-black text-white border-l border-white/10">
        <SheetHeader>
          <SheetTitle>
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-6 invert" alt={logo.alt} />
              <span className="font-semibold tracking-tight">{logo.title}</span>
            </a>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 p-4">
          <Accordion type="single" collapsible className="flex w-full flex-col gap-3">
            {menu.map((item) => renderMobileMenuItem(item))}
          </Accordion>

          <div className="flex flex-col gap-2">
            {isAuthed ? (
              <>
                
                <div className="text-xs text-white/60 mt-1">Hello, {userName}</div>
              </>
            ) : (
              <>
                <a href={authCfg.login.url}>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    {authCfg.login.title}
                  </Button>
                </a>
                <a href={authCfg.signup.url}>
                  <Button className="w-full bg-white text-black hover:bg-white/90">
                    {authCfg.signup.title}
                  </Button>
                </a>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* Helpers */
function renderMenuItem(item: MenuItem) {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-black text-white border border-white/15 hover:bg-white/10">
          {item.title}
        </NavigationMenuTrigger>

        {/* Give content explicit width/padding and high z-index */}
        <NavigationMenuContent className="z-50 border border-white/15 bg-black text-white p-2">
          <div className="grid grid-cols-1 w-[420px]">
            {item.items.map((sub) => (
              <NavigationMenuLink asChild key={sub.title}>
                <SubMenuLink item={sub} />
              </NavigationMenuLink>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors border border-white/15 bg-black text-white hover:bg-white/10"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function renderMobileMenuItem(item: MenuItem) {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-base py-1 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          <div className="flex flex-col gap-2">
            {item.items.map((sub) => (
              <SubMenuLink key={sub.title} item={sub} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }
  return (
    <a key={item.title} href={item.url} className="text-base font-semibold hover:underline">
      {item.title}
    </a>
  );
}

function SubMenuLink({ item }: { item: MenuItem }) {
  return (
    <a
      href={item.url}
      className="flex select-none flex-row gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors border border-white/15 bg-black text-white hover:bg-white/10"
    >
      <div className="text-white">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-xs text-white/70 leading-snug">{item.description}</p>
        )}
      </div>
    </a>
  );
}
