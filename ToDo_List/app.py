from flask import Flask, render_template, request, redirect, url_for
import pymysql

app = Flask(__name__)

# Database connection
def get_db():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="",
        db="todo_db",
        cursorclass=pymysql.cursors.DictCursor
    )

# Initialize DB table if not exists
def init_db():
    with get_db() as conn:
        with conn.cursor() as cur:
            cur.execute("""
            CREATE TABLE IF NOT EXISTS todos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                task VARCHAR(255) NOT NULL,
                done BOOLEAN NOT NULL DEFAULT 0,
                due_date DATE DEFAULT NULL,
                priority ENUM('Low', 'Medium', 'High') DEFAULT 'Low'
            )
            """)
        conn.commit()

init_db()


@app.route('/')
def index():
    filter_status = request.args.get("filter", "all")
    query = "SELECT * FROM todos"
    if filter_status == "pending":
        query += " WHERE done=0"
    elif filter_status == "completed":
        query += " WHERE done=1"
    with get_db() as conn:
        with conn.cursor() as cur:
            cur.execute(query)
            todos = cur.fetchall()
    return render_template('index.html', todos=todos, filter_status=filter_status)


@app.route('/add', methods=['POST'])
def add():
    task = request.form.get('task')
    due_date = request.form.get('due_date')
    priority = request.form.get('priority')
    if task:
        with get_db() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                INSERT INTO todos (task, due_date, priority) VALUES (%s, %s, %s)
                """, (task, due_date or None, priority or 'Low'))
            conn.commit()
    return redirect(url_for('index'))


@app.route('/done/<int:task_id>')
def done(task_id):
    with get_db() as conn:
        with conn.cursor() as cur:
            cur.execute("UPDATE todos SET done = NOT done WHERE id=%s", (task_id,))
        conn.commit()
    return redirect(url_for('index'))


@app.route('/delete/<int:task_id>')
def delete(task_id):
    with get_db() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM todos WHERE id=%s", (task_id,))
        conn.commit()
    return redirect(url_for('index'))


@app.route('/edit/<int:task_id>', methods=['POST'])
def edit(task_id):
    task = request.form.get('task')
    due_date = request.form.get('due_date')
    priority = request.form.get('priority')
    if task:
        with get_db() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                UPDATE todos SET task=%s, due_date=%s, priority=%s WHERE id=%s
                """, (task, due_date or None, priority or 'Low', task_id))
            conn.commit()
    return redirect(url_for('index'))


if __name__ == "__main__":
    app.run(debug=True)




