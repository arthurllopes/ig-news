import Link from "next/link"
import { useRouter } from "next/router"
import { cloneElement } from "react";
export function NavLink({children, activeClassName, ...rest }) {
    const {asPath} = useRouter()
    const className = asPath === rest.href ? activeClassName : '';
    return (
        <Link {...rest}>
        {cloneElement(children, {
          className,
        })}
      </Link>
    )
}