import knexConnection from "../database/mysql_connect.js";

// creating roles model
class Roles {
  // Create role
  static async createRole(name) {
    try {
      const roleId = await knexConnection('roles').insert({
        name
      });
      return roleId;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get role by name
  static async getRoleByName(name) {
    try {
      const role = await knexConnection('roles').where({ name }).first();
      return role;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get role by id
  static async getRoleById(id) {
    try {
      const role = await knexConnection('roles').where({ id }).first();
      return role;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get all roles
  static async getAllRoles() {
    try {
      const roles = await knexConnection('roles');
      return roles;
    } catch (error) {
      throw new error(error);
    }
  }

  // Update role
  static async updateRole(id, name) {
    try {
      const role = await knexConnection('roles').where({ id }).update({
        name
      });
      return role;
    } catch (error) {
      throw new error(error);
    }
  }

  // Delete role
  static async deleteRole(id) {
    try {
      const role = await knexConnection('roles').where({ id }).del();
      return role;
    } catch (error) {
      throw new error(error);
    }
  }
}

export default Roles;