import { useQuery } from '@tanstack/react-query'
import { GraphQLClient, gql } from "graphql-request";

export async function fetcher(query, variables) {
  const graphQLClient = new GraphQLClient('http://localhost:4000/graphql', {
    credentials: 'same-origin',
    mode: 'cors',
  })
  const data = await graphQLClient.request(query, variables);
 return data;
}

export const UserDocument = gql`
  query findUser($id: Int!) {
    user(id: $id) {
      me {
        name
        fullName
        id
        avatar
        posts {
          title
          content
        }
      }
      friends {
        name
        numberOfPosts
      }
    }  
  }
`;

export const CreatePostDocument = gql`
  mutation CreatePost($input: PostInput) {
    createPost(input: $input) {
      pid
    }
  }
`

const fetchUser = async (id) => {
  const { user } = await fetcher(UserDocument, { id: parseInt(id) })
  return user;
}

const useGetUser = (id) => {
  return useQuery(['user', id], () => fetcher(UserDocument, { id: parseInt(id) }))
}

export const PostsDocument = gql`
query getPosts($count: Int) {
  posts(count: $count) {
    pid
    title
    content
 }
}
`;

export const PostDocument = gql`
query getPost($id: String!) {
  post(id: $id) {
    pid
    title
    content
    author
 }
}
`;

const createPostFetch = async ({ content, title, author }) => {
  const data = await fetcher(CreatePostDocument, { input: { title, content, author }})
  return data;
}

const fetchPost = async (id) => {
  console.log('what is it ', id)
  const { post } = await fetcher(PostDocument, { id })
  console.log('POST', post);
  return post;
}

const useGetPost = (id) => {
  return useQuery(['post', id], () => fetcher(PostDocument, { id }))
}

const fetchPosts = async (count) => {
  const { posts } = await fetcher(PostsDocument, { count: parseInt(count) })
  return posts;
}

const usePosts = (count) => {
  return useQuery(['posts', count], () => fetcher(PostsDocument, { count: parseInt(count) }))
}

export const HelloDocument = gql`
{
  hello
}
`;

const useHello = () => {
  return useQuery(['hello'], () => fetcher(HelloDocument))
}

export { useGetUser, fetchUser, usePosts, fetchPosts, useHello, createPostFetch, fetchPost, useGetPost }





