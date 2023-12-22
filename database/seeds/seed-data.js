export const seedRoles = [
  { name: 'admin' },
  { name: 'guest' }
];

export const seedUsers = [
  {
    role_id: 1,
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '12345678',
  },
  {
    role_id: 2,
    name: 'Guest',
    email: 'guest@gmail.com',
    password: '12345678',
  },
];

export const seedPermissions = [
  { action: 'create' },
  { action: 'read' },
  { action: 'update' },
  { action: 'delete' },
];

export const seedRolePermissions = [
  { role_id: 1, permission_id: 1 },
  { role_id: 1, permission_id: 2 },
  { role_id: 1, permission_id: 3 },
  { role_id: 1, permission_id: 4 },
  // { role_id: 2, permission_id: 2 },
  // { role_id: 2, permission_id: 3 },
  // { role_id: 2, permission_id: 4 },
];

export const seedAppLinks = [
  { user_id: 1, name: 'Google', url: 'https://google.com', icon: 'fa-google' },
  { user_id: 1, name: 'Facebook', url: 'https://facebook.com', icon: 'fa-facebook' },
  { user_id: 1, name: 'Twitter', url: 'https://twitter.com', icon: 'fa-twitter' }
];