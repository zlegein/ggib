var express = require('express');
var cors = require('cors');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    user(id: Int!): UserPost
    posts(count: Int): [Post]
  }
  type User {
    name: String
    fullName: String
    id: Int!
    avatar: String
    posts: [Post]
  }  
  type Post {
    pid: String
    title: String
    content: String
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

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  posts: ({ count }) => {
    if (!count) {
      return []
    };
    const posts = [...Array(count)].map((u, i) => {
      return {
        pid: `p${i + 1}`,
        title: `Post ${i + 1}`,
        content: `Content ${i + 1}`
      }
    })
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
    origin: /hilton\.com/,
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