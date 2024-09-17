import { type ClassValue,clsx } from "clsx"
import { Box, FileImageIcon, FileText, Grid, Home, Palette, ShoppingCart } from "lucide-react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const SidebarLinks = [
    { title: "Dashborad", href: "/", icon: Home },
    { title: "Banner", href: "/banner", icon: FileImageIcon },
    { title: "Billboard", href: "/billboard", icon: FileText },
    { title: "Categories", href: "/category", icon: Box },
    { title: "Products", href: "/products", icon: ShoppingCart },
    { title: "Sizes", href: "/sizes", icon: Grid },
    { title: "Colors", href: "/colors", icon: Palette },
  ];