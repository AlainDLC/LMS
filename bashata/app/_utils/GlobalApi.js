import { gql, request } from "graphql-request";

const MASTER_URL =
  "https://eu-west-2.cdn.hygraph.com/content/" +
  process.env.NEXT_PUBLIC_HYGRAPH_API_KEY +
  "/master";

const getAllCourseList = async () => {
  const query = gql`
    query MyQuery {
      courseLists {
        author
        name
        id
        free
        description
        demoUrl
        banner {
          url
        }
        chapter {
          ... on Chapter {
            id
            name
            video {
              url
            }
          }
        }
        sourceCode
        totalChapters
        tag
        slug
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const getSideBanner = async () => {
  const query = gql`
    query MyQuery {
      sideBanners {
        id
        name
        banner {
          id
          url
        }
        url
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const getCourseById = async (courseId) => {
  const query =
    gql`
    query MyQuery {
      courseList(where: { slug: "` +
    courseId +
    `" }) {
        author
        banner {
          url
        }
        chapter {
          ... on Chapter {
            id
            name
            video {
              url
            }
          }
        }
        demoUrl
        description
        free
        id
        name
        slug
        sourceCode
        tag
        totalChapters
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  getAllCourseList,
  getSideBanner,
  getCourseById,
};
