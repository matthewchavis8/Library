import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import { BsBookHalf } from "react-icons/bs";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import GoGopher from "../Characters/Go/GoGopher";

const subMenuItemsOne = [
  {
    title: "Home",
    description: "The latest industry news, updates, and info",
    link: "/",
    icon: <Book className="size-5 shrink-0" />,
  },
  {
    title: "Books",
    description: "Our mission is to innovate and empower the world",
    link: "/Books",
    icon: <Trees className="size-5 shrink-0" />,
  },
  {
    title: "Top 5",
    description: "Browse job listing and discover our workspace",
    link: "/Top5",
    icon: <Sunset className="size-5 shrink-0" />,
  },
];

const subMenuItemsTwo = [
  {
    title: "Help Center",
    description: "Get all the answers you need right here",
    icon: <Zap className="size-5 shrink-0" />,
  },
  {
    title: "Contact Us",
    description: "We are here to help you with any questions you have",
    icon: <Sunset className="size-5 shrink-0" />,
  },
  {
    title: "Status",
    description: "Check the current status of our services and APIs",
    icon: <Trees className="size-5 shrink-0" />,
  },
  {
    title: "Terms of Service",
    description: "Our terms and conditions for using our services",
    icon: <Book className="size-5 shrink-0" />,
  },
];

const Navbar = () => {
  return (
    <section className="py-4">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem className="text-muted-foreground">
                    <NavigationMenuTrigger>
                      <span className="text-lg text-black">Catalogue</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-80 p-3">
                        <NavigationMenuLink>
                          {subMenuItemsOne.map((item, idx) => (
                            <li key={idx}>
                              <Link
                                className={cn(
                                  "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                )}
                                href={item.link}
                              >
                                {item.icon}
                                <div>
                                  <div className="text-sm font-semibold">
                                    {item.title}
                                  </div>
                                  <p className="text-sm leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <Link
                className="inline-flex items-center text-2xl select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                href={"/"}
              >
                <BsBookHalf className="size-12" />
                <span>Matt's Library</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <GoGopher />
            </div>
          </div>
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-center items-center">
              <Link
                className="inline-flex items-center text-2xl select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                href={"/"}
              >
                <BsBookHalf className="size-12" />
                <span>Matt's Library</span>
              </Link>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex-1 flex justify-center items-center">
                      <Link
                        className="inline-flex items-center text-2xl select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href={"/"}
                      >
                        <BsBookHalf className="size-12" />
                        <span>Matt's Library</span>
                      </Link>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="mb-8 mt-8 flex flex-col gap-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="products" className="border-b-0">
                      <AccordionTrigger className="mb-4 py-0 font-semibold hover:no-underline">
                        Catalogue
                      </AccordionTrigger>
                      <AccordionContent className="mt-2">
                        {subMenuItemsOne.map((item, idx) => (
                          <Link
                            key={idx}
                            className={cn(
                              "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                            href={item.link}
                          >
                            {item.icon}
                            <div>
                              <div className="text-sm font-semibold">
                                {item.title}
                              </div>
                              <p className="text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
