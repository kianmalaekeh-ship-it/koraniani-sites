const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const requests = [];

app.post('/api/requests', (req, res) => {
  const { full_name, phone, services } = req.body;

  if (!full_name || !phone) {
    return res.status(400).json({ error: 'نام و شماره الزامی است' });
  }

  const newRequest = {
    id: requests.length + 1,
    full_name,
    phone,
    services: services || [],
    created_at: new Date().toISOString()
  };

  requests.push(newRequest);
  console.log('درخواست جدید:', newRequest);

  res.json({
    success: true,
    message: 'درخواست شما با موفقیت ثبت شد',
    tracking_code: 'MK-' + String(newRequest.id).padStart(5, '0')
  });
});

app.get('/api/requests', (req, res) => {
  res.json(requests);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
