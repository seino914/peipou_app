import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data
    await prisma.user.deleteMany();
    console.log("Existing data cleared.");

    // Create test users
    const users = await Promise.all([
      // 管理者ユーザー
      prisma.user.create({
        data: {
          email: "admin@example.com",
          name: "管理者",
          role: Role.ADMIN,
          profile: {
            create: {
              bio: "管理者アカウントです",
            },
          },
        },
      }),
      // Googleユーザー
      prisma.user.create({
        data: {
          email: "google@example.com",
          name: "Googleユーザー",
          role: Role.USER,
          providerId: "google_test_id",
          profile: {
            create: {
              bio: "Googleでログインしたユーザーです",
            },
          },
        },
      }),
    ]);

    console.log(`Created ${users.length} users successfully.`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
