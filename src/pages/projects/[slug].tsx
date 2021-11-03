// components
import Custom404 from "../404"; // 404 page

// util
import { getProject, getProjects } from "../../util/api";

// types
import { GetServerSideProps } from "next";
import { BlockMapType, NotionRenderer } from "react-notion";

interface ProjectPageProps {
  // project?: Project;
  blockMap?: BlockMapType;
  notFound?: boolean;
}

const NOT_FOUND_RESPONSE = {
  props: {
    notFound: true,
  },
};

export default function ProjectPage({ blockMap, notFound }: ProjectPageProps) {
  return notFound ? (
    <Custom404 />
  ) : (
    // <ReactMarkdown components={ChakraUIRenderer()}>{content}</ReactMarkdown>
    <NotionRenderer blockMap={blockMap} />
  );
}

// page title
ProjectPage.title = "Project";

export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async ({
  params,
  res,
}) => {
  // get post slug
  const slug = params.slug as string;

  // fetch projects
  const projects = await getProjects();
  // find project by slug
  const project = projects.find((project) => project.slug === slug);

  // if no project found, show 404
  if (!project) {
    res.statusCode = 404;
    return NOT_FOUND_RESPONSE;
  }

  // get block map for pproject page
  const blockMap = await getProject(project.id);

  console.log(blockMap);

  return {
    props: {
      // project,
      blockMap,
    },
  };
};
