import knexConnection from "../database/mysql_connect.js";

// creating rolePermissions model
class RolePermissions {
  // Create rolePermission
  static async createRolePermission(roleId, permissionId) {
    try {
      const rolePermissionId = await knexConnection('rolePermissions').insert({
        roleId,
        permissionId
      });
      return rolePermissionId;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get rolePermission by roleId
  static async getRolePermissionByRoleId(roleId) {
    try {
      const rolePermission = await knexConnection('rolePermissions').where({ roleId }).first();
      return rolePermission;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get rolePermission by permissionId
  static async getRolePermissionByPermissionId(permissionId) {
    try {
      const rolePermission = await knexConnection('rolePermissions').where({ permissionId }).first();
      return rolePermission;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get rolePermission by id
  static async getRolePermissionById(id) {
    try {
      const rolePermission = await knexConnection('rolePermissions').where({ id }).first();
      return rolePermission;
    } catch (error) {
      throw new error(error);
    }
  }

  // Get all rolePermissions
  static async getAllRolePermissions() {
    try {
      const rolePermissions = await knexConnection('rolePermissions');
      return rolePermissions;
    } catch (error) {
      throw new error(error);
    }
  }

  // Update rolePermission
  static async updateRolePermission(id, roleId, permissionId) {
    try {
      const rolePermission = await knexConnection('rolePermissions').where({ id }).update({
        roleId,
        permissionId
      });
      return rolePermission;
    } catch (error) {
      throw new error(error);
    }
  }

  // Delete rolePermission
  static async deleteRolePermission(id) {
    try {
      const rolePermission = await knexConnection('rolePermissions').where({ id }).del();
      return rolePermission;
    } catch (error) {
      throw new error(error);
    }
  }
}

export default RolePermissions;