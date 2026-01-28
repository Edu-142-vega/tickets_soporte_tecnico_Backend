import { DataSource } from 'typeorm';
import { User } from '../../users/user.entity'; 
import * as bcrypt from 'bcrypt';

export const seedUsers = async (dataSource: DataSource) => {
  console.log('🔍 [SEED] Revisando base de datos...');
  const userRepository = dataSource.getRepository(User);
  const emailPrueba = 'juan@cliente.com';

  const existingUser = await userRepository.findOneBy({ email: emailPrueba });

  if (!existingUser) {
    // 🔐 Importante: Encriptamos la contraseña "user1234"
    const hashedPassword = await bcrypt.hash('user1234', 10);

    const user = userRepository.create({
      nombre: 'Juan Perez',
      email: emailPrueba,
      password: hashedPassword,
    });

    await userRepository.save(user);
    console.log('✅ [SEED] Usuario juan@cliente.com creado exitosamente.');
  } else {
    console.log('ℹ️ [SEED] El usuario juan@cliente.com ya existe.');
  }
};