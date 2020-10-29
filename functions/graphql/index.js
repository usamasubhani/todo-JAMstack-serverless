const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require("faundadb")
require('dotenv').config()
const q = faunadb.query

var client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })


const typeDefs = gql`
    type Query {
        todos: [Todo]!
    }
    type Todo {
        id: ID!
        text: String!
        done: Boolean!
    }
    type Mutation {
        addTodo(text: String): Todo
        updateTodoDone(id: ID!): Todo
    }
`;

// const todos = {}
// let todoIndex = 0
const resolvers = {
    Query: {
        todos: async () => {
            const results = await client.query(
                q.Paginate(q.Match(q.Index("get_all_todos")))
            )
            return results.data.map(([ref, text, done]) => {
                id: ref.id,
                    text,
                    done
            })
        }
    },
    Mutation: {
        addTodo: async (_, { text }) => {
            const results = await client.query(
                q.Create(q.Collection("todos"), {
                    data: {
                        text,
                        done: false
                    }
                })
            )
            return {
                ...results.data,
                id: results.ref.id
            }
            // todoIndex++
            // const id = `key-${todoIndex}`
            // todos[id] = { id, text, done: false }
            // return todos[id]
        },
        updateTodoDone: async (_, { id }) => {
            const results = await client.query(
                q.Update(q.Ref(q.Collection("todos"), id) {
                    data: {
                        done: true
                    }
                })
            )
            return {
                ...results.data,
                id: results.ref.id
            }
            // todos[id].done = true
            // return todos[id]
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,

    playground: true,
    introspection: true
})

exports.handler = server.createHandler({
    cors: {
        origin: "*",
        credentials: true
    }
})