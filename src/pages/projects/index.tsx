// components
import { Box, Grid, Heading, SimpleGrid, Text } from "@chakra-ui/react";
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
        <Box background="gray.900" height="200px" borderRadius="18px">
          <Grid w="100%" h="100%" templateRows="1fr auto" templateColumns="1fr">
            <Box
              backgroundImage={`url(${project.bannerImage[0].url})`}
              backgroundRepeat="no-repeat"
              backgroundPosition="center"
              backgroundSize="cover"
              borderTopRadius="18px"
            ></Box>
            <Box color="#fff" p="4">
              <Heading as="p" textAlign="left" fontSize="1.6em">
                {project.page}
              </Heading>
              <Text>{project.description}</Text>
            </Box>
          </Grid>
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
