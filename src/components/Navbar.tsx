import React, {
  createContext,
  memo,
  useContext,
  useState,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";

// components
import { Box, Center, Grid, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

// hooks
import { useRouter } from "next/router";
import useMouse from "../hooks/useMouse";

// types
import { ChakraProps } from "@chakra-ui/system";

// info
import navItems from "../config/navItems";

interface NavbarItemsContextInterface {
  hoveredItemKey: string | null;
  setHoveredItemKey: Dispatch<SetStateAction<string | null>>;
}
const NavbarItemsContext = createContext({} as NavbarItemsContextInterface);

export default function Navbar() {
  return (
    <Box as="nav" w="250px" h="100vh" bg="gray.900">
      <Grid w="100%" h="100%" templateRows="auto 1fr" templateColumns="1fr">
        <LogoArea />
        <NavItems />
      </Grid>
    </Box>
  );
}

const LogoArea = memo(function LogoArea() {
  return (
    <Box p="3">
      <NextLink href="/" passHref>
        <Link>
          <LogoText>Zane St. John</LogoText>
        </Link>
      </NextLink>
      <ProfileLinks
        links={{
          github: {
            icon: <FaGithub />,
            url: "https://github.com/zane-programs",
            title: "GitHub",
          },
          linkedin: {
            icon: <FaLinkedin />,
            url: "https://www.linkedin.com/in/zaney",
            title: "LinkedIn",
          },
          twitter: {
            icon: <FaTwitter />,
            url: "https://twitter.com/Zane_StJohn",
            title: "Twitter",
          },
        }}
      />
    </Box>
  );
});

function ProfileLinks({
  links,
}: {
  links: { [key: string]: { icon: ReactNode; url: string; title: string } };
}) {
  const [hoveredItemKey, setHoveredItemKey] = useState<string | null>(null);
  // check for mouse availability
  const { mouseAvailable } = useMouse();

  return (
    <Box pt="4">
      <Center>
        {Object.keys(links).map((key, index) => {
          const { icon, url, title } = links[key];
          return (
            <Link
              key={key}
              href={url}
              title={title}
              aria-label={title}
              color="#fff"
              fontSize="24px"
              opacity={
                !mouseAvailable ||
                hoveredItemKey === null ||
                hoveredItemKey === key
                  ? 1
                  : 0.75
              }
              marginRight={index + 1 === Object.keys(links).length ? 0 : "13px"}
              onMouseOver={() => setHoveredItemKey(key)}
              onMouseOut={() => setHoveredItemKey(null)}
              isExternal
            >
              {icon}
            </Link>
          );
        })}
      </Center>
    </Box>
  );
}

const NavItems = memo(function NavItems() {
  const [hoveredItemKey, setHoveredItemKey] = useState<string | null>(null);

  return (
    <Box as="ul" listStyleType="none">
      <NavbarItemsContext.Provider
        value={{ hoveredItemKey, setHoveredItemKey }}
      >
        {navItems.map((item) => (
          <NavbarItem key={item.path} name={item.name} path={item.path} />
        ))}
      </NavbarItemsContext.Provider>
    </Box>
  );
});

function NavbarItem({ name, path }: { name: string; path: string }) {
  const { pathname } = useRouter();
  const { hoveredItemKey, setHoveredItemKey } = useContext(NavbarItemsContext);
  // check for mouse availability
  const { mouseAvailable } = useMouse();

  return (
    <li>
      <NextLink href={path} passHref>
        <Link
          display="inline-block"
          padding="15px 12px 15px 12px"
          width="100%"
          onMouseOver={() => setHoveredItemKey(path)}
          onMouseOut={() => setHoveredItemKey(null)}
        >
          <NavbarLinkInternal
            style={{
              // TODO: clean this up a bit
              opacity:
                !mouseAvailable ||
                hoveredItemKey === null ||
                hoveredItemKey === path
                  ? 1
                  : 0.75,
            }}
          >
            <Box
              color="#fff"
              userSelect="none"
              display="inline-block"
              paddingLeft="15px"
              paddingRight="15px"
            >
              <Box
                as="span"
                position="relative"
                fontSize="18px"
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
        </Link>
      </NextLink>
    </li>
  );
}

function NavbarLinkInternal({
  children,
  ...props
}: React.PropsWithChildren<ChakraProps>) {
  return (
    <Box display="inline-block" transition="all 150ms ease" {...props}>
      {children}
    </Box>
  );
}

// TODO: clean this component up a bit
function LogoText({
  children,
  ...props
}: React.PropsWithChildren<ChakraProps>) {
  return (
    <Box
      userSelect="none"
      fontWeight="700"
      fontSize="27px"
      fontFamily="'Epilogue', sans-serif"
      textAlign="center"
      color="#fff"
      display="inline-block"
      margin={0}
      padding={0}
      transition="color 250ms cubic-bezier(0, 1, 1, 1)"
      position="relative"
      top="0"
      left="50%"
      transform="translateX(-50%)"
      _after={{
        content: "''",
        width: "100%",
        height: "2px",
        borderRadius: "2px",
        backgroundColor: "#fff",
        display: "block",
        position: "absolute",
        bottom: "3px",
        left: 0,
        transform: "scaleX(0)",
        transition: "transform 250ms cubic-bezier(0, 1, 1, 1)",
        transformOrigin: "100% 0px",
      }}
      _hover={{
        _after: {
          transform: "scaleX(1)",
          transformOrigin: "0px 0px",
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
