import { BlockMapType } from "react-notion";

export interface Project {
  published: boolean; // whether or not it's visible
  description: string; // project description
  bannerImage: ImageInfo[]; // project banner image info
  slug: string; // project slug
  page: string; // page name
  id: string; // page id
}

interface ImageInfo {
  name: string; // image file name
  url: string; // image url
  rawUrl: string; // raw image url (amazon storage bucket)
}

export async function getProjects(): Promise<Project[]> {
  return await _fetchFromNotionAPI("/table/68919d53e05949bda90d70dee9e0fe2c");
}

export async function getProject(id: string): Promise<BlockMapType> {
  return await _fetchFromNotionAPI("/page/" + id);
}

async function _fetchFromNotionAPI(path: string) {
  return await (await fetch("https://notion-api.splitbee.io/v1" + path)).json();
}
