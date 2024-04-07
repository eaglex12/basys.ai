// Import required modules
const fs = require('fs');
const path = require('path');
const pool = require('../config/dbConfig');

const { createPaCase, getPaCases } = require('../controllers/paCasesController');
const { createUmNurse, getUmNurses } = require('../controllers/umNursesController');

async function fetchDataAndPopulate(dataType) {
    try {
      const hasData = await checkTableContent(dataType);
      if (hasData) {
        console.log(`${dataType.toUpperCase()} Cases data already populated.`);
        return;
      }
  
      if (dataType === 'pa') {
        await populatePACases();
      } else if (dataType === 'um') {
        await populateUMNurses();
      } else {
        throw new Error('Invalid data type. Must be either "pa" or "um".');
      }
  
      console.log(`${dataType.toUpperCase()} Cases data populated successfully!`);
    } catch (error) {
      throw new Error(`Error fetching and populating ${dataType.toUpperCase()} data: ${error}`);
    }
  }
  
  async function checkTableContent(dataType) {
    try {
      const query = `SELECT COUNT(*) FROM ${dataType}_cases`; 
      const result = await pool.query(query);
      return result.rows[0].count > 0;
    } catch (error) {
      throw new Error(`Error checking table content for ${dataType.toUpperCase()} cases: ${error}`);
    }
  }
  

async function populatePACases() {
  try {
    const paJsonDataPath = path.join(__dirname, '../api/pa_cases.json');
    const paJsonData = fs.readFileSync(paJsonDataPath, 'utf-8');
    const paCasesData = JSON.parse(paJsonData);
    const paCases = paCasesData.PA_Cases;

    if (!Array.isArray(paCases)) {
      throw new Error('PA cases is not an array.');
    }

    for (const paCase of paCases) {
      await createPaCase(paCase);
    }
  } catch (error) {
    throw new Error(`Error populating PA cases: ${error}`);
  }
}

async function populateUMNurses() {
  try {
    const umJsonDataPath = path.join(__dirname, '../api/um_nurse.json');
    const umJsonData = fs.readFileSync(umJsonDataPath, 'utf-8');
    const umCasesData = JSON.parse(umJsonData);
    const umCases = umCasesData.UM_Nurses;

    if (!Array.isArray(umCases)) {
      throw new Error('UM nurses is not an array.');
    }

    for (const umCase of umCases) {
      await createUmNurse(umCase);
    }
  } catch (error) {
    throw new Error(`Error populating UM nurses: ${error}`);
  }
}

module.exports = { fetchDataAndPopulate };
