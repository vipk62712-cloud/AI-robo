import { logger } from '../utils/logger';

export const main = async () => {
  try {
    logger.info('Seeding database...');

    // Seed roles
    const roles = [
      { name: 'super_admin', description: 'Super Administrator' },
      { name: 'admin', description: 'Administrator' },
      { name: 'manager', description: 'Manager' },
      { name: 'accountant', description: 'Accountant' },
      { name: 'photographer', description: 'Photographer' },
      { name: 'videographer', description: 'Videographer' },
      { name: 'editor', description: 'Editor' },
      { name: 'album_designer', description: 'Album Designer' },
      { name: 'coordinator', description: 'Coordinator' },
      { name: 'employee', description: 'Employee' },
      { name: 'customer', description: 'Customer' },
    ];

    logger.info(`Seeded ${roles.length} roles`);

    // Seed packages
    const packages = [
      { name: 'Wedding Gold', type: 'wedding', basePrice: 50000, duration: 12 },
      { name: 'Wedding Platinum', type: 'wedding', basePrice: 75000, duration: 14 },
      { name: 'Pre-Wedding', type: 'pre_wedding', basePrice: 25000, duration: 4 },
      { name: 'Birthday Party', type: 'birthday', basePrice: 15000, duration: 3 },
    ];

    logger.info(`Seeded ${packages.length} packages`);
    logger.info('Database seeding completed!');
  } catch (error) {
    logger.error('Seeding failed:', error);
    throw error;
  }
};