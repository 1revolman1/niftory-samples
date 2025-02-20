import {
  Avatar,
  Link as ChakraLink,
  Heading,
} from "@chakra-ui/react"
import Link from "next/link"
import * as React from "react"
import { Navbar as NiftoryNavbar } from "./Navbar"

import { BsDiscord } from "react-icons/bs"
import { useAuthContext } from "hooks/useAuthContext"


export const Navbar = ({ onOpen }) => {
  const { session } = useAuthContext()


  const menuItems = React.useMemo(() => {
    const items = [{
      title: "Drops",
      href: "/app/drops"
    }] as Array<Object>

    if (!session) {
      items.push(
        {
          title: "Log In",
          href: "/login"
        })
    }
    else {
      items.push(
        {
          href: "/app/account",
          component: (
            <Link href="/app/account" passHref>
              <ChakraLink>
                <Avatar size="sm" ></Avatar>
              </ChakraLink>
            </Link>
          ),
          hideOnMobile: true,
        },
        {
          title: "Account",
          href: "/app/account",
          hideOnWeb: true,
        },
      )
    }
    items.push({
      href: "https://discord.gg/QAgDQXUGsU",
      component: (
        <ChakraLink
          href="https://discord.gg/QAgDQXUGsU"
          target="_blank"
        >
          <BsDiscord size="1.5rem" color="#2D3436" />
        </ChakraLink>
      ),
    })
    return items

  }, [session])

  return (
    <>
      <NiftoryNavbar
        leftComponent={
          <>
            <Link href="/" passHref>
              <Heading p="4"> All-In-One Sample </Heading>
            </Link>
          </>
        }
        menu={menuItems}
      />
    </>
  )
}
