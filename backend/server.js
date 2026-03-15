const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Smart Village AI Backend is running...');
});

// Future routes will be added in /backend/routes
// app.use('/api/farmers', require('./routes/farmerRoutes'));
// app.use('/api/mandi', require('./routes/mandiRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
