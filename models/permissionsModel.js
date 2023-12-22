import knexConnection from "../database/mysql_connect.js";

// creating permissions model
class Permissions {
  // Create permission
  static async createPermission(action) {
    try {
      const permissionId = await knexConnection('permissions').insert({
        action
      });
      return permissionId;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get permission by action
  static async getPermissionByaction(action) {
    try {
      const permission = await knexConnection('permissions').where({ action }).first();
      return permission;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get permission by id
  static async getPermissionById(id) {
    try {
      const permission = await knexConnection('permissions').where({ id }).first();
      return permission;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get all permissions
  static async getAllPermissions() {
    try {
      const permissions = await knexConnection('permissions');
      return permissions;
    } catch (error) {
      throw new error(error);
    }
  }

  // Update permission
  static async updatePermission(id, action) {
    try {
      const permission = await knexConnection('permissions').where({ id }).update({
        action
      });
      return permission;
    } catch (error) {
      throw new error(error);
    }
  }

  // Delete permission
  static async deletePermission(id) {
    try {
      const permission = await knexConnection('permissions').where({ id }).del();
      return permission;
    } catch (error) {
      throw new error(error);
    }
  }
}

// exporting the model
export default Permissions;