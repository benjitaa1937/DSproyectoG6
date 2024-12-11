// db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // Evita múltiples conexiones

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw new Error('No se pudo conectar a la base de datos');
  }
};

export default connectDB;
