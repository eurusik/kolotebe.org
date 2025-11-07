import { PrismaClient } from '@prisma/client'
import { generateListingSlug } from '../lib/utils/slugify'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create test users
  const user1 = await prisma.user.upsert({
    where: { email: 'john.rusakov@gmail.com' },
    update: {},
    create: {
      email: 'john.rusakov@gmail.com',
      name: 'John Rusakov',
      role: 'ADMIN',
      phoneVerified: true,
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      role: 'USER',
      phoneVerified: true,
    },
  })

  console.log('✅ Created users:', user1.email, user2.email)

  // Create user balances
  await prisma.userBalance.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      balance: 10,
    },
  })

  await prisma.userBalance.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      balance: 5,
    },
  })

  console.log('✅ Created user balances')

  // Create sample books
  const book1 = await prisma.book.create({
    data: {
      title: 'Kobzar',
      author: 'Taras Shevchenko',
      isbn: '978-966-03-4500-0',
      genre: 'Poetry',
      publicationYear: 1840,
      description: 'Collection of poems by Ukrainian national poet',
    },
  })

  const book2 = await prisma.book.create({
    data: {
      title: 'The Master and Margarita',
      author: 'Mikhail Bulgakov',
      isbn: '978-0-14-118014-9',
      genre: 'Fiction',
      publicationYear: 1967,
      description: 'A masterpiece of twentieth-century literature',
    },
  })

  const book3 = await prisma.book.create({
    data: {
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      isbn: '978-0-7475-3269-9',
      genre: 'Fantasy',
      publicationYear: 1997,
      description: 'The first book in the Harry Potter series',
    },
  })

  const book4 = await prisma.book.create({
    data: {
      title: '1984',
      author: 'George Orwell',
      isbn: '978-0-452-28423-4',
      genre: 'Dystopian',
      publicationYear: 1949,
      description: 'A dystopian social science fiction novel',
    },
  })

  console.log('✅ Created books')

  // Create book copies for user1
  const copy1 = await prisma.bookCopy.create({
    data: {
      bookId: book1.id,
      ownerId: user1.id,
      condition: 'GOOD',
      notes: 'Ukrainian edition, great condition',
      isAvailable: true,
    },
  })

  const copy2 = await prisma.bookCopy.create({
    data: {
      bookId: book2.id,
      ownerId: user1.id,
      condition: 'LIKE_NEW',
      notes: 'English translation, almost new',
      isAvailable: true,
    },
  })

  // Create book copies for user2
  const copy3 = await prisma.bookCopy.create({
    data: {
      bookId: book3.id,
      ownerId: user2.id,
      condition: 'GOOD',
      notes: 'English original, some wear on cover',
      isAvailable: true,
    },
  })

  const copy4 = await prisma.bookCopy.create({
    data: {
      bookId: book4.id,
      ownerId: user2.id,
      condition: 'FAIR',
      notes: 'Old edition, readable condition',
      isAvailable: true,
    },
  })

  console.log('✅ Created book copies')

  // Create listings
  const listing1 = await prisma.listing.create({
    data: {
      bookCopyId: copy1.id,
      userId: user1.id,
      slug: generateListingSlug(book1.title, book1.author, copy1.id),
      status: 'ACTIVE',
      description: 'Classic Ukrainian poetry collection. Perfect for learning Ukrainian culture.',
      transferTypes: ['FREE', 'FOR_KOLOCOINS'],
      deliveryMethods: ['SELF_PICKUP', 'NOVA_POSHTA'],
      pickupLocation: 'Kyiv, Khreshchatyk Street',
    },
  })

  const listing2 = await prisma.listing.create({
    data: {
      bookCopyId: copy2.id,
      userId: user1.id,
      slug: generateListingSlug(book2.title, book2.author, copy2.id),
      status: 'ACTIVE',
      description: 'Amazing novel, highly recommended! Almost new condition.',
      transferTypes: ['FOR_KOLOCOINS', 'TRADE'],
      deliveryMethods: ['SELF_PICKUP', 'NOVA_POSHTA', 'UKRPOSHTA'],
      pickupLocation: 'Kyiv, Podil area',
    },
  })

  const listing3 = await prisma.listing.create({
    data: {
      bookCopyId: copy3.id,
      userId: user2.id,
      slug: generateListingSlug(book3.title, book3.author, copy3.id),
      status: 'ACTIVE',
      description: 'First Harry Potter book. Great for kids and adults alike!',
      transferTypes: ['FOR_KOLOCOINS', 'LOAN'],
      deliveryMethods: ['SELF_PICKUP', 'NOVA_POSHTA'],
      pickupLocation: 'Lviv, Rynok Square',
    },
  })

  const listing4 = await prisma.listing.create({
    data: {
      bookCopyId: copy4.id,
      userId: user2.id,
      slug: generateListingSlug(book4.title, book4.author, copy4.id),
      status: 'ACTIVE',
      description: 'Classic dystopian novel. Must-read for everyone.',
      photos: [
        '/placeholder-book.svg',
        '/placeholder-book.svg',
        '/placeholder-book.svg',
      ],
      transferTypes: ['FREE', 'FOR_KOLOCOINS', 'TRADE', 'LOAN'],
      deliveryMethods: ['SELF_PICKUP', 'NOVA_POSHTA', 'UKRPOSHTA'],
      pickupLocation: 'Lviv, Central Station',
    },
  })

  console.log('✅ Created listings')

  // Create user locations
  await prisma.userLocation.create({
    data: {
      userId: user1.id,
      type: 'HOME',
      isDefault: true,
      street: 'Khreshchatyk Street, 1',
      city: 'Kyiv',
      postalCode: '01001',
      country: 'Ukraine',
    },
  })

  await prisma.userLocation.create({
    data: {
      userId: user2.id,
      type: 'HOME',
      isDefault: true,
      street: 'Rynok Square, 5',
      city: 'Lviv',
      postalCode: '79000',
      country: 'Ukraine',
    },
  })

  console.log('✅ Created user locations')

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
