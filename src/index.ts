import expresss from 'express';

// * create express server
const app = expresss();

// * Public directory
app.use(expresss.static('public'));

// * create a routes
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// * start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
