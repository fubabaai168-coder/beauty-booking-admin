import { PrismaClient, UserRole, ServiceCategory, ReservationStatus, DayOfWeek } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 開始資料庫填充...');

  // 清空舊資料（依關聯順序）
  console.log('🗑️  清空舊資料...');
  await prisma.reservation.deleteMany();
  await prisma.scheduleOverride.deleteMany();
  await prisma.weeklySchedule.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();
  // ShopSettings 不需要刪除，使用 upsert 確保單例

  // 產生密碼雜湊
  const hashedPassword = await bcrypt.hash('soloai2025', 10);
  console.log('🔐 密碼雜湊已產生');

  // ============================================
  // 1. 建立員工 (Staff)
  // ============================================
  console.log('👥 建立員工資料...');
  
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@soloai.demo',
      phone: '0912-345-678',
      password: hashedPassword,
      role: UserRole.ADMIN,
      avatar: '/placeholder-user.jpg',
      skills: ['頭皮芳療', '精油調配', '顧客管理'],
      isActive: true,
    },
  });

  const kelly = await prisma.user.create({
    data: {
      name: 'Kelly',
      email: 'kelly@florihana-beauty.com',
      phone: '0912-345-678',
      password: hashedPassword,
      role: UserRole.ADMIN,
      avatar: '/placeholder-user.jpg',
      skills: ['頭皮芳療', '精油調配', '顧客管理'],
      isActive: true,
    },
  });

  const meiyu = await prisma.user.create({
    data: {
      name: '黃美玉',
      email: 'meiyu@florihana-beauty.com',
      phone: '0922-888-999',
      password: hashedPassword,
      role: UserRole.STAFF,
      avatar: '/placeholder-user.jpg',
      skills: ['精油調配', '頭皮護理', '芳療諮詢'],
      isActive: true,
    },
  });

  const apple = await prisma.user.create({
    data: {
      name: 'Apple',
      email: 'apple@florihana-beauty.com',
      phone: '0933-777-666',
      password: hashedPassword,
      role: UserRole.STAFF,
      avatar: '/placeholder-user.jpg',
      skills: ['頭皮護理', '基礎芳療'],
      isActive: true,
    },
  });

  // ============================================
  // 2. 建立服務項目 (Services)
  // ============================================
  console.log('💆 建立服務項目...');

  const serviceA = await prisma.service.create({
    data: {
      name: '頭皮芳療舒活調理',
      category: ServiceCategory.Facial,
      price: 1288,
      duration: 40,
      bufferTime: 20,
      description: '**全程使用法國芳療家 (Florihana) 有機精油**。包含頭皮檢測、精油嗅吸放鬆、肩頸熱敷。',
      isActive: true,
    },
  });

  const serviceB = await prisma.service.create({
    data: {
      name: '頂級大馬士革玫瑰保濕護理',
      category: ServiceCategory.Facial,
      price: 2500,
      duration: 90,
      bufferTime: 30,
      description: '奢華使用**芳療家大馬士革玫瑰純露**濕敷，搭配淋巴引流手技，深層補水。',
      isActive: true,
    },
  });

  // ============================================
  // 3. 建立商品項目 (Products - Duration 0)
  // ============================================
  console.log('🛍️  建立商品項目...');

  const productC = await prisma.service.create({
    data: {
      name: '芳療家-高地薰衣草精油 (15g)',
      category: ServiceCategory.Facial,
      price: 680,
      duration: 0,
      bufferTime: 0,
      description: '法國原裝進口，舒緩放鬆首選。 (零售商品)',
      isActive: true,
    },
  });

  const productD = await prisma.service.create({
    data: {
      name: '芳療家-金盞花浸泡油',
      category: ServiceCategory.Facial,
      price: 950,
      duration: 0,
      bufferTime: 0,
      description: '敏感肌專用，溫和修護。 (零售商品)',
      isActive: true,
    },
  });

  // ============================================
  // 4. 建立員工排班表 (Weekly Schedules)
  // ============================================
  console.log('📅 建立員工排班表...');

  const staffMembers = [admin, kelly, meiyu, apple];
  const weekDays: DayOfWeek[] = [DayOfWeek.MON, DayOfWeek.TUE, DayOfWeek.WED, DayOfWeek.THU, DayOfWeek.FRI, DayOfWeek.SAT, DayOfWeek.SUN];

  for (const staff of staffMembers) {
    for (const day of weekDays) {
      // 週二公休，週日部分員工休息
      const isOff = day === DayOfWeek.TUE || (day === DayOfWeek.SUN && staff.id === apple.id);
      const startTime = day === DayOfWeek.SAT || day === DayOfWeek.SUN ? '10:00' : '10:00';
      const endTime = day === DayOfWeek.SAT || day === DayOfWeek.SUN ? '18:00' : '21:00';

      await prisma.weeklySchedule.create({
        data: {
          userId: staff.id,
          dayOfWeek: day,
          isOff,
          startTime,
          endTime,
        },
      });
    }
  }

  // ============================================
  // 5. 建立顧客資料 (Customers)
  // ============================================
  console.log('👤 建立顧客資料...');

  const customers = [
    {
      name: '陳雅婷',
      phone: '0912-345-678',
      email: 'yating.chen@example.com',
      tags: ['Florihana愛用者', '喜歡玫瑰味'],
      notes: '偏好玫瑰系列產品，定期保養',
    },
    {
      name: '林怡君',
      phone: '0922-888-999',
      email: 'ichun.lin@example.com',
      tags: ['VIP', 'Florihana愛用者'],
      notes: '長期客戶，已使用芳療家產品 2 年',
    },
    {
      name: '張淑芬',
      phone: '0933-777-666',
      email: 'shufen.zhang@example.com',
      tags: ['過敏肌', 'Florihana愛用者'],
      notes: '敏感肌，指定使用金盞花系列',
    },
    {
      name: '黃美玲',
      phone: '0944-111-222',
      email: 'meiling.huang@example.com',
      tags: ['喜歡玫瑰味'],
      notes: '新客，對玫瑰產品感興趣',
    },
    {
      name: '劉佳蓉',
      phone: '0955-333-444',
      email: 'jiarong.liu@example.com',
      tags: ['VIP', 'Florihana愛用者'],
      notes: '定期頭皮護理，偏好薰衣草',
    },
    {
      name: '吳佩璇',
      phone: '0966-555-666',
      email: 'peixuan.wu@example.com',
      tags: ['過敏肌'],
      notes: '敏感肌，需特別注意產品選擇',
    },
    {
      name: '鄭雅文',
      phone: '0977-777-888',
      email: 'yawen.zheng@example.com',
      tags: ['Florihana愛用者', '喜歡玫瑰味'],
      notes: '玫瑰系列愛好者，常購買商品',
    },
    {
      name: '周曉雯',
      phone: '0988-999-000',
      email: 'xiaowen.zhou@example.com',
      tags: ['VIP'],
      notes: '熟客，定期保養',
    },
    {
      name: '許詩涵',
      phone: '0999-111-222',
      email: 'shihan.xu@example.com',
      tags: ['Florihana愛用者'],
      notes: '芳療家產品長期使用者',
    },
    {
      name: '蔡佳穎',
      phone: '0910-333-444',
      email: 'jiaying.cai@example.com',
      tags: ['喜歡玫瑰味', '過敏肌'],
      notes: '偏好玫瑰產品，肌膚較敏感',
    },
    {
      name: '謝宜庭',
      phone: '0921-555-666',
      email: 'yiting.xie@example.com',
      tags: ['VIP', 'Florihana愛用者'],
      notes: '長期客戶，定期購買商品',
    },
    {
      name: '楊雅筑',
      phone: '0932-777-888',
      email: 'yazhu.yang@example.com',
      tags: ['Florihana愛用者'],
      notes: '新客，對芳療家產品有興趣',
    },
    {
      name: '羅心怡',
      phone: '0943-999-000',
      email: 'xinyi.luo@example.com',
      tags: ['喜歡玫瑰味'],
      notes: '玫瑰系列愛好者',
    },
    {
      name: '徐若瑄',
      phone: '0954-111-222',
      email: 'ruoxuan.xu@example.com',
      tags: ['VIP', 'Florihana愛用者', '喜歡玫瑰味'],
      notes: '頂級客戶，偏好玫瑰系列',
    },
    {
      name: '王心凌',
      phone: '0965-333-444',
      email: 'xinling.wang@example.com',
      tags: ['過敏肌', 'Florihana愛用者'],
      notes: '敏感肌，使用金盞花系列',
    },
  ];

  const createdCustomers = await Promise.all(
    customers.map((customer) =>
      prisma.customer.create({
        data: {
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          tags: customer.tags,
          notes: customer.notes,
          visits: 0,
          totalSpent: 0,
        },
      })
    )
  );

  // ============================================
  // 6. 建立過去 7 天的預約（營收約 $40,000）
  // ============================================
  console.log('📝 建立過去 7 天的預約記錄...');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 過去 7 天的預約
  const pastReservations = [
    // 7 天前
    {
      customer: createdCustomers[0],
      service: serviceA,
      staff: kelly,
      date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
      time: '10:00',
      status: ReservationStatus.COMPLETED,
      price: 1288,
    },
    {
      customer: createdCustomers[1],
      service: serviceB,
      staff: meiyu,
      date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
      time: '14:00',
      status: ReservationStatus.COMPLETED,
      price: 2500,
    },
    {
      customer: createdCustomers[2],
      service: serviceA,
      staff: apple,
      date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
      time: '16:00',
      status: ReservationStatus.COMPLETED,
      price: 1288,
    },
    // 6 天前
    {
      customer: createdCustomers[3],
      service: serviceB,
      staff: kelly,
      date: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000),
      time: '11:00',
      status: ReservationStatus.COMPLETED,
      price: 2500,
    },
    {
      customer: createdCustomers[4],
      service: serviceA,
      staff: meiyu,
      date: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000),
      time: '15:00',
      status: ReservationStatus.COMPLETED,
      price: 1288,
    },
    {
      customer: createdCustomers[5],
      service: productC,
      staff: kelly,
      date: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000),
      time: '17:00',
      status: ReservationStatus.COMPLETED,
      price: 680,
    },
    // 5 天前
    {
      customer: createdCustomers[6],
      service: serviceB,
      staff: meiyu,
      date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
      time: '10:30',
      status: ReservationStatus.COMPLETED,
      price: 2500,
    },
    {
      customer: createdCustomers[7],
      service: serviceA,
      staff: apple,
      date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
      time: '14:00',
      status: ReservationStatus.COMPLETED,
      price: 1288,
    },
    {
      customer: createdCustomers[8],
      service: productD,
      staff: kelly,
      date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
      time: '16:00',
      status: ReservationStatus.COMPLETED,
      price: 950,
    },
    // 4 天前
    {
      customer: createdCustomers[9],
      service: serviceA,
      staff: kelly,
      date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000),
      time: '11:00',
      status: ReservationStatus.COMPLETED,
      price: 1288,
    },
    {
      customer: createdCustomers[10],
      service: serviceB,
      staff: meiyu,
      date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000),
      time: '15:00',
      status: ReservationStatus.COMPLETED,
      price: 2500,
    },
    // 3 天前
    {
      customer: createdCustomers[11],
      service: serviceA,
      staff: apple,
      date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
      time: '10:00',
      status: ReservationStatus.COMPLETED,
      price: 1288,
    },
    {
      customer: createdCustomers[12],
      service: serviceB,
      staff: kelly,
      date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
      time: '14:00',
      status: ReservationStatus.COMPLETED,
      price: 2500,
    },
    {
      customer: createdCustomers[13],
      service: productC,
      staff: meiyu,
      date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
      time: '17:00',
      status: ReservationStatus.COMPLETED,
      price: 680,
    },
    // 2 天前
    {
      customer: createdCustomers[14],
      service: serviceA,
      staff: meiyu,
      date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
      time: '11:00',
      status: ReservationStatus.COMPLETED,
      price: 1288,
    },
    {
      customer: createdCustomers[0],
      service: serviceB,
      staff: kelly,
      date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
      time: '15:00',
      status: ReservationStatus.COMPLETED,
      price: 2500,
    },
    {
      customer: createdCustomers[1],
      service: serviceA,
      staff: apple,
      date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
      time: '17:00',
      status: ReservationStatus.COMPLETED,
      price: 1288,
    },
    // 1 天前
    {
      customer: createdCustomers[2],
      service: serviceB,
      staff: meiyu,
      date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
      time: '10:30',
      status: ReservationStatus.COMPLETED,
      price: 2500,
    },
    {
      customer: createdCustomers[3],
      service: serviceA,
      staff: kelly,
      date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
      time: '14:00',
      status: ReservationStatus.COMPLETED,
      price: 1288,
    },
    {
      customer: createdCustomers[4],
      service: productD,
      staff: apple,
      date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000),
      time: '16:00',
      status: ReservationStatus.COMPLETED,
      price: 950,
    },
  ];

  // 計算總營收
  let totalRevenue = 0;

  for (const reservation of pastReservations) {
    const [hours, minutes] = reservation.time.split(':').map(Number);
    const startTime = new Date(reservation.date);
    startTime.setHours(hours, minutes, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + reservation.service.duration);

    await prisma.reservation.create({
      data: {
        customerName: reservation.customer.name,
        customerPhone: reservation.customer.phone,
        serviceId: reservation.service.id,
        staffId: reservation.staff.id,
        startTime,
        endTime,
        status: reservation.status,
        price: reservation.price,
      },
    });

    totalRevenue += reservation.price;
  }

  console.log(`💰 過去 7 天總營收：NT$ ${totalRevenue.toLocaleString()}`);

  // ============================================
  // 7. 建立未來 3 天的預約（5-8 筆）
  // ============================================
  console.log('📅 建立未來 3 天的預約...');

  const futureReservations = [
    // 今天
    {
      customer: createdCustomers[5],
      service: serviceA,
      staff: kelly,
      date: new Date(today),
      time: '10:00',
      status: ReservationStatus.CONFIRMED,
      price: 1288,
    },
    {
      customer: createdCustomers[6],
      service: serviceB,
      staff: meiyu,
      date: new Date(today),
      time: '14:00',
      status: ReservationStatus.CONFIRMED,
      price: 2500,
    },
    {
      customer: createdCustomers[7],
      service: serviceA,
      staff: apple,
      date: new Date(today),
      time: '16:00',
      status: ReservationStatus.PENDING,
      price: 1288,
    },
    // 明天
    {
      customer: createdCustomers[8],
      service: serviceB,
      staff: kelly,
      date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
      time: '11:00',
      status: ReservationStatus.CONFIRMED,
      price: 2500,
    },
    {
      customer: createdCustomers[9],
      service: serviceA,
      staff: meiyu,
      date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
      time: '15:00',
      status: ReservationStatus.CONFIRMED,
      price: 1288,
    },
    {
      customer: createdCustomers[10],
      service: productC,
      staff: kelly,
      date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
      time: '17:00',
      status: ReservationStatus.CONFIRMED,
      price: 680,
    },
    // 後天
    {
      customer: createdCustomers[11],
      service: serviceA,
      staff: apple,
      date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
      time: '10:00',
      status: ReservationStatus.CONFIRMED,
      price: 1288,
    },
    {
      customer: createdCustomers[12],
      service: serviceB,
      staff: kelly,
      date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
      time: '14:00',
      status: ReservationStatus.PENDING,
      price: 2500,
    },
  ];

  for (const reservation of futureReservations) {
    const [hours, minutes] = reservation.time.split(':').map(Number);
    const startTime = new Date(reservation.date);
    startTime.setHours(hours, minutes, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + reservation.service.duration);

    await prisma.reservation.create({
      data: {
        customerName: reservation.customer.name,
        customerPhone: reservation.customer.phone,
        serviceId: reservation.service.id,
        staffId: reservation.staff.id,
        startTime,
        endTime,
        status: reservation.status,
        price: reservation.price,
      },
    });
  }

  // ============================================
  // 8. 更新顧客統計資料
  // ============================================
  console.log('📊 更新顧客統計資料...');

  for (const customer of createdCustomers) {
    const customerReservations = await prisma.reservation.findMany({
      where: {
        customerPhone: customer.phone,
        status: ReservationStatus.COMPLETED,
      },
    });

    const visits = customerReservations.length;
    const totalSpent = customerReservations.reduce((sum, r) => sum + r.price, 0);
    const lastVisit = customerReservations.length > 0
      ? customerReservations.sort((a, b) => b.startTime.getTime() - a.startTime.getTime())[0].startTime
      : null;

    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        visits,
        totalSpent,
        lastVisit: lastVisit ? new Date(lastVisit.getFullYear(), lastVisit.getMonth(), lastVisit.getDate()) : null,
      },
    });
  }

  // ============================================
  // 9. 建立商店設定 (Shop Settings)
  // ============================================
  console.log('⚙️  建立商店設定...');

  await prisma.shopSettings.upsert({
    where: { id: 1 },
    update: {
      minDailyStaff: 2, // 預設每日最低人力標準為 2 人
    },
    create: {
      id: 1,
      minDailyStaff: 2, // 預設每日最低人力標準為 2 人
    },
  });

  console.log('✅ 資料庫填充完成！');
  console.log(`📈 總營收：NT$ ${totalRevenue.toLocaleString()}`);
  console.log(`👥 員工數：${staffMembers.length}`);
  console.log(`💆 服務/商品數：${4}`);
  console.log(`👤 顧客數：${createdCustomers.length}`);
  console.log(`📝 過去預約數：${pastReservations.length}`);
  console.log(`📅 未來預約數：${futureReservations.length}`);
}

main()
  .catch((e) => {
    console.error('❌ 資料庫填充失敗：', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

