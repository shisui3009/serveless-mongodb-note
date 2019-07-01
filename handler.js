
const { connectToDatabase } = require('./db');
const Note = require('./models/Note')

exports.hello = async () => {
  await connectToDatabase();
  return {
    statusCode: 200,
    body: JSON.stringify({message: 'Hello world!'}),
  };
};

exports.getNotes = async (context)  => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();

    const notes = await Note.find();

    return {
      statusCode: 200,
      body: JSON.stringify({notes}),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({error}),
    };
  }
}

exports.createNote = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    
    const body = JSON.parse(event.body)
    
    const newNote = new Note(body);
    await newNote.save();
  
    return {
      statusCode: 200,
      body: JSON.stringify({message: 'create note ok.', newNote }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({error}),
    };
  }
}