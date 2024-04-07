const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const paCasesRoutes = require('./routes/paCasesRoutes');
const umNursesRoutes = require('./routes/umNursesRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use(cors());

// Routes
app.use('/api', paCasesRoutes);
app.use('/api', umNursesRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
