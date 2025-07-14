import sqlite3

def upgrade(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS blueprints (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            chassis_id INTEGER NOT NULL,
            power_core_id INTEGER NOT NULL,
            modules TEXT, -- JSON string of module IDs
            code TEXT NOT NULL,
            author_id INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def downgrade(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('DROP TABLE IF EXISTS blueprints')
    conn.commit()
    conn.close()
