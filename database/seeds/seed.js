import knexConnection from "../mysql_connect.js";
import { seedAppLinks, seedPermissions, seedRolePermissions, seedRoles, seedUsers } from "./seed-data.js";

async function seed() {
  try {
    // Insert roles
    await knexConnection('roles').insert(seedRoles);
    // Insert permissions
    await knexConnection('permissions').insert(seedPermissions);
    // Insert role_permissions
    await knexConnection('role_permissions').insert(seedRolePermissions);
    // Insert users
    await knexConnection('users').insert(seedUsers);
    // Insert app_links
    await knexConnection('app_links').insert(seedAppLinks);

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.log('Error seeding database', error);
    throw new error(error);
  } finally {
    knexConnection.destroy(); // Close the connection
  }
}

seed();