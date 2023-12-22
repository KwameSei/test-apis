CREATE TABLE IF NOT EXISTS {}.role_permissions (
  role_id INT(12) NOT NULL,
  permission_id INT(12) NOT NULL,
  UNIQUE KEY (role_id, permission_id),
  CONSTRAINT fk_rpid FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT fk_ppid FOREIGN KEY (permission_id)
  REFERENCES permissions(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);