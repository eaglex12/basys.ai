const pool = require('../config/dbConfig');
let nextCaseId = 1;

async function createPaCasesTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS pa_cases (
        case_id VARCHAR PRIMARY KEY,
        case_type VARCHAR(50) NOT NULL,
        complexity VARCHAR(50) NOT NULL,
        cpt_code VARCHAR(50) NOT NULL,
        submission_time TIMESTAMP NOT NULL,
        deadline TIMESTAMP NOT NULL,
        provider_urgency VARCHAR(50)
      )
    `;
    await pool.query(query);
    console.log('pa_cases table created successfully');
  } catch (error) {
    throw new Error(`Error creating pa_cases table: ${error}`);
  }
}

createPaCasesTable();

async function getPaCases() {
  try {
    const query = 'SELECT * FROM pa_cases'; 
    const { rows } = await pool.query(query);
    return rows; 
  } catch (error) {
    throw new Error(`Error retrieving PA cases: ${error}`);
  }
}

function classifyAndTagPaCase(paCaseData) {
  let complexity = paCaseData.SimpleOrComplex;
  let caseType = paCaseData.UrgentOrRoutine;
  let submissionTime = new Date(paCaseData.submissionTime);

  let caseId = 'PA' + padNumber(nextCaseId++, 3);



  let deadline;
  if (caseType === "Urgent") {
    deadline = calculateDeadline(submissionTime, 24); // Calculate deadline for urgent cases (e.g., within 24 hours)
  } else {
    deadline = calculateDeadline(submissionTime, 14 * 24); // Calculate deadline for routine cases (e.g., within 14 days)
  }

  return { ...paCaseData, caseId,submissionTime,deadline ,complexity};
}

function padNumber(num, size) {
  let padded = num.toString();
  while (padded.length < size) padded = "0" + padded;
  return padded;
}

function calculateDeadline(submissionTime, additionalHours) {
  let deadline = new Date(submissionTime.getTime() + additionalHours * 60 * 60 * 1000); // Convert additionalHours to milliseconds
  return deadline;

}

async function createPaCase(paCaseData, providerUrgency) {
  try {
    const classifiedPaCaseData = classifyAndTagPaCase(paCaseData, providerUrgency); 
    const { caseId, SimpleOrComplex, UrgentOrRoutine, CPTCode, submissionTime, deadline, complexity } = classifiedPaCaseData;
    const query = 'INSERT INTO pa_cases (case_id, case_type, complexity, cpt_code, submission_time, deadline, provider_urgency) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [caseId, UrgentOrRoutine, complexity, CPTCode, submissionTime, deadline, providerUrgency];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error(`Error creating PA case: ${error}`);
  }
}

module.exports = {
  createPaCase,
  getPaCases

};