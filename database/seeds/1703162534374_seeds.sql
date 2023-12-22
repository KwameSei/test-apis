INSERT INTO roles(name) 
VALUES ('admin'), ('guest');

INSERT INTO permissions(action)
VALUES ('create'), ('read'), ('update'), ('delete');

INSERT INTO role_permissions(role_id, permission_id)
VALUES (1, 1), (1, 2), (1, 3), (1, 4), --(2, 2), (2, 4);  -- admin has all permissions, guest has none

INSERT INTO users(role_id, name, email, password)
VALUES (1, 'Admin', 'admin@gmail.com', '123456'), 
(2, 'Guest', 'guest@gmail.com' '123456');

INSERT INTO app_links(user_id, name, url, icon)
VALUES (1, 'Weather App', '/https://weather-app.com', 'fa fa-dashboard')
