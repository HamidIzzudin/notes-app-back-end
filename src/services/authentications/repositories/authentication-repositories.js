import { Pool } from 'pg';
 
class AuthenticationRepositories {
 constructor() {
   this.pool = new Pool();
 }
 
 async addRefreshToken(token) {
  const query = {
    text: 'INSERT INTO authentications VALUES($1)',
    values: [token],
  };
 
  await this.pool.query(query);
 }

 async deleteRefreshToken(token) {
  const query = {
    text: 'DELETE FROM authentications WHERE token = $1',
    values: [token],
  };
  await this.pool.query(query);
 }

 async verifyRefreshToken(token) {
  const query = {
    text: 'SELECT token FROM authentications WHERE token = $1',
    values: [token],
  };
 
  const result = await this.pool.query(query);
  if (!result.rows.length) {
    return false;
  }
 
  return result.rows[0];
}

async createNote({ title, body, tags, owner }) {
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const query = {
    text: 'INSERT INTO notes(id, title, body, tags, created_at, updated_at, owner) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, title, body, tags, created_at, updated_at',
    values: [id, title, body, tags, createdAt, updatedAt, owner],
  };
  const result = await this.pool.query(query);
  return result.rows[0];
}

async verifyNoteOwner(id, owner) {
  const query = {
    text: 'SELECT * FROM notes WHERE id = $1',
    values: [id],
  };
  const result = await this.pool.query(query);
  if (!result.rows.length) {
    return null;
  }
  const note = result.rows[0];
  if (note.owner !== owner) {
    return null;
  }
  return result.rows[0];
}


}
 
export default new AuthenticationRepositories();