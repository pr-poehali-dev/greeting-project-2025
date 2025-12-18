-- Обновляем пароль администратора на правильный хеш
UPDATE admins 
SET password_hash = encode(sha256('reter4554'::bytea), 'hex')
WHERE username = 'admin345';