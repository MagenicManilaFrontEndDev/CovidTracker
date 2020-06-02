const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/visited-places', require('./routes/api/visited-places'));
app.use(
    '/api/social-interactions',
    require('./routes/api/social-interactions')
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
