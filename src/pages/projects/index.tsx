// components
import { Heading, Text } from "@chakra-ui/react";
import SiteLink from "../../components/SiteLink";

export default function Projects() {
  return (
    <>
      <Heading pb="2">Projects</Heading>
      <Text>My projects here</Text>
      <Text>
        <SiteLink href="/projects/schoop">Hello Zane</SiteLink>
      </Text>
    </>
  );
}

// page title
Projects.title = "Projects";
