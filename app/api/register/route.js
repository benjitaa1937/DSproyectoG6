// api/register/route.js
import connectDB from '../../db';  // Asegúrate de importar la conexión a DB
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import User from '../../models/user';  // Asegúrate de tener el modelo de usuario

export async function POST(request) {
  try {
    await connectDB(); // Conexión a MongoDB

    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Debes proporcionar nombre de usuario, email y contraseña' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Ya existe un usuario con ese email' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: 'Usuario registrado con éxito', redirectTo: '/login' }, { status: 201 });

  } catch (error) {
    console.error('Error en el registro:', error);
    return NextResponse.json({ message: 'Error al registrar el usuario' }, { status: 500 });
  }
}
