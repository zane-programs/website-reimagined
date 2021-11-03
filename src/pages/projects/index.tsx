// components
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import NextLink from "next/link";

// util
import { Project, getProjects } from "../../util/api";

// types
import { GetServerSideProps } from "next";

interface ProjectListProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectListProps) {
  return (
    <>
      <Heading pb="2">Projects</Heading>
      <ProjectCards projects={projects} />
    </>
  );
}

function ProjectCards({ projects }: { projects: Project[] }) {
  return (
    <SimpleGrid minChildWidth="250px" spacing="25px">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </SimpleGrid>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <NextLink href={`/projects/${project.slug}`}>
      <a>
        <Box height="200px" position="relative">
          <Box
            backgroundImage={`url(${project.bannerImage[0].url})`}
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundSize="cover"
            borderRadius="18px"
            w="100%"
            h="100%"
          ></Box>
          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            height="auto"
            background="rgba(25, 25, 35, 0.78)"
            backdropFilter="blur(2px)"
            borderBottomRadius="18px"
            color="#fff"
            p="4"
          >
            <Heading as="p" textAlign="left" fontSize="1.6em">
              {project.page}
            </Heading>
            <Text>{project.description}</Text>
          </Box>
        </Box>
      </a>
    </NextLink>
  );
}

// page title
Projects.title = "Projects";

export const getServerSideProps: GetServerSideProps<ProjectListProps> =
  async () => {
    // get list of (published) projects
    const projects = (await getProjects()).filter(
      (project) => project.published
    );

    return {
      props: {
        projects,
      },
    };
  };
