import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { RouteLinkStatus } from "./RouteLinkStatus";
import styles from "./RouteLinkStatus.module.css";

type DonetskRouteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> & {
  href: "/donetsk" | "/donetsk/moskva";
  children: ReactNode;
  prefetch?: boolean;
};

/** Keep the current landing usable while Next.js loads the requested route. */
export function DonetskRouteLink({ href, children, prefetch = false, className = "", ...props }: DonetskRouteLinkProps) {
  return (
    <Link {...props} href={href} prefetch={prefetch} className={`${styles.link} ${className}`}>
      {children}
      <RouteLinkStatus label={href === "/donetsk/moskva" ? "Донецк → Москва" : "Медтакси в Донецке"} />
    </Link>
  );
}
