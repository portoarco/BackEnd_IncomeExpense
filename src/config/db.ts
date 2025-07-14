import {Pool} from 'pg';

const db = new Pool({
    host: "aws-0-us-west-1.pooler.supabase.com",
    database: "postgres",
    user:"postgres.tvcrdtdzuszreibtbujc",
    password:"arco123",
    port:6543,
});

export default db 