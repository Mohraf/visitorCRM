const db = require('../db');

const FIND_BY_CALENDLY_UID_SQL = `SELECT * FROM users WHERE calendly_uid = $1`;
const FIND_BY_ID_SQL = `SELECT * FROM users WHERE id = $1`;
const FIND_BY_ACCESS_TOKEN_SQL = `SELECT * FROM users WHERE access_token = $1`;
const CREATE_SQL = `INSERT INTO users (calendly_uid, access_token, refresh_token) VALUES ($1, $2, $3)`;
const UPDATE_SQL = `UPDATE users SET access_token = $1, refresh_token = $1 WHERE id = $1`;

class UserModel {
  constructor(connection) {
    this.connection = connection;
  }

  async findOrCreate({ calendlyUid, refreshToken, accessToken }) {
    const user = await this.findByCalendlyUserId(calendlyUid);

    if (user) return user;

    await this.create({
      calendlyUid,
      refreshToken,
      accessToken,
    });

    return this.findByCalendlyUserId(calendlyUid);
  }

  async findByCalendlyUserId(calendlyUid) {
    const result = await this.connection.query(FIND_BY_CALENDLY_UID_SQL, [calendlyUid]);
    return result.rows[0]; // Assuming we expect only one user for a given calendlyUid
  }

  async findById(id) {
    const result = await this.connection.query(FIND_BY_ID_SQL, [id]);
    return result.rows[0];
  }

  async findByAccessToken(accessToken) {
    const result = await this.connection.query(FIND_BY_ACCESS_TOKEN_SQL, [accessToken]);
    return result.rows[0];
  }

  async update(id, { accessToken, refreshToken }) {
    await this.connection.query(UPDATE_SQL, [accessToken, refreshToken, id]);
  }

  async create({ calendlyUid, accessToken, refreshToken }) {
    await this.connection.query(CREATE_SQL, [calendlyUid, accessToken, refreshToken]);
  }
}

module.exports = new UserModel(db);
