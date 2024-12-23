import { faker } from '@faker-js/faker';

// Definindo a interface User
export interface User {
  id: number;
  status: 'confirmado' | 'pendente' | 'bloqueado';
  name: string;
  email: string;
  role: 'administrador' | 'corretor' | 'consultor' | 'estagiário';
  registrationDate: string;
  lastAccess: string;
}
let idCounter = 1

export const fetchFakeUsers = (): Promise<User[]> => {
  const users: User[] = Array.from({ length: 5 }).map(() => ({
    id: idCounter++,
    status: faker.helpers.arrayElement(['confirmado', 'pendente', 'bloqueado']),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['administrador', 'corretor', 'consultor', 'estagiário']),
    registrationDate: faker.date.past().toLocaleDateString(),
    lastAccess: faker.date.past().toLocaleDateString(),
  }));

  return new Promise((resolve) => {
    setTimeout(() => resolve(users), 1000); 
  });
};
