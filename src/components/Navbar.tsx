import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

// components
import { Box, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

// hooks
import { useRouter } from "next/router";

// styling
import styled from "styled-components";

// info
import navItems from "../config/navItems";

interface NavbarItemsContextInterface {
  hoveredItemKey: string | null;
  setHoveredItemKey: Dispatch<SetStateAction<string | null>>;
}
const NavbarItemsContext = createContext({} as NavbarItemsContextInterface);

export default function Navbar() {
  const [hoveredItemKey, setHoveredItemKey] = useState<string | null>(null);

  return (
    <Box as="nav" w="100%" h="70px" bg="gray.900" position="relative">
      <ChakraLink as={Link} href="/">
        <a>
          <LogoText>Zane St. John</LogoText>
        </a>
      </ChakraLink>
      <Box position="absolute" right="10px">
        <NavbarItemsContext.Provider
          value={{ hoveredItemKey, setHoveredItemKey }}
        >
          {navItems.map((item) => (
            <NavbarItem key={item.path} name={item.name} path={item.path} />
          ))}
        </NavbarItemsContext.Provider>
      </Box>
    </Box>
  );
}

function NavbarItem({ name, path }: { name: string; path: string }) {
  const { pathname } = useRouter();
  const { hoveredItemKey, setHoveredItemKey } = useContext(NavbarItemsContext);

  return (
    <ChakraLink as={Link} href={path}>
      <a>
        <NavbarLinkInternal
          style={{
            // TODO: clean this up a bit
            opacity:
              hoveredItemKey === null ? 1 : hoveredItemKey === path ? 1 : 0.75,
          }}
          onMouseOver={() => setHoveredItemKey(path)}
          onMouseOut={() => setHoveredItemKey(null)}
        >
          <Box
            color="#fff"
            userSelect="none"
            display="inline-block"
            paddingLeft="15px"
            paddingRight="15px"
            height="70px"
            lineHeight="70px"
          >
            <Box
              as="span"
              position="relative"
              _after={{
                content: "''",
                position: "absolute",
                bottom: "-3px",
                left: 0,
                width: "100%",
                height: "2px",
                background: "#fff",
                display: "block",
                borderRadius: "1px",
                transform: `scaleX(${pathname === path ? 1 : 0})`,
                transformOrigin: "0px 0px",
                transition: "transform 250ms cubic-bezier(0, 1, 1, 1)",
              }}
            >
              {name}
            </Box>
          </Box>
        </NavbarLinkInternal>
      </a>
    </ChakraLink>
  );
}

const NavbarLinkInternal = styled.div`
  transition: all 150ms ease;
  display: inline-block;
`;

const LogoText = styled(Box)`
  user-select: none;

  font-weight: 600;
  font-size: 27px;
  color: #fff;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  padding: 5px;
  transition: color 250ms cubic-bezier(0, 1, 1, 1);

  &::before {
    width: 100%;
    height: 2px;
    border-radius: 2px;
    content: "";
    background-color: #fff;
    display: block;
    position: absolute;
    bottom: 3px;
    left: 0;
    z-index: -1;
    transform: scaleX(0);
    transition: transform 250ms cubic-bezier(0, 1, 1, 1);
    transform-origin: 100% 0px;
  }
  &:hover::before {
    transform: scaleX(1);
    transform-origin: 0px 0px !important;
  }
`;
