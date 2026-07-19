import { PrismaClient, LeadershipRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Admin user -----------------------------------------------------
  const passwordHash = await bcrypt.hash("ChangeMe@123", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@mohammeda-sc-faridpur.com" },
    update: {},
    create: {
      name: "Site Administrator",
      email: "admin@mohammeda-sc-faridpur.com",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  // --- Leadership -------------------------------------------------------
  await prisma.leadership.createMany({
    data: [
      {
        role: LeadershipRole.PRESIDENT,
        name: "President Name",
        nameBn: "সভাপতির নাম",
        shortBio: "President of Mohammeda Sporting Club, Faridpur.",
        shortBioBn: "মোহামেডান স্পোর্টিং ক্লাব, ফরিদপুরের সভাপতি।",
        isCurrent: true,
      },
      {
        role: LeadershipRole.SECRETARY,
        name: "General Secretary Name",
        nameBn: "সাধারণ সম্পাদকের নাম",
        shortBio: "General Secretary of Mohammeda Sporting Club, Faridpur.",
        shortBioBn: "মোহামেডান স্পোর্টিং ক্লাব, ফরিদপুরের সাধারণ সম্পাদক।",
        isCurrent: true,
      },
    ],
  });

  // --- History milestones ------------------------------------------------
  await prisma.historyMilestone.createMany({
    data: [
      {
        year: 1936,
        title: "Club founded",
        titleBn: "ক্লাব প্রতিষ্ঠা",
        description: "Mohammeda Sporting Club was founded in Faridpur.",
        descriptionBn: "ফরিদপুরে মোহামেডান স্পোর্টিং ক্লাব প্রতিষ্ঠিত হয়।",
        displayOrder: 1,
      },
    ],
  });

  // --- Activities ----------------------------------------------------
  await prisma.activity.createMany({
    data: [
      {
        title: "Football",
        titleBn: "ফুটবল",
        description: "The club's flagship football program, competing in district leagues.",
        descriptionBn: "ক্লাবের প্রধান ফুটবল কার্যক্রম, জেলা লিগে অংশগ্রহণ।",
        icon: "trophy",
        displayOrder: 1,
      },
      {
        title: "Cricket",
        titleBn: "ক্রিকেট",
        description: "Cricket teams across age groups training year-round.",
        descriptionBn: "সারা বছর বিভিন্ন বয়সভিত্তিক ক্রিকেট দলের অনুশীলন।",
        icon: "circle-dot",
        displayOrder: 2,
      },
      {
        title: "Youth Development",
        titleBn: "যুব উন্নয়ন",
        description: "Grassroots coaching programs for young athletes in Faridpur.",
        descriptionBn: "ফরিদপুরের তরুণ খেলোয়াড়দের জন্য প্রাথমিক প্রশিক্ষণ কার্যক্রম।",
        icon: "users",
        displayOrder: 3,
      },
    ],
  });

  // --- Contact info (singleton) ---------------------------------------
  await prisma.contactInfo.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      address: "Mohammeda Sporting Club, Faridpur, Bangladesh",
      addressBn: "মোহামেডান স্পোর্টিং ক্লাব, ফরিদপুর, বাংলাদেশ",
      phone: "+880-XXX-XXXXXX",
      email: "info@mohammeda-sc-faridpur.com",
      officeHours: "Daily, 9:00 AM – 8:00 PM",
      officeHoursBn: "প্রতিদিন, সকাল ৯টা – রাত ৮টা",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
