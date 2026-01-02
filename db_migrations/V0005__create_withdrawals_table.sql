CREATE TABLE IF NOT EXISTS t_p45110186_greeting_project_202.withdrawals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    username VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    method VARCHAR(50) NOT NULL,
    details JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP
);