const pool = require('../config/dbConfig');

async function createUmNursesTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS um_cases (
        nurse_id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        expertise_cpt_codes VARCHAR(255)[] NOT NULL,
        specialty_names VARCHAR(255)[]
      )
    `;
    await pool.query(query);
    console.log('um_nurses table created successfully');
  } catch (error) {
    throw new Error(`Error creating um_nurses table: ${error}`);
  }
}

createUmNursesTable();

async function getUmNurses() {
  try {
    const query = 'SELECT * FROM um_cases';
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching UM nurses: ${error}`);
  }
}

async function createUmNurse(umNurseData) {
  try {
    const { nurseId, name, expertiseCPTCodes, specialtyNames } = umNurseData;
    const query = 'INSERT INTO um_cases (nurse_id, name, expertise_cpt_codes, specialty_names) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [nurseId, name, expertiseCPTCodes, specialtyNames];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error(`Error creating UM nurse: ${error}`);
  }
}

module.exports = {
  getUmNurses,
  createUmNurse
};
