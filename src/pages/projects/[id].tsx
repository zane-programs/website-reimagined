import { useEffect } from "react";

// components
import ReactMarkdown from "react-markdown";
import Custom404 from "../404"; // 404 page

// util
import path from "path";
import { promises as fs } from "fs";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

// types
import { GetServerSideProps } from "next";

interface ProjectPageProps {
  content?: string;
  notFound?: boolean;
}

const NOT_FOUND_RESPONSE = {
  props: {
    notFound: true,
  },
};

export default function ProjectPage({ content, notFound }: ProjectPageProps) {
  return notFound ? (
    <Custom404 />
  ) : (
    <ReactMarkdown components={ChakraUIRenderer()}>{content}</ReactMarkdown>
  );
}

// page title
ProjectPage.title = "Project";

export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async ({
  params,
  res,
}) => {
  const projectName = params.id as string;

  // if the project name is sus, stop right here
  if (!/^[A-Za-z0-9_\-]+$/.test(projectName)) {
    res.statusCode = 404;
    return NOT_FOUND_RESPONSE;
  }

  try {
    // read project file
    const content = await fs.readFile(
      path.join(
        process.cwd(),
        "./src/resources/projects/" + projectName + ".md"
      )
    );

    return {
      props: {
        content: content.toString(),
      },
    };
  } catch (e) {
    // in case there is an error finding or reading the file
    res.statusCode = 404;
    return NOT_FOUND_RESPONSE;
  }
};
