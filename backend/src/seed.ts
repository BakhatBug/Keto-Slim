import dotenv from 'dotenv';
import connectDB, { disconnectDB } from './config/database';
import User from './models/User';
import Product from './models/Product';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedData = async () => {
  try {
    console.log('🌱 Starting database seed...\n');
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Existing data cleared\n');

    console.log('👤 Creating admin user...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      email: 'admin@ketoslim.com',
      passwordHash: adminPassword,
      name: 'Admin User',
      roles: ['admin'],
    });
    console.log(`✅ Admin created: ${admin.email} (password: admin123)\n`);

    console.log('👥 Creating test users...');
    const userPassword = await bcrypt.hash('user123', 10);
    const testUser = await User.create({
      email: 'user@test.com',
      passwordHash: userPassword,
      name: 'Test User',
      roles: ['user'],
    });
    console.log(`✅ Test user created: ${testUser.email} (password: user123)\n`);

    console.log('📦 Creating products...');

    const products = [
      {
        sku: 'MEAL-PLAN-7D',
        name: '7-Day Keto Meal Plan',
        description: 'Complete 7-day ketogenic meal plan with recipes, shopping list, and nutritional information. Perfect for beginners starting their keto journey.',
        price: 29.99,
        currency: 'USD',
        features: [
          '7 days of complete meal plans',
          'Breakfast, lunch, dinner, and snacks',
          'Detailed shopping list',
          'Nutritional macros for each meal',
          'Easy-to-follow recipes',
          'Printable PDF format',
        ],
        imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
        category: 'meal-plan' as const,
        stock: 9999, // Digital product - unlimited stock
        isActive: true,
      },
      {
        sku: 'MEAL-PLAN-30D',
        name: '30-Day Keto Transformation',
        description: 'Comprehensive 30-day meal plan designed to kickstart your weight loss journey. Includes weekly progress tracking and meal variations.',
        price: 79.99,
        currency: 'USD',
        features: [
          '30 days of complete meal plans',
          'Weekly progress tracking sheets',
          'Meal variation options',
          'Macro calculator included',
          'Email support',
          '60+ delicious recipes',
        ],
        imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
        category: 'meal-plan' as const,
        stock: 9999,
        isActive: true,
      },
      {
        sku: 'SUPP-ELEC-001',
        name: 'Keto Electrolyte Powder',
        description: 'Essential electrolyte supplement to prevent keto flu. Contains sodium, potassium, and magnesium in optimal ratios for ketogenic diet.',
        price: 34.99,
        currency: 'USD',
        features: [
          '30 servings per container',
          'Sugar-free formula',
          'No artificial sweeteners',
          'Easy to mix',
          'Lemon-lime flavor',
          'Made in USA',
        ],
        imageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71',
        category: 'supplement' as const,
        stock: 150,
        isActive: true,
      },
      {
        sku: 'SUPP-MCT-C8',
        name: 'MCT Oil - Pure C8',
        description: 'Premium MCT oil derived from 100% coconut oil. Supports ketone production and mental clarity. Perfect for coffee, smoothies, or cooking.',
        price: 44.99,
        currency: 'USD',
        features: [
          '32 oz bottle',
          '100% C8 MCT (Caprylic Acid)',
          'Non-GMO',
          'Flavorless and odorless',
          'Keto and paleo friendly',
          'BPA-free packaging',
        ],
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
        category: 'supplement' as const,
        stock: 200,
        isActive: true,
      },
      {
        sku: 'GUIDE-BEGINNER',
        name: 'Complete Keto Guide for Beginners',
        description: 'Everything you need to know about starting and maintaining a ketogenic lifestyle. From basics to advanced strategies.',
        price: 19.99,
        currency: 'USD',
        features: [
          '100+ page comprehensive guide',
          'Science behind ketosis explained',
          'Food lists and shopping tips',
          'Meal timing strategies',
          'Common mistakes to avoid',
          'FAQ section',
        ],
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
        category: 'guide' as const,
        stock: 9999,
        isActive: true,
      },
      {
        sku: 'GUIDE-WORKOUT',
        name: 'Keto Workout Plan',
        description: 'Specialized workout program optimized for ketogenic diet. Includes strength training and cardio routines.',
        price: 24.99,
        currency: 'USD',
        features: [
          '12-week progressive program',
          'Video demonstrations',
          'Nutrition timing for workouts',
          'Recovery protocols',
          'Equipment alternatives',
          'Mobile-friendly format',
        ],
        imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
        category: 'guide' as const,
        stock: 9999,
        isActive: true,
      },
      {
        sku: 'BUNDLE-STARTER',
        name: 'Ultimate Keto Starter Bundle',
        description: 'Complete package for keto beginners. Includes meal plan, guide, and supplement recommendations. Save 30% versus buying separately!',
        price: 99.99,
        currency: 'USD',
        features: [
          '30-day meal plan',
          'Complete beginner guide',
          'Supplement recommendations',
          'Shopping lists',
          'Recipe database access',
          'Email support for 30 days',
          'Lifetime updates',
        ],
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        category: 'bundle' as const,
        stock: 9999,
        isActive: true,
      },
    ];

    for (const productData of products) {
      const product = await Product.create(productData);
      console.log(`  ✅ Created: ${product.name} ($${product.price})`);
    }

    console.log(`\n✅ ${products.length} products created\n`);

    console.log('🎉 Seed completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Users: ${await User.countDocuments()}`);
    console.log(`   - Products: ${await Product.countDocuments()}`);
    console.log('\n🔐 Test Accounts:');
    console.log('   Admin: admin@ketoslim.com / admin123');
    console.log('   User:  user@test.com / user123');
    console.log('\n💡 Next steps:');
    console.log('   1. Start server: npm run dev');
    console.log('   2. Test endpoints with Postman/Thunder Client');
    console.log('   3. Login as admin to manage products');

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    await disconnectDB();
    process.exit(1);
  }
};

seedData();
