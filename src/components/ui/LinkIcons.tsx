import { BikeIcon, DownloadIcon, ShoppingBagIcon, UtensilsCrossedIcon, type LucideIcon } from "lucide-react";
import type { ExternalLink } from "@/content/types";

const icons: Record<NonNullable<ExternalLink["icon"]>, LucideIcon> = {
  customer: ShoppingBagIcon,
  rider: BikeIcon,
  restaurant: UtensilsCrossedIcon,
  download: DownloadIcon,
};

export function linkIcon(link: ExternalLink): LucideIcon {
  return icons[link.icon ?? "download"];
}
