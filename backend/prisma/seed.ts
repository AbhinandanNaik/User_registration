import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('password123', 10);

    const users = [
        {
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            passwordHash: password,
            isVerified: true,
            dateOfBirth: new Date('1990-01-01'),
            gender: 'other',
        },
        {
            email: 'alice@example.com',
            firstName: 'Alice',
            lastName: 'Smith',
            passwordHash: password,
            isVerified: true,
            dateOfBirth: new Date('1995-05-15'),
            gender: 'female',
        },
        {
            email: 'bob@example.com',
            firstName: 'Bob',
            lastName: 'Johnson',
            passwordHash: password,
            isVerified: false,
            dateOfBirth: new Date('1988-10-20'),
            gender: 'male',
        },
        {
            email: 'charlie@example.com',
            firstName: 'Charlie',
            lastName: 'Brown',
            passwordHash: password,
            isVerified: true,
            dateOfBirth: new Date('2000-12-25'),
            gender: 'male',
        },
    ];

    for (const u of users) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
