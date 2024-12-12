import connectDB from '../../db';  
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import User from '../../models/user';  

export async function POST(request) {
  try {
    await connectDB(); 
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Debes proporcionar email y contraseña' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, 'secreto_para_firmar_el_token', { expiresIn: '1h' });

    return NextResponse.json({ token }, { status: 200 });

  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    return NextResponse.json({ message: 'Error en el inicio de sesión' }, { status: 500 });
  }
}
