
const mongoose = require('mongoose');
const uri = "mongodb+srv://benjagonzalezp02:<db_password>@clusterg6.syvrl.mongodb.net/?retryWrites=true&w=majority&appName=clusterg6";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
