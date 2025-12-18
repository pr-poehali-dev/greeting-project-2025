-- Добавляем поля для блокировки пользователей
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS ban_reason TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS banned_at TIMESTAMP;

-- Создаем таблицу администраторов
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создаем индексы
CREATE INDEX IF NOT EXISTS idx_users_is_banned ON users(is_banned);
CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);

-- Вставляем администратора admin345
INSERT INTO admins (username, password_hash) 
VALUES ('admin345', 'f0f8c5a8e0c8f5b0c5a8e0c8f5b0c5a8e0c8f5b0c5a8e0c8f5b0c5a8e0c8f5b0')
ON CONFLICT (username) DO NOTHING;