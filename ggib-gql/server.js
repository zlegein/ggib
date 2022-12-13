var express = require('express');
var cors = require('cors');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input PostInput {
    content: String
    title: String
    author: String
  }
  type Mutation {
    createPost(input: PostInput): Post
  }
  type Query {
    post(id: String!): Post
    hello: String
    user(id: Int!): UserPost
    posts(count: Int): [Post]
  }  
  type Post {
    pid: String
    title: String
    content: String
    author: String
  }  
  type User {
    name: String
    fullName: String
    id: Int!
    avatar: String
    posts: [Post]
  }  
  type Friend {
    name: String
    numberOfPosts: Int
  }
  type UserPost {
    me: User
    friends: [Friend]
  }
`); 

class Post {
  constructor(pid, {content, title, author}) {
    this.pid = pid;   
    this.title = title;
    this.content = content;   
    this.author = author;
  }
}

// fake storage
const database = {}
// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  createPost: ({input}) => {   
    // Create a random id for our "database".   
    const pid = require('crypto').randomBytes(10).toString('hex');
    database[pid] = input;   
    return new Post(pid, input);
  },
  post: ({id}) => {
    console.log('DTATBASE', database)
    if (!database[id]) {
      throw new Error(`post does not exist with id: '${id}'`)
    }
    return new Post(id, database[id])
  },
  posts: ({ count }) => {
    const posts = Object.keys(database).reduce((acc, id) => {
      if (acc.length === count) {
        return acc;
      }
      acc.push(new Post(id, database[id]))
      return acc;
    }, [])
    return posts;
  },
  user: ({ id }) => {
    return {
      me: {
        name: "John",
        fullName: "John Doe",
        id,
        avatar: "avatar-undefined.jpg",
        posts: [
          {
            title: "Post 1",
            content: "Content 1"
          },
          {
            title: "Post 3",
            content: "Content 3"
          }
        ],
      },
      friends: [
        {
          name: "Jane",
          numberOfPosts: 2
        },
        {
          name: "Jack",
          numberOfPosts: 0
        }
      ]
    }
  }
};

var app = express();
app.use(
  cors({
    methods: ['GET', 'HEAD', 'OPTIONS'],
    optionsSuccessStatus: 200,
  })
);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');