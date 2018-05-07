const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const path = require('path')

let schema = buildSchema(`
	type Query {
		hello: String,
		lists: [String]
	}
`)

let root = { 
	hello: () => 'Hello world!',
	lists: () => ['a','b','c']
}

const app = express()

app.get('/',function(req,res){
	//__dirname : It will resolve to your project folder.
	res.sendFile(path.join(__dirname+'/index.html'))
})
app.use('/graphql', graphqlHTTP({
	rootValue: root,
	schema: schema,
	graphiql: true
}))

app.listen(8000, () => console.log('Now browse to localhost:8000/graphql'))